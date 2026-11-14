import { useEffect, useState } from 'react'

import { cn } from '../../lib/cn'

interface SectionLink {
	id: string
	label: string
}

/**
 * Tracks which of the given sections sits in the reading band (roughly the
 * upper third of the viewport). Falls back to the first section.
 */
function useActiveSection(ids: Array<string>) {
	const [active, setActive] = useState(ids[0])
	// A primitive dependency, so a new array with the same ids doesn't
	// re-subscribe the observer on every render.
	const idKey = ids.join(' ')

	useEffect(() => {
		const sectionIds = idKey.split(' ')
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) setActive(entry.target.id)
				}
			},
			{ rootMargin: '-30% 0px -60% 0px' },
		)

		for (const id of sectionIds) {
			const element = document.getElementById(id)
			if (element) observer.observe(element)
		}
		return () => observer.disconnect()
	}, [idKey])

	return active
}

/**
 * In-page navigation that follows the reader. The current section's link is
 * bright with a signal leader that lengthens; others stay muted with a short
 * hairline, so the state reads by lightness and length, never hue alone.
 */
export function SectionNav({
	label,
	links,
}: {
	label: string
	links: Array<SectionLink>
}) {
	const active = useActiveSection(links.map((link) => link.id))

	return (
		<nav aria-label={label}>
			<ol className="m-0 list-none space-y-1 p-0">
				{links.map((link, index) => {
					const isActive = active === link.id
					return (
						<li key={link.id}>
							<a
								href={`#${link.id}`}
								aria-current={isActive ? 'location' : undefined}
								className={cn(
									'group flex items-center gap-4 py-1 no-underline transition-colors duration-200',
									isActive
										? 'text-bright'
										: 'text-muted hover:text-ink',
								)}
							>
								<span className="font-mono text-sm tabular-nums">
									{String(index + 1).padStart(2, '0')}
								</span>
								<span
									aria-hidden="true"
									className={cn(
										'h-px transition-all duration-300 ease-(--ease-draft) motion-reduce:transition-none',
										isActive
											? 'h-0.5 w-16 bg-signal'
											: 'w-8 bg-rule-strong group-hover:w-12',
									)}
								/>
								<span>{link.label}</span>
							</a>
						</li>
					)
				})}
			</ol>
		</nav>
	)
}
