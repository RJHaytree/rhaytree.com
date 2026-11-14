/**
 * A run of short labels (skills, technologies) as hairline-ruled mono tags.
 * Purely descriptive: no colour, no interaction.
 */
export function TagList({
	tags,
	label,
	className = '',
}: {
	tags: Array<string>
	/** Accessible name for the list, e.g. "Skills". */
	label: string
	className?: string
}) {
	if (tags.length === 0) return null

	return (
		<ul
			aria-label={label}
			className={`m-0 flex list-none flex-wrap gap-2 p-0 font-mono text-xs text-muted ${className}`}
		>
			{tags.map((tag) => (
				<li key={tag} className="border border-rule-strong px-2 py-0.5">
					{tag}
				</li>
			))}
		</ul>
	)
}
