import { Page } from '#/components/layout/page'
import { DimensionLine } from '#/components/ui/dimension-line'
import { Section } from '#/components/ui/section'
import { SectionNav } from '#/components/ui/section-nav'
import { Anchor, TextLink } from '#/components/ui/text-link'
import { TitleBlock } from '#/components/ui/title-block'
import { CaseStudyList } from '#/features/case-studies/components/case-study-list'
import type { CaseStudySummary } from '#/features/case-studies/types/case-study'
import { RoleList } from '#/features/experience/components/role-list'
import type { Experience } from '#/features/experience/types/experience'

import { practiceAreas } from '../api/practice-areas'
import { DataFlow } from '../components/data-flow/data-flow'
import { PracticeList } from '../components/practice-list'

const sections = [
	{ id: 'about', label: 'About' },
	{ id: 'practice', label: 'Practice' },
	{ id: 'flow', label: 'Data flow' },
	{ id: 'experience', label: 'Experience' },
	{ id: 'work', label: 'Work' },
]

/**
 * Home: a fixed identity column on the left (on lg) with in-page navigation
 * that follows the reader, and the content scrolling on the right.
 */
export function HomePage({
	featured,
	experience,
}: {
	featured: Array<CaseStudySummary>
	experience: Experience
}) {
	return (
		<Page.Root className="lg:pt-0">
			<div className="lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
				<div className="lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col lg:justify-between lg:py-16 lg:pr-14">
					<div>
						<DimensionLine className="mb-8 max-w-[26rem]" />
						<h1 className="letter-in text-[clamp(2.5rem,9vw,5.5rem)] leading-[0.95] font-semibold tracking-[-0.035em] whitespace-nowrap text-bright [font-stretch:115%] lg:text-[clamp(2.5rem,4.1vw,4rem)]">
							Ryan Haytree
						</h1>
						<p className="mt-5 font-display text-xl font-semibold text-ink [font-stretch:112%]">
							Platform and systems engineer
						</p>
						<p className="mt-4 max-w-[36ch] text-lg leading-snug text-muted">
							I design how systems fit together, and build the
							tooling teams use to ship and run them securely.
						</p>

						<div className="mt-14 hidden lg:block">
							<SectionNav label="On this page" links={sections} />
						</div>
					</div>

					<ul className="m-0 mt-10 flex list-none flex-wrap gap-x-6 gap-y-2 p-0 lg:mt-0">
						<li>
							<Anchor href="mailto:rjhaytree@gmail.com">
								Email
							</Anchor>
						</li>
						<li>
							<Anchor href="https://github.com/RJHaytree">
								GitHub
							</Anchor>
						</li>
					</ul>
				</div>

				<div className="mt-20 space-y-28 lg:mt-0 lg:border-l lg:border-rule lg:py-16 lg:pl-14">
					<Section.Root id="about">
						<Section.Title>About</Section.Title>
						<Section.Body className="space-y-8">
							<p className="max-w-[60ch] text-lg text-muted">
								[Placeholder: short about section.]
							</p>
							<TitleBlock.Root className="max-w-[32rem]">
								<TitleBlock.Row label="Discipline">
									Platform and systems engineering
								</TitleBlock.Row>
								<TitleBlock.Row label="Focus">
									Data integration, cloud architecture,
									platform tooling
								</TitleBlock.Row>
								<TitleBlock.Row label="Based">
									United Kingdom
								</TitleBlock.Row>
							</TitleBlock.Root>
						</Section.Body>
					</Section.Root>

					<Section.Root id="practice">
						<Section.Title>Areas of practice</Section.Title>
						<Section.Body>
							<PracticeList areas={practiceAreas} />
						</Section.Body>
					</Section.Root>

					<Section.Root id="flow">
						<Section.Title>How data flows</Section.Title>
						<Section.Body className="space-y-6">
							<p className="max-w-[60ch] text-lg text-muted">
								Data arrives from many sources, waits in a
								queue, is normalised into one model, then stored
								and served. Try the controls to see how the
								system copes.
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

					<Section.Root id="experience">
						<Section.Title>Experience</Section.Title>
						<Section.Body>
							{experience.roles.length > 0 ? (
								<>
									<RoleList roles={experience.roles} />
									<p className="mt-6">
										<TextLink to="/experience">
											Full experience and skills
										</TextLink>
									</p>
								</>
							) : (
								<p className="text-muted">
									Role history is being added.
								</p>
							)}
						</Section.Body>
					</Section.Root>

					<Section.Root id="work">
						<Section.Title>Selected work</Section.Title>
						<Section.Body>
							{featured.length > 0 ? (
								<>
									<CaseStudyList studies={featured} />
									<p className="mt-6">
										<TextLink to="/work">
											All case studies
										</TextLink>
									</p>
								</>
							) : (
								<p className="text-muted">
									Case studies are being written up.{' '}
									<TextLink to="/experience">
										See my experience
									</TextLink>{' '}
									in the meantime.
								</p>
							)}
						</Section.Body>
					</Section.Root>
				</div>
			</div>
		</Page.Root>
	)
}
