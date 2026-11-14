import { TextLink } from '#/components/ui/text-link'

import type { CaseStudySummary } from '../types/case-study'

/**
 * A drawing register of case studies: reference, title and summary per row.
 * Hovering or focusing a row draws a leader line from its reference.
 */
export function CaseStudyList({
	studies,
}: {
	studies: Array<CaseStudySummary>
}) {
	return (
		<ul className="m-0 list-none border-t border-rule p-0">
			{studies.map((study) => (
				<li
					key={study.slug}
					className="group grid gap-x-8 gap-y-1 border-b border-rule py-5 sm:grid-cols-[6.5rem_minmax(0,1fr)]"
				>
					<span className="flex items-center gap-3 sm:h-7">
						<span className="text-muted tabular-nums transition-colors duration-200 [font-stretch:87.5%] group-focus-within:text-bright group-hover:text-bright">
							{study.reference}
						</span>
						{/* Leader: from the reference's edge across the gutter to the title. */}
						<span
							aria-hidden="true"
							className="-mr-6 hidden h-0.5 flex-1 origin-left scale-x-0 bg-signal transition-transform duration-300 ease-(--ease-draft) group-focus-within:scale-x-100 group-hover:scale-x-100 motion-reduce:transition-none sm:block"
						/>
					</span>
					<div>
						<TextLink
							to="/work/$slug"
							params={{ slug: study.slug }}
							className="text-lg font-medium"
						>
							{study.title}
						</TextLink>
						<p className="mt-1.5 max-w-[65ch] text-muted">
							{study.summary}
						</p>
					</div>
				</li>
			))}
		</ul>
	)
}
