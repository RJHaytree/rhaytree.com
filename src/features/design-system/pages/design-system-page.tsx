import { useState } from 'react'

import { Page } from '#/components/layout/page'
import { cn } from '#/lib/cn'
import type { ShapeKind } from '../components/category-shape'
import { CategoryShape } from '../components/category-shape'
import { FlowSample } from '../components/flow-sample'
import { Scale, ScaleLegend } from '../components/scale'

const categories: Array<{ name: string; shape: ShapeKind; sample: string }> = [
	{ name: 'sky', shape: 'circle', sample: 'HTTP' },
	{ name: 'orange', shape: 'triangle', sample: 'MQTT' },
	{ name: 'violet', shape: 'square', sample: 'IBM MQ' },
	{ name: 'azure', shape: 'diamond', sample: 'SMTP' },
	{ name: 'vermilion', shape: 'cross', sample: 'Other' },
]

function Block({
	title,
	note,
	children,
}: {
	title: string
	note: string
	children: React.ReactNode
}) {
	return (
		<section className="border-t border-graphite-4 pt-8">
			<h2 className="font-display text-[2rem] leading-tight font-semibold tracking-[-0.02em] text-graphite-10 [font-stretch:112%]">
				{title}
			</h2>
			<p className="mt-2 max-w-[65ch] font-text text-graphite-9">
				{note}
			</p>
			<div className="mt-8">{children}</div>
		</section>
	)
}

function Spec({ children }: { children: React.ReactNode }) {
	return (
		<p className="mb-2 font-mono text-xs tracking-wide text-graphite-8">
			{children}
		</p>
	)
}

