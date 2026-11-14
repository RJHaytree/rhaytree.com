import { TextLink } from '#/components/ui/text-link'

import type { CaseStudySummary } from '../types/case-study'

export function CaseStudyList({
	studies,
}: {
	studies: Array<CaseStudySummary>
}) {
	return (
		<ul className="space-y-6">
			{studies.map((study) => (
				<li key={study.slug}>
					<TextLink
						to="/work/$slug"
						params={{ slug: study.slug }}
						className="text-lg font-medium"
					>
						{study.title}
					</TextLink>
					<p className="mt-1">{study.summary}</p>
				</li>
			))}
		</ul>
	)
}
