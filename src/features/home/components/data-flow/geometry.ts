/** Layout of the data-flow diagram, in its 720 by 360 viewBox. */

export type Point = readonly [number, number]

export interface FlowPath {
	points: ReadonlyArray<Point>
	length: number
}

function makePath(points: ReadonlyArray<Point>): FlowPath {
	let length = 0
	for (let i = 1; i < points.length; i++) {
		const [ax, ay] = points[i - 1] as Point
		const [bx, by] = points[i] as Point
		length += Math.hypot(bx - ax, by - ay)
	}
	return { points, length }
}

/** The point a fraction `t` (0 to 1) of the way along a path. */
export function pointAt(path: FlowPath, t: number): Point {
	let remaining = Math.min(Math.max(t, 0), 1) * path.length
	for (let i = 1; i < path.points.length; i++) {
		const [ax, ay] = path.points[i - 1] as Point
		const [bx, by] = path.points[i] as Point
		const segment = Math.hypot(bx - ax, by - ay)
		if (remaining <= segment) {
			const f = segment === 0 ? 0 : remaining / segment
			return [ax + (bx - ax) * f, ay + (by - ay) * f]
		}
		remaining -= segment
	}
	return path.points[path.points.length - 1] as Point
}

export function toSvgPath(path: FlowPath) {
	return path.points
		.map(([x, y], index) => `${index === 0 ? 'M' : 'L'}${x} ${y}`)
		.join(' ')
}

export const viewBox = { width: 720, height: 360 }

export const nodes = {
	sources: { x: 16, y: 70, w: 110, h: 60 },
	receiverA: { x: 170, y: 40, w: 110, h: 40 },
	receiverB: { x: 170, y: 120, w: 110, h: 40 },
	queue: { x: 330, y: 60, w: 140, h: 80 },
	normalise: { x: 520, y: 70, w: 180, h: 60 },
	cache: { x: 380, y: 230, w: 120, h: 44 },
	database: { x: 560, y: 230, w: 140, h: 48 },
	api: { x: 190, y: 270, w: 130, h: 52 },
	consumers: { x: 16, y: 270, w: 110, h: 52 },
} as const

export const paths = {
	sourcesToA: makePath([
		[126, 100],
		[148, 100],
		[148, 60],
		[170, 60],
	]),
	sourcesToB: makePath([
		[126, 100],
		[148, 100],
		[148, 140],
		[170, 140],
	]),
	aToQueue: makePath([
		[280, 60],
		[305, 60],
		[305, 100],
		[330, 100],
	]),
	bToQueue: makePath([
		[280, 140],
		[305, 140],
		[305, 100],
		[330, 100],
	]),
	queueToNormalise: makePath([
		[470, 100],
		[520, 100],
	]),
	normaliseToDatabase: makePath([
		[630, 130],
		[630, 230],
	]),
	normaliseToCache: makePath([
		[560, 130],
		[560, 185],
		[440, 185],
		[440, 230],
	]),
	cacheToConsumers: makePath([
		[380, 252],
		[350, 252],
		[350, 312],
		[126, 312],
	]),
	databaseToConsumers: makePath([
		[630, 278],
		[630, 334],
		[350, 334],
		[350, 312],
		[126, 312],
	]),
}

/** Twelve queue slots: two rows of six inside the queue node. */
export const queueSlots: ReadonlyArray<Point> = Array.from(
	{ length: 12 },
	(_, index) => {
		const row = Math.floor(index / 6)
		const column = index % 6
		return [345 + column * 22, 89 + row * 22] as const
	},
)
