import type { ShapeKind } from './category-shape'
import { CategoryShape } from './category-shape'

const steps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const

const roles = [
	{ label: 'Backgrounds', span: 3 },
	{ label: 'Borders', span: 3 },
	{ label: 'Solid', span: 2 },
	{ label: 'Text', span: 2 },
]

/** The step roles shared by every scale, drawn once above the swatches. */
export function ScaleLegend() {
	return (
		<div className="grid grid-cols-[9rem_repeat(10,minmax(0,1fr))] gap-1 font-mono text-xs text-graphite-9">
			<span />
			{roles.map((role) => (
				<span
					key={role.label}
					className="border-t border-graphite-6 pt-1.5"
					style={{ gridColumn: `span ${role.span}` }}
				>
					{role.label}
				</span>
			))}
		</div>
	)
}

/** One colour scale: name, role, shape (for categories) and its ten steps. */
export function Scale({
	name,
	purpose,
	shape,
}: {
	name: string
	purpose: string
	shape?: ShapeKind
}) {
	return (
		<div className="grid grid-cols-[9rem_repeat(10,minmax(0,1fr))] items-center gap-1">
			<div className="pr-3">
				<p
					className="flex items-center gap-2 font-text font-medium text-graphite-10"
					style={{ color: `var(--color-${name}-9)` }}
				>
					{shape ? <CategoryShape kind={shape} /> : null}
					<span className="capitalize">{name}</span>
				</p>
				<p className="font-text text-xs text-graphite-9">{purpose}</p>
			</div>
			{steps.map((step) => (
				<div
					key={step}
					className="flex h-12 items-end p-1.5 font-mono text-[0.6875rem] tabular-nums"
					style={{
						background: `var(--color-${name}-${step})`,
						color:
							step >= 7
								? 'var(--color-graphite-0)'
								: 'var(--color-graphite-10)',
					}}
				>
					{step}
				</div>
			))}
		</div>
	)
}
