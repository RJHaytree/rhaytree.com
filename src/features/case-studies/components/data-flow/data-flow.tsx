import { createContext, use, useEffect, useId, useRef, useState } from 'react'

import { cn } from '#/lib/cn'

import {
	nodes,
	paths,
	pointAt,
	queueSlots,
	toSvgPath,
	viewBox,
} from './geometry'
import type { MessageKind, Particle, Settings } from './use-flow-simulation'
import { useFlowSimulation } from './use-flow-simulation'

/** Each source kind's colour scale; its shape is drawn by MessageShape. */
const kindColour: Record<MessageKind, string> = {
	http: 'sky',
	mqtt: 'orange',
	ibmmq: 'violet',
	smtp: 'azure',
}

const sourceExamples: Array<{
	kind: MessageKind
	name: string
	detail: string
}> = [
	{ kind: 'http', name: 'HTTP', detail: 'APIs and webhooks' },
	{ kind: 'mqtt', name: 'MQTT', detail: 'Devices and sensors' },
	{ kind: 'ibmmq', name: 'IBM MQ', detail: 'Enterprise message queues' },
	{ kind: 'smtp', name: 'SMTP', detail: 'Email-based feeds' },
]

// ---------------------------------------------------------------------------
// State

interface DataFlowContextValue {
	state: ReturnType<typeof useFlowSimulation>['state']
	settings: Settings
	running: boolean
	queueCapacity: number
	actions: {
		toggle: (key: keyof Settings) => void
		setPlaying: (playing: boolean) => void
		burst: () => void
		reset: () => void
	}
	meta: { playing: boolean }
}

const DataFlowContext = createContext<DataFlowContextValue | null>(null)

function useDataFlow() {
	const context = use(DataFlowContext)
	if (!context)
		throw new Error('DataFlow parts must be inside <DataFlow.Root>')
	return context
}

/**
 * Owns the simulation. It runs only while playing and on screen, and starts
 * paused for visitors who prefer reduced motion.
 */
function DataFlowRoot({ children }: { children: React.ReactNode }) {
	const ref = useRef<HTMLDivElement>(null)
	const [settings, setSettings] = useState<Settings>({
		slowProcessing: false,
		cacheOn: true,
		receiverBOnline: true,
	})
	const [playing, setPlaying] = useState(false)
	const [inView, setInView] = useState(false)

	useEffect(() => {
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
		setPlaying(!reduced.matches)
	}, [])

	useEffect(() => {
		const element = ref.current
		if (!element) return
		const observer = new IntersectionObserver(([entry]) =>
			setInView(Boolean(entry?.isIntersecting)),
		)
		observer.observe(element)
		return () => observer.disconnect()
	}, [])

	const running = playing && inView
	const { state, burst, reset, queueCapacity } = useFlowSimulation({
		settings,
		running,
	})

	return (
		<DataFlowContext
			value={{
				state,
				settings,
				running,
				queueCapacity,
				actions: {
					toggle: (key) =>
						setSettings((current) => ({
							...current,
							[key]: !current[key],
						})),
					setPlaying,
					burst,
					reset,
				},
				meta: { playing },
			}}
		>
			<div ref={ref}>{children}</div>
		</DataFlowContext>
	)
}

// ---------------------------------------------------------------------------
// Drawing

/** A message drawn at (x, y): input kinds by shape, records as one bar. */
function MessageShape({
	x,
	y,
	kind,
	variant,
}: {
	x: number
	y: number
	kind: MessageKind
	variant: Particle['role']
}) {
	if (variant === 'record') {
		return (
			<rect
				x={x - 7}
				y={y - 3.5}
				width={14}
				height={7}
				fill="var(--color-graphite-10)"
			/>
		)
	}
	if (variant === 'read') {
		return (
			<circle
				cx={x}
				cy={y}
				r={4}
				fill="none"
				stroke="var(--color-graphite-9)"
				strokeWidth={1.5}
			/>
		)
	}
	const fill = `var(--color-${kindColour[kind]}-7)`
	switch (kind) {
		case 'http':
			return <circle cx={x} cy={y} r={5.5} fill={fill} />
		case 'mqtt':
			return (
				<path
					d={`M${x} ${y - 6} L${x + 6} ${y + 5} H${x - 6} Z`}
					fill={fill}
				/>
			)
		case 'ibmmq':
			return (
				<rect x={x - 5} y={y - 5} width={10} height={10} fill={fill} />
			)
		case 'smtp':
			return (
				<path
					d={`M${x} ${y - 6.5} L${x + 6.5} ${y} L${x} ${y + 6.5} L${x - 6.5} ${y} Z`}
					fill={fill}
				/>
			)
	}
}

