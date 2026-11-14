import { Page } from '#/components/layout/page'
import { DimensionLine } from '#/components/ui/dimension-line'
import { Section } from '#/components/ui/section'
import { TextLink } from '#/components/ui/text-link'
import { TitleBlock } from '#/components/ui/title-block'
import { CaseStudyList } from '#/features/case-studies/components/case-study-list'
import type { CaseStudySummary } from '#/features/case-studies/types/case-study'

import { PracticeTour } from '../components/practice-tour'

export function HomePage({ featured }: { featured: Array<CaseStudySummary> }) {
	return (
		<Page.Root className="space-y-24">
			<div className="grid gap-x-16 gap-y-12 pt-2 sm:pt-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
				<div className="max-w-[46rem]">
					<DimensionLine className="mb-8" />
					<h1 className="letter-in text-[clamp(2.5rem,9vw,6rem)] leading-[0.95] font-semibold tracking-[-0.035em] whitespace-nowrap text-bright [font-stretch:115%]">
						Ryan Haytree
					</h1>
					<p className="mt-7 text-xl leading-snug text-muted sm:text-2xl">
						Platform and systems engineer. I design how systems fit
						together, and build the tooling teams use to ship and
						run them securely.
					</p>
				</div>
				<TitleBlock.Root className="w-full sm:ml-auto sm:max-w-[28rem] lg:-mr-10 lg:w-[26rem] lg:border-r-0">
					<TitleBlock.Row label="Drawing">
						<span className="tabular-nums">RH-01</span>{' '}
						<span className="text-muted">Home</span>
					</TitleBlock.Row>
					<TitleBlock.Row label="Discipline">
						Platform and systems engineering
					</TitleBlock.Row>
					<TitleBlock.Row label="Scope">
						Architecture, data, cloud, platform tooling, security
					</TitleBlock.Row>
					<TitleBlock.Row label="Edition">
						<span className="tabular-nums">2026</span>
					</TitleBlock.Row>
				</TitleBlock.Root>
			</div>

			<Section.Root id="practice">
				<Section.Title>Areas of practice</Section.Title>
				<Section.Body>
					<PracticeTour.Provider>
						<div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
							<PracticeTour.Steps />
							<div className="hidden lg:block">
								<PracticeTour.Stage />
							</div>
						</div>
					</PracticeTour.Provider>
				</Section.Body>
			</Section.Root>

			<Section.Root id="about">
				<Section.Title>About</Section.Title>
				<Section.Body className="max-w-[60ch] space-y-4 text-lg text-muted">
					<p>[Placeholder: short about section.]</p>
				</Section.Body>
			</Section.Root>

			<Section.Root>
				<Section.Title>Selected work</Section.Title>
				<Section.Body>
					{featured.length > 0 ? (
						<>
							<CaseStudyList studies={featured} />
							<p className="mt-6">
								<TextLink to="/work">All case studies</TextLink>
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
		</Page.Root>
	)
}
