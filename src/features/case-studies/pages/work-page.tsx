import { Page } from '#/components/layout/page'
import { Section } from '#/components/ui/section'
import { TextLink } from '#/components/ui/text-link'

import { CaseStudyList } from '../components/case-study-list'
import { DataFlow } from '../components/data-flow/data-flow'
import type { CaseStudySummary } from '../types/case-study'

export function WorkPage({ studies }: { studies: Array<CaseStudySummary> }) {
	return (
		<Page.Root>
			<Page.Header>
				<Page.Title>Work</Page.Title>
				<Page.Lead>
					Client work is under NDA, so the case studies describe the
					problem, the approach and the outcome without naming the
					client. The interactive example shows the kind of system I
					design.
				</Page.Lead>
			</Page.Header>

			<div className="mt-16 space-y-24">
				<Section.Root id="example">
					<Section.Title>How a data pipeline copes</Section.Title>
					<Section.Body className="space-y-6">
						<p className="max-w-[60ch] text-lg text-muted">
							Data arrives from many sources, waits in a queue, is
							normalised into one model, then stored and served.
							Use the controls to put it under pressure.
						</p>
						<DataFlow.Root>
							<div className="space-y-5">
								<DataFlow.Controls />
								<DataFlow.Diagram />
								<DataFlow.Stats />
								<DataFlow.Key />
								<p className="font-mono text-xs text-muted">
									Illustrative simulation. Not a client or
									employer system.
								</p>
							</div>
						</DataFlow.Root>
					</Section.Body>
				</Section.Root>

				<Section.Root id="case-studies">
					<Section.Title>Case studies</Section.Title>
					<Section.Body>
						{studies.length > 0 ? (
							<CaseStudyList studies={studies} />
						) : (
							<p className="max-w-[60ch] text-muted">
								No case studies are published yet.{' '}
								<TextLink to="/experience">
									See my experience
								</TextLink>{' '}
								for the roles and work so far.
							</p>
						)}
					</Section.Body>
				</Section.Root>
			</div>
		</Page.Root>
	)
}