function Node({
	box,
	label,
	note,
	focal = false,
	inactive = false,
}: {
	box: { x: number; y: number; w: number; h: number }
	label?: string
	note?: string
	focal?: boolean
	inactive?: boolean
}) {
	const cx = box.x + box.w / 2
	const cy = box.y + box.h / 2
	return (
		<g opacity={inactive ? 0.45 : 1}>
			<rect
				x={box.x}
				y={box.y}
				width={box.w}
				height={box.h}
				fill={
					focal ? 'var(--color-signal-2)' : 'var(--color-graphite-2)'
				}
				stroke={
					focal ? 'var(--color-signal-7)' : 'var(--color-graphite-6)'
				}
				strokeWidth={focal ? 2 : 1}
				strokeDasharray={inactive ? '5 4' : undefined}
			/>
			{label ? (
				<text
					x={cx}
					y={note ? cy - 2 : cy + 5}
					textAnchor="middle"
					fontSize={14}
					fontFamily="var(--font-mono)"
					fontWeight={focal ? 600 : 400}
					fill={
						focal
							? 'var(--color-signal-9)'
							: 'var(--color-graphite-10)'
					}
				>
					{label}
				</text>
			) : null}
			{note ? (
				<text
					x={cx}
					y={cy + 15}
					textAnchor="middle"
					fontSize={11.5}
					fontFamily="var(--font-mono)"
					fill="var(--color-graphite-9)"
				>
					{note}
				</text>
			) : null}
		</g>
	)
}

function Wire({ d, dim = false }: { d: string; dim?: boolean }) {
	return (
		<path
			d={d}
			fill="none"
			stroke="var(--color-graphite-6)"
			strokeDasharray={dim ? '4 4' : undefined}
			opacity={dim ? 0.5 : 1}
		/>
	)
}

/** The sources node is a real button: it opens a panel of example sources. */
function SourcesButton() {
	const [open, setOpen] = useState(false)
	const panelId = useId()
	const containerRef = useRef<HTMLDivElement>(null)
	const { x, y, w, h } = nodes.sources

	useEffect(() => {
		if (!open) return
		function onKey(event: KeyboardEvent) {
			if (event.key === 'Escape') setOpen(false)
		}
		function onPointer(event: PointerEvent) {
			if (!containerRef.current?.contains(event.target as Node))
				setOpen(false)
		}
		document.addEventListener('keydown', onKey)
		document.addEventListener('pointerdown', onPointer)
		return () => {
			document.removeEventListener('keydown', onKey)
			document.removeEventListener('pointerdown', onPointer)
		}
	}, [open])

	return (
		<div
			ref={containerRef}
			className="absolute"
			style={{
				left: `${(x / viewBox.width) * 100}%`,
				top: `${(y / viewBox.height) * 100}%`,
				width: `${(w / viewBox.width) * 100}%`,
				height: `${(h / viewBox.height) * 100}%`,
			}}
		>
			<button
				type="button"
				aria-expanded={open}
				aria-controls={panelId}
				onClick={() => setOpen((value) => !value)}
				className="flex size-full cursor-pointer flex-col items-center justify-center border border-sky-6 bg-sky-2 font-mono text-[clamp(0.6875rem,1.6vw,0.875rem)] leading-tight text-sky-10 transition-colors hover:bg-sky-3 aria-expanded:border-signal-7"
			>
				<span>Data sources</span>
				<span className="text-[0.85em] text-sky-9 underline underline-offset-2">
					{open ? 'Hide' : 'Examples'}
				</span>
			</button>
			<div
				id={panelId}
				hidden={!open}
				className="absolute top-full left-0 z-10 mt-2 w-72 border border-rule-strong bg-sheet p-4 shadow-[0_12px_32px_rgb(0_0_0/0.5)]"
			>
				<p className="font-mono text-xs text-muted">Example sources</p>
				<ul className="m-0 mt-3 list-none space-y-2.5 p-0">
					{sourceExamples.map((source) => (
						<li
							key={source.kind}
							className="flex items-center gap-3"
						>
							<svg
								viewBox="0 0 16 16"
								aria-hidden="true"
								className="size-4 shrink-0"
							>
								<MessageShape
									x={8}
									y={8}
									kind={source.kind}
									variant="input"
								/>
							</svg>
							<span>
								<span className="font-mono text-sm text-bright">
									{source.name}
								</span>
								<span className="ml-2 text-sm text-muted">
									{source.detail}
								</span>
							</span>
						</li>
					))}
				</ul>
				<p className="mt-3 text-sm text-muted">
					Files, databases and other feeds join the same way.
				</p>
			</div>
		</div>
	)
}

