import { Page } from '#/components/layout/page'
import { Notes } from '#/components/ui/notes'
import { TextLink } from '#/components/ui/text-link'

import type { CaseStudy } from '../types/case-study'

export function CaseStudyPage({ study }: { study: CaseStudy }) {
	return (
		<Page.Root>
			<article>
				<p className="mb-8">
					<TextLink to="/work">All work</TextLink>
				</p>
				<div className="mb-14">
					<Page.Header>
						<Page.Title>{study.title}</Page.Title>
						<Page.Lead>{study.summary}</Page.Lead>
					</Page.Header>
				</div>

				<Notes.Root>
					<Notes.Item title="Context">
						<p>{study.context}</p>
					</Notes.Item>
					<Notes.Item title="The problem">
						<p>{study.problem}</p>
					</Notes.Item>
					<Notes.Item title="My role">
						<p>{study.role}</p>
					</Notes.Item>
					<Notes.Item title="Approach">
						{study.approach.map((paragraph) => (
							<p key={paragraph}>{paragraph}</p>
						))}
					</Notes.Item>
					<Notes.Item title="Outcome">
						<p>{study.outcome}</p>
					</Notes.Item>
					<Notes.Item title="Stack">
						<ul className="m-0 flex list-none flex-wrap gap-x-2 gap-y-2 p-0">
							{study.stack.map((item) => (
								<li
									key={item}
									className="border border-rule px-2.5 py-0.5 text-[0.9375rem] text-muted"
								>
									{item}
								</li>
							))}
						</ul>
					</Notes.Item>
				</Notes.Root>
			</article>
		</Page.Root>
	)
}
