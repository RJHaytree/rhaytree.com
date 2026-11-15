import { useState } from 'react'

/**
 * A run of short labels (skills, technologies) as hairline-ruled mono tags.
 * The tags are descriptive, not interactive. With `limit`, only the first
 * tags show, followed by a "+N more" control that reveals the rest in place.
 */
export function TagList({
	tags,
	label,
	limit,
	className = '',
}: {
	tags: Array<string>
	/** Accessible name for the list, e.g. "Skills". */
	label: string
	/** How many tags to show before the "+N more" control. */
	limit?: number
	className?: string
}) {
	const [expanded, setExpanded] = useState(false)

	if (tags.length === 0) return null

	const collapsible = limit !== undefined && tags.length > limit
	const visible = collapsible && !expanded ? tags.slice(0, limit) : tags
	const hidden = tags.length - (limit ?? tags.length)

	return (
		<ul
			aria-label={label}
			className={`m-0 flex list-none flex-wrap items-center gap-2 p-0 font-mono text-xs text-muted ${className}`}
		>
			{visible.map((tag) => (
				<li key={tag} className="border border-rule-strong px-2 py-0.5">
					{tag}
				</li>
			))}
			{collapsible ? (
				<li>
					<button
						type="button"
						aria-expanded={expanded}
						onClick={() => setExpanded((value) => !value)}
						className="relative cursor-pointer px-1 py-0.5 text-sky-9 underline decoration-sky-6 underline-offset-[0.22em] transition-colors duration-150 after:absolute after:-inset-2 hover:text-sky-10 hover:decoration-sky-9"
					>
						{expanded ? 'Show fewer' : `+${hidden} more`}
					</button>
				</li>
			) : null}
		</ul>
	)
}