function DataFlowDiagram() {
	const { state, settings } = useDataFlow()
	const queued = state.queue

	return (
		<div className="max-w-[52rem]">
			<p className="mb-2 font-mono text-xs text-muted sm:hidden">
				Scroll sideways to see the whole flow.
			</p>
			<div className="overflow-x-auto">
				<div className="relative min-w-[37.5rem]">
					<svg
						viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
						role="img"
						aria-label="Animated data flow: messages arrive from data sources, pass through receivers into a queue, are normalised into one record format, then written to a database and cache and read by consumers through an API."
						className="h-auto w-full border border-rule bg-graphite-1"
					>
						<Wire d={toSvgPath(paths.sourcesToA)} />
						<Wire
							d={toSvgPath(paths.sourcesToB)}
							dim={!settings.receiverBOnline}
						/>
						<Wire d={toSvgPath(paths.aToQueue)} />
						<Wire
							d={toSvgPath(paths.bToQueue)}
							dim={!settings.receiverBOnline}
						/>
						<Wire d={toSvgPath(paths.queueToNormalise)} />
						<Wire d={toSvgPath(paths.normaliseToDatabase)} />
						<Wire
							d={toSvgPath(paths.normaliseToCache)}
							dim={!settings.cacheOn}
						/>
						<Wire
							d={toSvgPath(paths.cacheToConsumers)}
							dim={!settings.cacheOn}
						/>
						<Wire
							d={toSvgPath(paths.databaseToConsumers)}
							dim={settings.cacheOn}
						/>

						{/* The sources node itself is the HTML button laid over this area. */}
						<Node box={nodes.receiverA} label="Receiver A" />
						<Node
							box={nodes.receiverB}
							label="Receiver B"
							note={
								settings.receiverBOnline ? undefined : 'offline'
							}
							inactive={!settings.receiverBOnline}
						/>

						<Node box={nodes.queue} />
						<text
							x={nodes.queue.x + 8}
							y={nodes.queue.y + 17}
							fontSize={12}
							fontFamily="var(--font-mono)"
							fill="var(--color-graphite-9)"
						>
							Queue
						</text>
						{queueSlots.map(([cx, cy], index) => {
							const kind = queued[index]
							return (
								<g key={`${cx}-${cy}`}>
									<rect
										x={cx - 9}
										y={cy - 9}
										width={18}
										height={18}
										fill="none"
										stroke="var(--color-graphite-5)"
									/>
									{kind ? (
										<MessageShape
											x={cx}
											y={cy}
											kind={kind}
											variant="input"
										/>
									) : null}
								</g>
							)
						})}

						<Node
							box={nodes.normalise}
							label="Normalise"
							note="one model"
							focal
						/>
						<Node
							box={nodes.cache}
							label="Cache"
							note={settings.cacheOn ? 'hot reads' : 'off'}
							inactive={!settings.cacheOn}
						/>
						<Node
							box={nodes.database}
							label="Database"
							note="managed"
						/>
						<Node box={nodes.api} label="Serving API" />
						<Node box={nodes.consumers} label="Consumers" />

						{state.particles.map((particle) => {
							const [x, y] = pointAt(
								particle.path,
								particle.progress,
							)
							return (
								<MessageShape
									key={particle.id}
									x={x}
									y={y}
									kind={particle.kind}
									variant={particle.role}
								/>
							)
						})}
					</svg>
					<SourcesButton />
				</div>
			</div>
		</div>
	)
}