export function DesignSystemPage() {
	const [greyscale, setGreyscale] = useState(false)

	return (
		<Page.Root>
			<Page.Header>
				<Page.Title>Design system</Page.Title>
				<Page.Lead>
					Proposal v2, for review. Three type families, tinted
					surfaces and colour scales chosen for red-green colour
					vision. Dev-only page.
				</Page.Lead>
			</Page.Header>

			<p className="mt-8">
				<button
					type="button"
					aria-pressed={greyscale}
					onClick={() => setGreyscale((value) => !value)}
					className="cursor-pointer border border-graphite-6 bg-graphite-2 px-4 py-2 font-text text-graphite-10 hover:bg-graphite-3 aria-pressed:border-signal-7"
				>
					{greyscale ? 'Show colour' : 'View in greyscale'}
				</button>
				<span className="ml-4 font-text text-sm text-graphite-9">
					Everything should still read by lightness alone.
				</span>
			</p>

			<div
				className={cn(
					'mt-10 space-y-20 bg-graphite-0 p-6 font-text text-graphite-10 sm:p-10',
					greyscale && 'grayscale',
				)}
			>
				<Block
					title="Typography"
					note="Three families, one job each. Archivo set wide for display, Geist for reading, Geist Mono for references, dates, tags and diagram labels."
				>
					<div className="space-y-10">
						<div>
							<Spec>Display: Archivo, 600, width 115%, 72px</Spec>
							<p className="font-display text-[4.5rem] leading-[0.95] font-semibold tracking-[-0.035em] [font-stretch:115%]">
								Ryan Haytree
							</p>
						</div>
						<div>
							<Spec>Heading: Archivo, 600, width 112%, 32px</Spec>
							<p className="font-display text-[2rem] leading-tight font-semibold tracking-[-0.02em] [font-stretch:112%]">
								Data handling and modelling
							</p>
						</div>
						<div className="grid gap-8 lg:grid-cols-2">
							<div>
								<Spec>Lead: Geist, 400, 22px, graphite 9</Spec>
								<p className="text-[1.375rem] leading-snug text-graphite-9">
									Platform and systems engineer. I design how
									systems fit together, and build the tooling
									teams use to ship and run them securely.
								</p>
							</div>
							<div>
								<Spec>
									Body: Geist, 400, 17px / 1.6, graphite 10
									and 9
								</Spec>
								<p className="text-[1.0625rem] leading-relaxed">
									Data arrives from many sources over
									different protocols. It is consolidated into
									one model, stored, cached and served to the
									systems that rely on it.
								</p>
								<p className="mt-3 text-[1.0625rem] leading-relaxed text-graphite-9">
									Secondary text sits one step down the
									graphite scale.
								</p>
							</div>
						</div>
						<div>
							<Spec>
								Mono: Geist Mono, 400 to 500, 13 to 15px
							</Spec>
							<div className="flex flex-wrap items-baseline gap-x-8 gap-y-3 font-mono text-[0.9375rem]">
								<span className="text-graphite-10">
									RH-02.1
								</span>
								<span className="text-graphite-9">
									Mar 2022 to present
								</span>
								<span className="text-graphite-9">
									Kubernetes, MQTT, PostgreSQL, Redis
								</span>
								<span className="text-signal-9">
									RH-01 Home
								</span>
							</div>
						</div>
					</div>
				</Block>

				<Block
					title="Surfaces"
					note="Blue-tinted graphite replaces flat grey. Each step has a job: page ground, sheet, raised panels, then borders and text."
				>
					<div className="grid grid-cols-2 gap-1 sm:grid-cols-4 lg:grid-cols-11">
						{[
							['0', 'Ground'],
							['1', 'Sheet'],
							['2', 'Raised'],
							['3', 'Hover'],
							['4', 'Rule'],
							['5', 'Rule hover'],
							['6', 'Strong rule'],
							['7', 'Disabled'],
							['8', 'Muted icon'],
							['9', 'Text 2'],
							['10', 'Text 1'],
						].map(([step, label]) => (
							<div
								key={step}
								className="flex h-24 flex-col justify-between p-2 font-mono text-[0.6875rem]"
								style={{
									background: `var(--color-graphite-${step})`,
									color:
										Number(step) >= 7
											? 'var(--color-graphite-0)'
											: 'var(--color-graphite-10)',
								}}
							>
								<span>{step}</span>
								<span>{label}</span>
							</div>
						))}
					</div>
				</Block>

				<Block
					title="Colour scales"
					note="Ten steps per hue with fixed roles. Signal is reserved for live state, sky for links and controls. The category hues sit on the blue versus orange/yellow axis, which stays distinct with red-green colour vision, and each is paired with a shape."
				>
					<div className="space-y-2 overflow-x-auto">
						<div className="min-w-[44rem] space-y-2">
							<ScaleLegend />
							<Scale name="signal" purpose="Live state" />
							<Scale
								name="sky"
								purpose="Links, controls"
								shape="circle"
							/>
							{categories.slice(1).map((category) => (
								<Scale
									key={category.name}
									name={category.name}
									purpose="Category"
									shape={category.shape}
								/>
							))}
						</div>
					</div>
				</Block>

				<Block
					title="Components"
					note="The scales applied: interactive elements in sky, live state in signal, categories as shape plus colour, status with an icon and words."
				>
					<div className="grid gap-12 lg:grid-cols-2">
						<div className="space-y-8">
							<div>
								<Spec>Links and navigation</Spec>
								<p className="text-[1.0625rem]">
									Read the{' '}
									<a
										href="#top"
										className="text-sky-9 underline decoration-sky-6 underline-offset-4 hover:decoration-sky-9"
									>
										full case study
									</a>{' '}
									or{' '}
									<a
										href="#top"
										className="text-sky-9 underline decoration-sky-6 underline-offset-4 hover:decoration-sky-9"
									>
										get in touch
									</a>
									.
								</p>
								<ul className="mt-4 flex flex-wrap gap-x-6 font-text">
									<li className="text-graphite-10 underline decoration-signal-7 decoration-2 underline-offset-[6px]">
										<span className="mr-1.5 font-mono text-sm">
											01
										</span>
										Home
									</li>
									<li className="text-graphite-9">
										<span className="mr-1.5 font-mono text-sm">
											02
										</span>
										Work
									</li>
									<li className="text-graphite-9">
										<span className="mr-1.5 font-mono text-sm">
											03
										</span>
										Experience
									</li>
								</ul>
							</div>

							<div>
								<Spec>Buttons</Spec>
								<div className="flex flex-wrap gap-3">
									<button
										type="button"
										className="cursor-pointer bg-sky-7 px-4 py-2 font-medium text-graphite-0 hover:bg-sky-8"
									>
										Send message
									</button>
									<button
										type="button"
										className="cursor-pointer border border-graphite-6 px-4 py-2 text-graphite-10 hover:bg-graphite-3"
									>
										Download CV
									</button>
									<button
										type="button"
										className="cursor-pointer px-4 py-2 text-sky-9 hover:bg-sky-2"
									>
										View all work
									</button>
								</div>
							</div>

							<div>
								<Spec>Category tags (shape plus colour)</Spec>
								<ul className="flex flex-wrap gap-2">
									{categories.map((category) => (
										<li
											key={category.name}
											className="flex items-center gap-2 border px-2.5 py-1 font-mono text-sm"
											style={{
												background: `var(--color-${category.name}-3)`,
												borderColor: `var(--color-${category.name}-6)`,
												color: `var(--color-${category.name}-9)`,
											}}
										>
											<CategoryShape
												kind={category.shape}
											/>
											{category.sample}
										</li>
									))}
								</ul>
							</div>

							<div>
								<Spec>Status (icon, colour and words)</Spec>
								<ul className="space-y-2 font-text">
									<li className="flex items-center gap-3 border border-sky-6 bg-sky-2 px-3 py-2 text-sky-10">
										<CategoryShape kind="circle" />
										Message sent. I'll reply within a few
										days.
									</li>
									<li className="flex items-center gap-3 border border-orange-6 bg-orange-2 px-3 py-2 text-orange-10">
										<CategoryShape kind="triangle" />
										Check your email address before sending.
									</li>
									<li className="flex items-center gap-3 border border-vermilion-6 bg-vermilion-2 px-3 py-2 text-vermilion-10">
										<CategoryShape kind="cross" />
										The message could not be sent. Try
										again, or email me.
									</li>
								</ul>
							</div>
						</div>

						<div className="space-y-8">
							<div>
								<Spec>Raised panel and register row</Spec>
								<div className="border border-graphite-4 bg-graphite-2">
									<div className="flex items-center justify-between border-b border-graphite-4 px-4 py-2 font-mono text-sm text-graphite-9">
										<span>RH-02.1</span>
										<span>Case study</span>
									</div>
									<div className="px-4 py-4">
										<p className="font-display text-xl font-semibold [font-stretch:112%]">
											Designing a resilient service
											architecture
										</p>
										<p className="mt-2 text-graphite-9">
											A target architecture that let a
											growing product survive the loss of
											a zone without downtime.
										</p>
										<ul className="mt-4 flex flex-wrap gap-2 font-mono text-xs text-graphite-9">
											<li className="border border-graphite-5 px-2 py-0.5">
												PostgreSQL
											</li>
											<li className="border border-graphite-5 px-2 py-0.5">
												Message queue
											</li>
											<li className="border border-graphite-5 px-2 py-0.5">
												Terraform
											</li>
										</ul>
									</div>
								</div>
							</div>

							<div>
								<Spec>
									Diagram vocabulary: a complete flow with a
									key
								</Spec>
								<FlowSample />
							</div>
						</div>
					</div>
				</Block>
			</div>
		</Page.Root>
	)
}
