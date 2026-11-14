import { Page } from '#/components/layout/page'
import { DimensionLine } from '#/components/ui/dimension-line'
import { Section } from '#/components/ui/section'
import { TextLink } from '#/components/ui/text-link'
import { CaseStudyList } from '#/features/case-studies/components/case-study-list'
import type { CaseStudySummary } from '#/features/case-studies/types/case-study'

import { PracticeTour } from '../components/practice-tour'

export function HomePage({ featured }: { featured: Array<CaseStudySummary> }) {
	return (
		<Page.Root className="space-y-24">
			{/*
			 * The sheet splits down the middle from the top: name and the areas
			 * of practice on the left; on lg, a sticky diagram stage on the right,
			 * divided by a full-height hairline that meets the register.
			 */}
			<PracticeTour.Provider>
				<div className="lg:-mt-16 lg:grid lg:grid-cols-2">
					<div className="space-y-24 lg:pt-16 lg:pr-12">
						<div className="pt-2 sm:pt-6">
							<DimensionLine className="mb-8" />
							<h1 className="letter-in text-[clamp(2.5rem,9vw,6rem)] leading-[0.95] font-semibold tracking-[-0.035em] whitespace-nowrap text-bright [font-stretch:115%] lg:text-[clamp(2.5rem,4.6vw,4.75rem)]">
								Ryan Haytree
							</h1>
							<p className="mt-7 max-w-[34ch] text-xl leading-snug text-muted sm:text-2xl">
								Platform and systems engineer. I design how
								systems fit together, and build the tooling
								teams use to ship and run them securely.
							</p>
						</div>

						<Section.Root id="practice">
							<Section.Title>Areas of practice</Section.Title>
							<Section.Body>
								<PracticeTour.Steps />
							</Section.Body>
						</Section.Root>
					</div>

					<div className="hidden border-l border-rule lg:block lg:pt-14 lg:pl-12">
						<PracticeTour.Stage />
					</div>
				</div>
			</PracticeTour.Provider>

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
