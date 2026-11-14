import { Page } from '#/components/layout/page'
import { DimensionLine } from '#/components/ui/dimension-line'
import { Section } from '#/components/ui/section'
import { TextLink } from '#/components/ui/text-link'
import { TitleBlock } from '#/components/ui/title-block'
import { CaseStudyList } from '#/features/case-studies/components/case-study-list'
import type { CaseStudySummary } from '#/features/case-studies/types/case-study'

import { PracticeMap } from '../components/practice-map'

export function HomePage({ featured }: { featured: Array<CaseStudySummary> }) {
	return (
		<Page.Root className="space-y-24">
			<PracticeMap.Provider>
				{/* Below lg the column wrappers dissolve (display: contents) so the
				    drawing sits between the positioning text and its key. */}
				<div className="grid gap-x-16 gap-y-12 pt-2 sm:pt-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
					<div className="contents lg:block">
						<div className="order-1 max-w-[42rem]">
							<DimensionLine className="mb-8" />
							<h1 className="letter-in text-[clamp(2.5rem,9vw,5.5rem)] leading-[0.95] font-semibold tracking-[-0.035em] whitespace-nowrap text-bright [font-stretch:115%] lg:text-[clamp(2.5rem,5.2vw,4.75rem)]">
								Ryan Haytree
							</h1>
							<p className="mt-7 text-xl leading-snug text-muted sm:text-2xl">
								Platform and systems engineer. I design how
								systems fit together, and build the tooling
								teams use to ship and run them securely.
							</p>
						</div>

						<section
							aria-labelledby="practice-heading"
							className="order-3 lg:mt-14"
						>
							<h2
								id="practice-heading"
								className="text-lg font-semibold text-bright [font-stretch:112%]"
							>
								Areas of practice
							</h2>
							<p className="mt-1 mb-4 text-[0.9375rem] text-muted">
								Select an area to trace it on the drawing.
							</p>
							<PracticeMap.Key />
						</section>
					</div>

					<div className="contents lg:flex lg:flex-col lg:justify-between lg:gap-10">
						{/* Below lg the drawing sticks to the top while the key
						    scrolls beneath it, so a tapped area's trace stays visible. */}
						<figure className="sticky top-0 z-10 order-2 -mx-5 m-0 border-b border-rule bg-sheet px-5 py-3 sm:-mx-8 sm:px-8 lg:static lg:mx-0 lg:mt-6 lg:border-b-0 lg:bg-transparent lg:p-0">
							<PracticeMap.Drawing />
							<figcaption className="mt-2 text-sm text-muted [font-stretch:87.5%]">
								Illustrative reference architecture. Not a
								client or employer system; not to scale.
							</figcaption>
						</figure>
						<TitleBlock.Root className="order-4 w-full sm:ml-auto sm:max-w-[28rem] lg:-mr-10 lg:border-r-0">
							<TitleBlock.Row label="Drawing">
								<span className="tabular-nums">RH-01</span>{' '}
								<span className="text-muted">Home</span>
							</TitleBlock.Row>
							<TitleBlock.Row label="Discipline">
								Platform and systems engineering
							</TitleBlock.Row>
							<TitleBlock.Row label="Scope">
								Architecture, platform tooling, infrastructure,
								security
							</TitleBlock.Row>
							<TitleBlock.Row label="Edition">
								<span className="tabular-nums">2026</span>
							</TitleBlock.Row>
						</TitleBlock.Root>
					</div>
				</div>
			</PracticeMap.Provider>

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