// ---------------------------------------------------------------------------
// Controls and readouts

function ControlButton({
	pressed,
	onClick,
	children,
}: {
	pressed?: boolean
	onClick: () => void
	children: React.ReactNode
}) {
	return (
		<button
			type="button"
			aria-pressed={pressed}
			onClick={onClick}
			className={cn(
				'cursor-pointer border px-3 py-1.5 text-sm transition-colors',
				pressed
					? 'border-signal-7 bg-signal-2 text-signal-10'
					: 'border-rule-strong text-ink hover:border-sky-6 hover:text-sky-10',
			)}
		>
			{children}
		</button>
	)
}

function DataFlowControls() {
	const {
		settings,
		actions,
		meta: { playing },
	} = useDataFlow()

	return (
		<div className="flex flex-wrap gap-2">
			<ControlButton onClick={() => actions.setPlaying(!playing)}>
				{playing ? 'Pause' : 'Play'}
			</ControlButton>
			<ControlButton onClick={actions.burst}>Send a burst</ControlButton>
			<ControlButton
				pressed={settings.slowProcessing}
				onClick={() => actions.toggle('slowProcessing')}
			>
				Slow processing
			</ControlButton>
			<ControlButton
				pressed={!settings.cacheOn}
				onClick={() => actions.toggle('cacheOn')}
			>
				Turn off cache
			</ControlButton>
			<ControlButton
				pressed={!settings.receiverBOnline}
				onClick={() => actions.toggle('receiverBOnline')}
			>
				Take receiver B offline
			</ControlButton>
			<ControlButton onClick={actions.reset}>Reset</ControlButton>
		</div>
	)
}

function Readout({ label, value }: { label: string; value: string }) {
	return (
		<div className="border-t border-rule pt-2">
			<dt className="font-mono text-xs text-muted">{label}</dt>
			<dd className="m-0 font-mono text-lg text-bright tabular-nums">
				{value}
			</dd>
		</div>
	)
}

function DataFlowStats() {
	const { state, queueCapacity } = useDataFlow()
	const totalReads = state.readsFromCache + state.readsFromDatabase
	const cacheShare =
		totalReads === 0
			? 0
			: Math.round((state.readsFromCache / totalReads) * 100)

	return (
		<dl className="m-0 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
			<Readout
				label="Queued"
				value={`${state.queue.length} / ${queueCapacity}`}
			/>
			<Readout label="Normalised" value={String(state.processed)} />
			<Readout label="Dropped" value={String(state.dropped)} />
			<Readout label="Reads from cache" value={`${cacheShare}%`} />
		</dl>
	)
}

/** Key for the shapes used in the diagram. */
function DataFlowKey() {
	return (
		<ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-2 p-0 font-mono text-xs text-muted">
			<li className="flex items-center gap-2">
				<svg viewBox="0 0 16 16" aria-hidden="true" className="size-4">
					<MessageShape x={8} y={8} kind="http" variant="input" />
				</svg>
				Incoming message (shape by source)
			</li>
			<li className="flex items-center gap-2">
				<svg viewBox="0 0 16 16" aria-hidden="true" className="size-4">
					<MessageShape x={8} y={8} kind="http" variant="record" />
				</svg>
				Normalised record
			</li>
			<li className="flex items-center gap-2">
				<svg viewBox="0 0 16 16" aria-hidden="true" className="size-4">
					<MessageShape x={8} y={8} kind="http" variant="read" />
				</svg>
				Read served to a consumer
			</li>
		</ul>
	)
}

/**
 * An interactive, illustrative data pipeline: sources, receivers, a bounded
 * queue, normalisation, storage and serving, with controls to stress it.
 */
export const DataFlow = {
	Root: DataFlowRoot,
	Controls: DataFlowControls,
	Diagram: DataFlowDiagram,
	Stats: DataFlowStats,
	Key: DataFlowKey,
}
