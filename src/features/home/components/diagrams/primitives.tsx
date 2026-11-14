/**
 * Drawing primitives for the area-of-practice diagrams. Every diagram is a
 * generic illustration in the sheet's linework; `focal` parts carry the
 * signal accent at a heavier weight, so they read by lightness alone.
 */

export function Diagram({
	title,
	children,
}: {
	title: string
	children: React.ReactNode
}) {
	return (
		<svg
			viewBox="0 0 480 360"
			role="img"
			aria-label={title}
			className="system-drawing diagram h-auto w-full"
			fill="none"
		>
			{children}
		</svg>
	)
}

/** Groups parts so they share a state: resting linework or the focal accent. */
export function Layer({
	focal = false,
	children,
}: {
	focal?: boolean
	children: React.ReactNode
}) {
	return (
		<g className="drawing-part" data-state={focal ? 'active' : 'idle'}>
			{children}
		</g>
	)
}

export function Box({
	x,
	y,
	w,
	h,
	label,
	note,
	dashed = false,
}: {
	x: number
	y: number
	w: number
	h: number
	label?: string
	note?: string
	dashed?: boolean
}) {
	const cx = x + w / 2
	const cy = y + h / 2

	return (
		<>
			<rect
				x={x}
				y={y}
				width={w}
				height={h}
				pathLength={dashed ? undefined : 1}
				strokeDasharray={dashed ? '6 5' : undefined}
				className={dashed ? 'draw-fade' : 'draw-stroke'}
			/>
			{label && note ? (
				<>
					<text x={cx} y={cy - 2} textAnchor="middle">
						{label}
					</text>
					<text
						x={cx}
						y={cy + 16}
						textAnchor="middle"
						className="drawing-note"
					>
						{note}
					</text>
				</>
			) : label ? (
				<text x={cx} y={cy + 5} textAnchor="middle">
					{label}
				</text>
			) : null}
		</>
	)
}

/** A frame's corner label, for regions, layers and boundaries. */
export function FrameLabel({
	x,
	y,
	children,
}: {
	x: number
	y: number
	children: string
}) {
	return (
		<text x={x} y={y} className="drawing-frame-label">
			{children}
		</text>
	)
}

/** A solid stroke that draws itself in. */
export function Line({ d, dashed = false }: { d: string; dashed?: boolean }) {
	return dashed ? (
		<path d={d} strokeDasharray="6 5" className="draw-fade" />
	) : (
		<path d={d} pathLength={1} className="draw-stroke" />
	)
}

/** Arrowhead path segments, pointing in the direction of travel. */
export const head = {
	right: (x: number, y: number) =>
		`M${x - 7} ${y - 6} L${x} ${y} L${x - 7} ${y + 6}`,
	left: (x: number, y: number) =>
		`M${x + 7} ${y - 6} L${x} ${y} L${x + 7} ${y + 6}`,
	down: (x: number, y: number) =>
		`M${x - 6} ${y - 7} L${x} ${y} L${x + 6} ${y - 7}`,
	up: (x: number, y: number) =>
		`M${x - 6} ${y + 7} L${x} ${y} L${x + 6} ${y + 7}`,
}

/** A numbered drawing callout (balloon). */
export function Balloon({ x, y, n }: { x: number; y: number; n: number }) {
	return (
		<>
			<circle
				cx={x}
				cy={y}
				r={13}
				pathLength={1}
				className="draw-stroke"
			/>
			<text x={x} y={y + 5} textAnchor="middle">
				{n}
			</text>
		</>
	)
}
