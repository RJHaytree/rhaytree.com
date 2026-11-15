import { useEffect, useState } from 'react'

import { cn } from '../../lib/cn'

interface SectionLink {
	id: string
	label: string
}

/** How far down the viewport a section's top must pass to become current. */
const readingLine = 0.35

/**
 * Tracks the current section: the last one whose top has passed the reading
 * line. At the foot of the page the last section is current even when it is
 * too short for its top to reach the line. Falls back to the first section.
 */
function useActiveSection(ids: Array<string>) {
	const [active, setActive] = useState(ids[0])
	// A primitive dependency, so a new array with the same ids doesn't
	// re-subscribe on every render.
	const idKey = ids.join(' ')

	useEffect(() => {
		const sectionIds = idKey.split(' ')
		let frame = 0

		function update() {
			frame = 0
			const elements = sectionIds
				.map((id) => document.getElementById(id))
				.filter((element): element is HTMLElement => element !== null)
			if (elements.length === 0) return

			const atFoot =
				window.scrollY + window.innerHeight >=
				document.documentElement.scrollHeight - 2
			if (atFoot) {
				setActive(elements[elements.length - 1].id)
				return
			}

			const line = window.innerHeight * readingLine
			let current = elements[0].id
			for (const element of elements) {
				if (element.getBoundingClientRect().top <= line) {
					current = element.id
				}
			}
			setActive(current)
		}

		function schedule() {
			if (!frame) frame = window.requestAnimationFrame(update)
		}

		update()
		window.addEventListener('scroll', schedule, { passive: true })
		window.addEventListener('resize', schedule)
		return () => {
			window.removeEventListener('scroll', schedule)
			window.removeEventListener('resize', schedule)
			if (frame) window.cancelAnimationFrame(frame)
		}
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
