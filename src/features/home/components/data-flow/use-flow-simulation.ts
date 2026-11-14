import { useEffect, useRef, useState } from 'react'

import type { FlowPath } from './geometry'
import { paths } from './geometry'

/** Source message kinds; each renders as its own shape and colour. */
export const messageKinds = ['http', 'mqtt', 'ibmmq', 'smtp'] as const
export type MessageKind = (typeof messageKinds)[number]

export interface Settings {
	slowProcessing: boolean
	cacheOn: boolean
	receiverBOnline: boolean
}

type ParticleRole = 'input' | 'record' | 'read'
type Stage =
	| 'toReceiver'
	| 'toQueue'
	| 'toNormalise'
	| 'toStore'
	| 'toConsumers'

export interface Particle {
	id: number
	role: ParticleRole
	kind: MessageKind
	stage: Stage
	path: FlowPath
	progress: number
	via: 'A' | 'B'
}

export interface FlowState {
	particles: Array<Particle>
	queue: Array<MessageKind>
	processing: { kind: MessageKind; remaining: number } | null
	busy: boolean
	processed: number
	dropped: number
	readsFromCache: number
	readsFromDatabase: number
}

/** Everything the engine mutates, in one place. */
interface Simulation {
	state: FlowState
	settings: Settings
	arrivalClock: number
	readClock: number
	nextId: number
	routeToB: boolean
	pendingBurst: number
}

export const queueCapacity = 12
const arrivalInterval = 0.7 // seconds between messages (about 1.4 per second)
const readInterval = 0.9
const speeds: Record<ParticleRole, number> = {
	input: 150,
	record: 170,
	read: 210,
}

function initialState(): FlowState {
	return {
		particles: [],
		queue: [],
		processing: null,
		busy: false,
		processed: 0,
		dropped: 0,
		readsFromCache: 0,
		readsFromDatabase: 0,
	}
}

function spawn(
	sim: Simulation,
	role: ParticleRole,
	kind: MessageKind,
	stage: Stage,
	path: FlowPath,
	via: 'A' | 'B' = 'A',
) {
	sim.state.particles.push({
		id: sim.nextId++,
		role,
		kind,
		stage,
		path,
		progress: 0,
		via,
	})
}

function arrive(sim: Simulation) {
	const kind =
		messageKinds[Math.floor(Math.random() * messageKinds.length)] ?? 'http'
	const useB = sim.settings.receiverBOnline && sim.routeToB
	sim.routeToB = !sim.routeToB
	spawn(
		sim,
		'input',
		kind,
		'toReceiver',
		useB ? paths.sourcesToB : paths.sourcesToA,
		useB ? 'B' : 'A',
	)
}

/**
 * Advances the model by `dt` seconds: arrivals (steady plus any burst),
 * reads, one-at-a-time normalisation, and particle hand-offs along paths.
 */
function step(sim: Simulation, dt: number) {
	const s = sim.state
	const { slowProcessing, cacheOn, receiverBOnline } = sim.settings

	sim.arrivalClock += dt
	if (sim.arrivalClock >= arrivalInterval) {
		sim.arrivalClock = 0
		arrive(sim)
	}
	if (sim.pendingBurst > 0 && Math.random() < dt * 10) {
		sim.pendingBurst--
		arrive(sim)
	}

	sim.readClock += dt
	if (sim.readClock >= readInterval) {
		sim.readClock = 0
		if (cacheOn) {
			s.readsFromCache++
			spawn(sim, 'read', 'http', 'toConsumers', paths.cacheToConsumers)
		} else {
			s.readsFromDatabase++
			spawn(sim, 'read', 'http', 'toConsumers', paths.databaseToConsumers)
		}
	}

	if (s.processing) {
		s.processing.remaining -= dt
		if (s.processing.remaining <= 0) {
			s.processing = null
			s.busy = false
			s.processed++
			spawn(sim, 'record', 'http', 'toStore', paths.normaliseToDatabase)
			if (cacheOn) {
				spawn(sim, 'record', 'http', 'toStore', paths.normaliseToCache)
			}
		}
	}
	if (!s.busy && s.queue.length > 0) {
		const kind = s.queue.shift() as MessageKind
		s.busy = true
		spawn(sim, 'input', kind, 'toNormalise', paths.queueToNormalise)
	}

	const next: Array<Particle> = []
	for (const particle of s.particles) {
		particle.progress += (speeds[particle.role] * dt) / particle.path.length
		if (particle.progress < 1) {
			next.push(particle)
			continue
		}
		if (particle.stage === 'toReceiver') {
			if (particle.via === 'B' && !receiverBOnline) {
				// Receiver B went offline in flight: the source retries via A.
				particle.via = 'A'
				particle.path = paths.sourcesToA
			} else {
				particle.stage = 'toQueue'
				particle.path =
					particle.via === 'B' ? paths.bToQueue : paths.aToQueue
			}
			particle.progress = 0
			next.push(particle)
		} else if (particle.stage === 'toQueue') {
			if (s.queue.length < queueCapacity) s.queue.push(particle.kind)
			else s.dropped++
		} else if (particle.stage === 'toNormalise') {
			s.processing = {
				kind: particle.kind,
				remaining: slowProcessing ? 1.6 : 0.15,
			}
		}
		// Records and reads simply finish at their destination.
	}
	s.particles = next
}

/**
 * A small, honest queueing model: messages arrive from sources, are routed to
 * an online receiver, wait in a bounded queue, are normalised one at a time,
 * then written to the database (and cache). Consumers read through the API
 * from the cache when it is on, otherwise from the database.
 */
export function useFlowSimulation({
	settings,
	running,
}: {
	settings: Settings
	running: boolean
}) {
	const sim = useRef<Simulation>({
		state: initialState(),
		settings,
		arrivalClock: 0,
		readClock: 0,
		nextId: 1,
		routeToB: false,
		pendingBurst: 0,
	})
	const [, setFrame] = useState(0)

	// The loop reads the latest settings without restarting.
	useEffect(() => {
		sim.current.settings = settings
	}, [settings])

	useEffect(() => {
		if (!running) return

		let previous = performance.now()
		let handle = requestAnimationFrame(function tick(now) {
			const dt = Math.min((now - previous) / 1000, 0.05)
			previous = now
			step(sim.current, dt)
			setFrame((frame) => frame + 1)
			handle = requestAnimationFrame(tick)
		})
		return () => cancelAnimationFrame(handle)
	}, [running])

	function burst() {
		sim.current.pendingBurst += 10
	}

	function reset() {
		sim.current.state = initialState()
		sim.current.pendingBurst = 0
		setFrame((frame) => frame + 1)
	}

	return { state: sim.current.state, burst, reset, queueCapacity }
}
