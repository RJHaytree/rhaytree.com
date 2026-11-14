import { createContext, use, useEffect, useRef, useState } from 'react'

import { cn } from '#/lib/cn'

import {
	ArchitectureDiagram,
	CloudPlanningDiagram,
	CodeReviewDiagram,
	DataModellingDiagram,
	InfrastructureAsCodeDiagram,
	PlatformToolingDiagram,
	SecurityAuditingDiagram,
} from './diagrams/practice-diagrams'

const areas = [
	{
		id: 'architecture',
		name: 'Architecture',
		detail: 'Deciding how systems and services fit together before any are built: their boundaries, the contracts between them, and which data each one owns.',
		Diagram: ArchitectureDiagram,
	},
	{
		id: 'data',
		name: 'Data handling and modelling',
		detail: 'Taking data in from many sources and protocols, and shaping it into one consistent model the rest of the system can rely on.',
		Diagram: DataModellingDiagram,
	},
	{
		id: 'cloud',
		name: 'Cloud planning',
		detail: 'Planning what runs where in the cloud, from containers and functions to managed databases, and how the pieces connect.',
		Diagram: CloudPlanningDiagram,
	},
	{
		id: 'platform',
		name: 'Platform tooling',
		detail: 'Shared tooling and pipelines that let teams build, test and ship their services the same way every time.',
		Diagram: PlatformToolingDiagram,
	},
	{
		id: 'iac',
		name: 'Infrastructure as code',
		detail: 'Describing infrastructure in Terraform, so every environment is repeatable, reviewable and built from the same modules.',
		Diagram: InfrastructureAsCodeDiagram,
	},
	{
		id: 'security',
		name: 'Security auditing',
		detail: 'Reviewing infrastructure layer by layer for weaknesses, and turning the findings into fixes that stay fixed.',
		Diagram: SecurityAuditingDiagram,
	},
	{
		id: 'review',
		name: 'Code review',
		detail: 'Reviewing changes before they merge, to keep quality and consistency high across the team.',
		Diagram: CodeReviewDiagram,
	},
] as const

type Area = (typeof areas)[number]
type AreaId = Area['id']

const caption =
	'Illustrative diagram. Not a client or employer system; not to scale.'

interface PracticeTourContextValue {
	state: { active: AreaId }
	actions: { activate: (id: AreaId) => void }
}

const PracticeTourContext = createContext<PracticeTourContextValue | null>(null)

function usePracticeTour() {
	const context = use(PracticeTourContext)
	if (!context) {
		throw new Error(
			'PracticeTour parts must be inside <PracticeTour.Provider>',
		)
	}
	return context
}

/** Owns which area is in focus; the first area until the visitor scrolls. */
function PracticeTourProvider({ children }: { children: React.ReactNode }) {
	const [active, setActive] = useState<AreaId>(areas[0].id)

	return (
		<PracticeTourContext
			value={{ state: { active }, actions: { activate: setActive } }}
		>
			{children}
		</PracticeTourContext>
	)
}

/** One area of practice. It becomes active as it crosses the middle of the viewport. */
function Step({ area, index }: { area: Area; index: number }) {
	const {
		state: { active },
		actions: { activate },
	} = usePracticeTour()
	const ref = useRef<HTMLLIElement>(null)
	const isActive = active === area.id

	useEffect(() => {
		const element = ref.current
		if (!element) return

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry?.isIntersecting) activate(area.id)
			},
			{ rootMargin: '-50% 0px -50% 0px' },
		)
		observer.observe(element)
		return () => observer.disconnect()
	}, [area.id, activate])

	return (
		<li
			ref={ref}
			className="border-b border-rule py-10 lg:flex lg:min-h-[52vh] lg:flex-col lg:justify-center lg:py-12"
		>
			<p className="flex items-center gap-3 text-muted tabular-nums [font-stretch:87.5%]">
				<span>{String(index + 1).padStart(2, '0')}</span>
				<span
					aria-hidden="true"
					className={cn(
						'hidden h-0.5 w-10 origin-left bg-signal transition-transform duration-500 ease-(--ease-draft) motion-reduce:transition-none lg:block',
						isActive ? 'scale-x-100' : 'scale-x-0',
					)}
				/>
			</p>
			<h3
				className={cn(
					'mt-2 text-2xl leading-tight font-semibold tracking-[-0.01em] transition-colors duration-300 [font-stretch:112%] sm:text-[2rem]',
					isActive ? 'text-bright' : 'text-ink lg:text-muted',
				)}
			>
				{area.name}
			</h3>
			<p className="mt-3 max-w-[48ch] text-lg text-muted">
				{area.detail}
			</p>

			{/* Below lg there is no pinned stage: each area shows its own diagram. */}
			<figure className="m-0 mt-8 lg:hidden">
				<area.Diagram />
				<figcaption className="mt-2 text-sm text-muted [font-stretch:87.5%]">
					{caption}
				</figcaption>
			</figure>
		</li>
	)
}

function PracticeTourSteps() {
	return (
		<ol className="m-0 list-none border-t border-rule p-0">
			{areas.map((area, index) => (
				<Step key={area.id} area={area} index={index} />
			))}
		</ol>
	)
}

/** The pinned diagram panel (lg and up). Swaps to the active area's diagram. */
function PracticeTourStage() {
	const {
		state: { active },
	} = usePracticeTour()
	const index = areas.findIndex((area) => area.id === active)
	const area = areas[index] ?? areas[0]

	return (
		<figure className="sticky top-[max(2rem,calc(50vh-17rem))] m-0">
			<div key={area.id} className="draw-fade">
				<area.Diagram />
			</div>
			<figcaption className="mt-4 flex flex-wrap justify-between gap-x-6 gap-y-1 border-t border-rule pt-3 text-sm text-muted [font-stretch:87.5%]">
				<span className="text-ink tabular-nums">
					{String(index + 1).padStart(2, '0')} of{' '}
					{String(areas.length).padStart(2, '0')}: {area.name}
				</span>
				<span>{caption}</span>
			</figcaption>
		</figure>
	)
}

/**
 * The areas of practice as a guided tour: text on the left, and on large
 * screens a pinned diagram on the right that follows the area in focus.
 */
export const PracticeTour = {
	Provider: PracticeTourProvider,
	Steps: PracticeTourSteps,
	Stage: PracticeTourStage,
}
