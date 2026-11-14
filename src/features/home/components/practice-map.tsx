import { createContext, use, useId, useState } from 'react'

import { cn } from '#/lib/cn'

const areas = [
	{
		id: 'architecture',
		name: 'Architecture',
		detail: 'Defining how systems and services fit together before they are built.',
	},
	{
		id: 'data-integration',
		name: 'Data integration',
		detail: 'Bringing data from many sources and protocols into one consistent system.',
	},
	{
		id: 'cloud-planning',
		name: 'Cloud planning',
		detail: 'Planning large cloud projects that span many integrated systems.',
	},
	{
		id: 'platform-tooling',
		name: 'Platform tooling',
		detail: 'Shared tooling that helps teams build, ship and run their services.',
	},
	{
		id: 'iac',
		name: 'Infrastructure as code',
		detail: 'Terraform for repeatable, reviewable environments.',
	},
	{
		id: 'security',
		name: 'Security auditing',
		detail: 'Reviewing infrastructure for vulnerabilities and fixing them.',
	},
	{
		id: 'code-review',
		name: 'Code review',
		detail: 'Raising quality and consistency across the team.',
	},
] as const

type AreaId = (typeof areas)[number]['id']

interface PracticeMapContextValue {
	state: { active: AreaId | null; pinned: AreaId | null }
	actions: {
		preview: (area: AreaId | null) => void
		togglePin: (area: AreaId) => void
	}
	meta: { drawingId: string }
}

const PracticeMapContext = createContext<PracticeMapContextValue | null>(null)

function usePracticeMap() {
	const context = use(PracticeMapContext)
	if (!context) {
		throw new Error(
			'PracticeMap parts must be inside <PracticeMap.Provider>',
		)
	}
	return context
}

/** Owns which area is previewed (hover/focus) or pinned (click/tap). */
function PracticeMapProvider({ children }: { children: React.ReactNode }) {
	const [previewed, setPreviewed] = useState<AreaId | null>(null)
	const [pinned, setPinned] = useState<AreaId | null>(null)
	const drawingId = useId()

	return (
		<PracticeMapContext
			value={{
				state: { active: previewed ?? pinned, pinned },
				actions: {
					preview: setPreviewed,
					togglePin: (area) =>
						setPinned((current) =>
							current === area ? null : area,
						),
				},
				meta: { drawingId },
			}}
		>
			{children}
		</PracticeMapContext>
	)
}

/** The areas of practice, set as the drawing's key. Each entry traces its part. */
function PracticeMapKey() {
	const {
		state: { active, pinned },
		actions: { preview, togglePin },
		meta: { drawingId },
	} = usePracticeMap()

	return (
		<dl className="m-0 border-t border-rule">
			{areas.map((area) => {
				// Key text never dims (contrast); only the drawing dims.
				const isActive = active === area.id

				return (
					<div
						key={area.id}
						className="grid gap-x-6 border-b border-rule py-2.5 sm:grid-cols-[11rem_minmax(0,1fr)]"
					>
						<dt>
							<button
								type="button"
								aria-pressed={pinned === area.id}
								aria-controls={drawingId}
								onClick={() => togglePin(area.id)}
								onMouseEnter={() => preview(area.id)}
								onMouseLeave={() => preview(null)}
								onFocus={() => preview(area.id)}
								onBlur={() => preview(null)}
								className={cn(
									'cursor-pointer text-left font-medium underline-offset-4 transition-colors duration-200',
									isActive
										? 'text-signal underline decoration-2'
										: 'text-ink hover:text-bright',
								)}
							>
								{area.name}
							</button>
						</dt>
						<dd className="m-0 text-[0.9375rem] text-muted">
							{area.detail}
						</dd>
					</div>
				)
			})}
		</dl>
	)
}

/** One traceable part of the drawing; lights up when its area is active. */
function Part({
	area,
	delay,
	children,
}: {
	area: AreaId
	delay: number
	children: React.ReactNode
}) {
	const {
		state: { active },
	} = usePracticeMap()
	const partState =
		active === null ? 'idle' : active === area ? 'active' : 'dim'

	return (
		<g
			data-state={partState}
			className="drawing-part"
			style={{ '--draw-delay': `${delay}ms` } as React.CSSProperties}
		>
			{children}
		</g>
	)
}

/** A solid stroke that draws itself on load. */
function Stroke(props: React.SVGProps<SVGPathElement>) {
	return <path pathLength={1} className="draw-stroke" {...props} />
}

