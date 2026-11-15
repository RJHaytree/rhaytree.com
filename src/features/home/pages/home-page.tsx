import { Page } from '#/components/layout/page'
import { DimensionLine } from '#/components/ui/dimension-line'
import { EmailContact } from '#/components/ui/email-contact'
import { Section } from '#/components/ui/section'
import { SectionNav } from '#/components/ui/section-nav'
import { Anchor, TextLink } from '#/components/ui/text-link'
import { TitleBlock } from '#/components/ui/title-block'
import { RoleList } from '#/features/experience/components/role-list'
import type { Experience } from '#/features/experience/types/experience'

import { practiceAreas } from '../api/practice-areas'
import { PracticeList } from '../components/practice-list'
import { SystemSketch } from '../components/system-sketch'

const sections = [
	{ id: 'about', label: 'About' },
	{ id: 'practice', label: 'Practice' },
	{ id: 'experience', label: 'Experience' },
]

/**
 * Home: a fixed identity column on the left (on lg) with in-page navigation
 * that follows the reader, and the content scrolling on the right.
 */
export function HomePage({ experience }: { experience: Experience }) {
	return (
		<Page.Root className="lg:pt-0">
			<div className="lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
				<div className="lg:sticky lg:top-0 lg:flex lg:h-[calc(100svh-5.5rem)] lg:flex-col lg:justify-between lg:gap-5 lg:py-10 lg:pr-14">
					<div>
						<DimensionLine className="mb-6 max-w-[26rem]" />
						<h1 className="letter-in text-[clamp(2.5rem,9vw,5.5rem)] leading-[0.95] font-semibold tracking-[-0.035em] whitespace-nowrap text-bright [font-stretch:115%] lg:text-[clamp(2.5rem,4.1vw,4rem)]">
							Ryan Haytree
						</h1>
						<p className="mt-5 font-display text-xl font-semibold text-ink [font-stretch:112%]">
							Senior lead engineer, cloud infrastructure
						</p>
						<p className="mt-4 max-w-[36ch] text-lg leading-snug text-muted">
							I design how systems fit together, and build the
							tooling teams use to ship and run them securely.
						</p>

						{/* On short screens the sketch gives way so the column fits. */}
						<div className="mt-7 max-w-[26rem] lg:[@media(max-height:860px)]:hidden">
							<SystemSketch />
						</div>

						<div className="mt-8 hidden lg:block">
							<SectionNav label="On this page" links={sections} />
						</div>
					</div>

					{/* The home sheet's title block: the foot of the identity column,
					    replacing the page footer on this sheet. */}
					<footer id="contact" className="mt-10 lg:mt-0">
						<h2 className="sr-only">Title block and contact</h2>
						<TitleBlock.Root className="w-full max-w-[26rem]">
							<TitleBlock.Row label="Email">
								<EmailContact />
							</TitleBlock.Row>
							<TitleBlock.Row label="GitHub">
								<Anchor href="https://github.com/RJHaytree">
									github.com/RJHaytree
								</Anchor>
							</TitleBlock.Row>
							<TitleBlock.Row label="LinkedIn">
								<Anchor href="https://www.linkedin.com/in/ryan-haytree-59a645168/">
									linkedin.com/in/ryan-haytree
								</Anchor>
							</TitleBlock.Row>
						</TitleBlock.Root>
					</footer>
				</div>

				<div className="mt-20 space-y-28 lg:mt-0 lg:border-l lg:border-rule lg:py-16 lg:pl-14">
					<Section.Root id="about">
						<Section.Title>About</Section.Title>
						<Section.Body className="space-y-8">
							<div className="max-w-[60ch] space-y-4 text-lg text-muted">
								<p>
									I'm a senior lead engineer at Scorchsoft, a
									software agency, where I build low-latency,
									low-downtime cloud systems and lead the
									developers who work on them. Much of my role
									is now infrastructure: designing and running
									these systems on AWS and Azure, defined in
									Terraform and built on cloud-native
									services. I also plan projects at the
									detailed level: how the parts of a system
									fit together, and how data passes between
									them.
								</p>
								<p>
									Agency work brings a wide range of problems.
									The hardest, and the ones I enjoy most, are
									data ingestion: taking in data from many
									sources over different protocols, from HTTP
									and MQTT to IBM MQ and email, and shaping it
									into one consistent model the rest of a
									system can rely on.
								</p>
								<p>
									I started out lecturing in computing,
									teaching cyber security, web development and
									cloud deployment. That still shapes how I
									work: I care about systems that can be
									explained, documented and handed on, not
									just systems that run.
								</p>
							</div>
							<TitleBlock.Root className="max-w-[32rem]">
								<TitleBlock.Row label="Discipline">
									Cloud infrastructure and system design
								</TitleBlock.Row>
								<TitleBlock.Row label="Focus">
									Infrastructure as code, data ingestion,
									system planning
								</TitleBlock.Row>
								<TitleBlock.Row label="Based">
									United Kingdom (GMT/BST)
								</TitleBlock.Row>
								<TitleBlock.Row label="Talk about">
									Cloud infrastructure, data ingestion,
									teaching computing
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
				</div>
			</div>
		</Page.Root>
	)
}
