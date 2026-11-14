export type ShapeKind = 'circle' | 'triangle' | 'square' | 'diamond' | 'cross'

/**
 * A small filled shape that pairs with a category colour, so categories stay
 * distinguishable without relying on hue.
 */
export function CategoryShape({
	kind,
	className,
	size,
}: {
	kind: ShapeKind
	className?: string
	/** Explicit pixel size, required when nested inside another SVG. */
	size?: number
}) {
	return (
		<svg
			viewBox="0 0 12 12"
			aria-hidden="true"
			width={size}
			height={size}
			className={className ?? 'size-3 shrink-0'}
			fill="currentColor"
		>
			{kind === 'circle' ? <circle cx={6} cy={6} r={5} /> : null}
			{kind === 'triangle' ? <path d="M6 1 L11 10.5 H1 Z" /> : null}
			{kind === 'square' ? (
				<rect x={1.5} y={1.5} width={9} height={9} />
			) : null}
			{kind === 'diamond' ? (
				<path d="M6 0.5 L11.5 6 L6 11.5 L0.5 6 Z" />
			) : null}
			{kind === 'cross' ? (
				<path d="M4.5 0.5 H7.5 V4.5 H11.5 V7.5 H7.5 V11.5 H4.5 V7.5 H0.5 V4.5 H4.5 Z" />
			) : null}
		</svg>
	)
}