function Box({
	x,
	y,
	w,
	h,
	label,
	note,
}: {
	x: number
	y: number
	w: number
	h: number
	label?: string
	/** A smaller second line, e.g. the runtime the part runs on. */
	note?: string
}) {
	const cx = x + w / 2
	const cy = y + h / 2

	return (
		<>
			<rect
				x={x}
				y={y}
				width={w}
				height={h}
				pathLength={1}
				className="draw-stroke"
			/>
			{label && note ? (
				<>
					<text x={cx} y={cy - 1} textAnchor="middle">
						{label}
					</text>
					<text
						x={cx}
						y={cy + 13}
						textAnchor="middle"
						className="drawing-note"
					>
						{note}
					</text>
				</>
			) : label ? (
				<text x={cx} y={cy + 5} textAnchor="middle">
					{label}
				</text>
			) : null}
		</>
	)
}

const drawingDescription =
	'Data arrives from many sources through HTTP, MQTT, IBM MQ, SMTP and other receivers running on Kubernetes, merges onto a queue and is consolidated by serverless functions, then stored in a managed database and a cache inside a cloud region and security perimeter. A serving API on container apps reads from both and reaches consumers through an edge firewall. A code repository feeds a deploy pipeline through a review gate, and Terraform defines the infrastructure.'

/** The SVG frame shared by both drawing variants: labelled, traceable. */
function DrawingFrame({
	viewBox,
	className,
	children,
}: {
	viewBox: string
	className?: string
	children: React.ReactNode
}) {
	const titleId = useId()
	const descId = useId()

	return (
		<svg
			viewBox={viewBox}
			role="img"
			aria-labelledby={`${titleId} ${descId}`}
			className={cn('system-drawing h-auto w-full', className)}
			fill="none"
		>
			<title id={titleId}>
				Illustrative data integration architecture
			</title>
			<desc id={descId}>{drawingDescription}</desc>
			{children}
		</svg>
	)
}

const adapters = ['HTTP', 'MQTT', 'IBM MQ', 'SMTP', 'Other'] as const

/**
 * The phone variant: the same data flow arranged top to bottom with fewer,
 * larger parts, so its labels stay legible at phone width.
 */
function CompactDrawing() {
	return (
		<DrawingFrame
			viewBox="0 0 340 480"
			className="drawing-compact mx-auto max-h-[46svh] sm:hidden"
		>
			<Part area="architecture" delay={0}>
				<Box x={4} y={4} w={332} h={472} />
				<text x={14} y={466}>
					System boundary
				</text>
			</Part>

			<Part area="cloud-planning" delay={150}>
				<Box x={20} y={90} w={300} h={226} />
				<text x={28} y={108}>
					Region
				</text>
			</Part>

			<Part area="data-integration" delay={300}>
				<Box x={8} y={8} w={324} h={56} />
				<text x={16} y={25}>
					Kubernetes
				</text>
				{adapters.map((name, index) => (
					<Box
						key={name}
						x={12 + index * 64}
						y={32}
						w={58}
						h={26}
						label={name}
					/>
				))}
				<Stroke d="M41 58 V70 M105 58 V70 M169 58 V70 M233 58 V70 M297 58 V70 M41 70 H297" />
				<Stroke d="M95 70 V116 M89 110 L95 116 L101 110" />
				<Stroke d="M150 132 H190 M184 126 L190 132 L184 138" />
				<Box
					x={190}
					y={112}
					w={120}
					h={40}
					label="Consolidate"
					note="functions"
				/>
			</Part>

			<Part area="security" delay={450}>
				<rect
					x={12}
					y={82}
					width={316}
					height={244}
					strokeDasharray="6 5"
					className="draw-fade"
				/>
				<Box x={115} y={278} w={110} h={32} label="Edge / WAF" />
			</Part>

			<Part area="platform-tooling" delay={600}>
				<Box x={10} y={404} w={74} h={30} label="Repo" />
				<Box x={118} y={404} w={92} h={30} label="Pipeline" />
				<Stroke d="M196 404 V316 M190 322 L196 316 L202 322" />
			</Part>

			<Part area="code-review" delay={750}>
				<Stroke d="M84 419 H90 L101 408 L112 419 L101 430 L90 419 M112 419 H118" />
			</Part>

			<Part area="iac" delay={900}>
				<Box x={232} y={404} w={98} h={30} label="Terraform" />
				<Stroke d="M281 404 V316 M275 322 L281 316 L287 322" />
			</Part>

			<Part area="architecture" delay={1050}>
				<Box x={40} y={116} w={110} h={32} label="Queue" />
				<Stroke d="M250 152 V170 M244 164 L250 170 L256 164 M250 160 H95 V170 M89 164 L95 170 L101 164" />
				<Box x={40} y={170} w={110} h={40} label="Cache" />
				<Box
					x={190}
					y={170}
					w={120}
					h={40}
					label="Database"
					note="managed"
				/>
				<Stroke d="M95 210 V222 H170 V230 M250 210 V222 H170 M164 224 L170 230 L176 224" />
				<Box
					x={105}
					y={230}
					w={130}
					h={40}
					label="Serving API"
					note="container apps"
				/>
				<Stroke d="M170 270 V278" />
				<Stroke d="M170 310 V330 H72 V350 M66 344 L72 350 L78 344" />
				<Box x={12} y={350} w={120} h={32} label="Consumers" />
			</Part>
		</DrawingFrame>
	)
}

/** Both variants inside one controlled region; only one is ever displayed. */
function PracticeMapDrawing() {
	const {
		state: { active },
		meta: { drawingId },
	} = usePracticeMap()

	return (
		<div id={drawingId} data-active={active ?? undefined}>
			<CompactDrawing />
			<FullDrawing />
		</div>
	)
}

/**
 * An illustrative data integration architecture, drawn as an engineering
 * schematic: many protocols in, consolidated, stored and served. Deliberately
 * generic: it describes no client or employer system.
 */
function FullDrawing() {
	return (
		<DrawingFrame viewBox="0 0 600 440" className="hidden sm:block">
			<Part area="architecture" delay={0}>
				<Box x={8} y={8} w={584} h={424} />
				<text x={22} y={426}>
					System boundary
				</text>
			</Part>

			<Part area="cloud-planning" delay={150}>
				<Box x={150} y={62} w={412} h={234} />
				<text x={162} y={82}>
					Cloud region
				</text>
			</Part>

			<Part area="data-integration" delay={300}>
				<Box x={16} y={46} w={100} h={194} />
				<text x={24} y={63}>
					Kubernetes
				</text>
				{adapters.map((name, index) => (
					<Box
						key={name}
						x={24}
						y={72 + index * 32}
						w={84}
						h={26}
						label={name}
					/>
				))}
				<Stroke d="M108 85 H128 M108 117 H128 M108 149 H128 M108 181 H128 M108 213 H128 M128 85 V213" />
				<Stroke d="M128 148 H160 M154 142 L160 148 L154 154" />
				<Stroke d="M250 148 H276 M270 142 L276 148 L270 154" />
				<Box
					x={276}
					y={126}
					w={110}
					h={44}
					label="Consolidate"
					note="functions"
				/>
			</Part>

			<Part area="security" delay={450}>
				<rect
					x={140}
					y={52}
					width={432}
					height={254}
					strokeDasharray="6 5"
					className="draw-fade"
				/>
				<text x={572} y={322} textAnchor="end">
					Security perimeter
				</text>
				<Box x={276} y={250} w={96} h={36} label="Edge / WAF" />
			</Part>

			<Part area="platform-tooling" delay={600}>
				<Box x={150} y={344} w={116} h={32} label="Code repository" />
				<Box x={320} y={344} w={96} h={32} label="Pipeline" />
				<Stroke d="M368 344 V296 M362 302 L368 296 L374 302" />
			</Part>

			<Part area="code-review" delay={750}>
				<Stroke d="M266 360 H277 M290 347 L303 360 L290 373 L277 360 Z M303 360 H320 M314 354 L320 360 L314 366" />
				<text x={290} y={394} textAnchor="middle">
					Review
				</text>
			</Part>

			<Part area="iac" delay={900}>
				<Box x={444} y={344} w={104} h={32} label="Terraform" />
				<Stroke d="M496 344 V296 M490 302 L496 296 L502 302" />
			</Part>

			<Part area="architecture" delay={1050}>
				<Box x={160} y={130} w={90} h={36} label="Queue" />
				<Stroke d="M386 148 H400 V116 H412 M406 110 L412 116 L406 122 M400 148 V180 H412 M406 174 L412 180 L406 186" />
				<Box
					x={412}
					y={94}
					w={128}
					h={44}
					label="Database"
					note="managed"
				/>
				<Box x={412} y={158} w={128} h={44} label="Cache" />
				<Stroke d="M476 202 V246 M470 240 L476 246 L482 240 M540 116 H552 V268 H540 M546 262 L540 268 L546 274" />
				<Box
					x={412}
					y={246}
					w={128}
					h={44}
					label="Serving API"
					note="container apps"
				/>
				<Stroke d="M412 268 H372 M378 262 L372 268 L378 274" />
				<Stroke d="M276 268 H108 M114 262 L108 268 L114 274" />
				<Box x={24} y={250} w={84} h={36} label="Consumers" />
			</Part>
		</DrawingFrame>
	)
}

/** The areas of practice and a system drawing that traces each one. */
export const PracticeMap = {
	Provider: PracticeMapProvider,
	Key: PracticeMapKey,
	Drawing: PracticeMapDrawing,
}
