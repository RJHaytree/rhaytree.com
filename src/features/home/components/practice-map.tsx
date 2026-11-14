import { createContext, use, useId, useState } from 'react'

import { cn } from '#/lib/cn'

const areas = [
	{
		id: 'architecture',
		name: 'Architecture',
		detail: 'Defining how systems and services fit together before they are built.',
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
}: {
	x: number
	y: number
	w: number
	h: number
	label?: string
}) {
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
			{label ? (
				<text x={x + w / 2} y={y + h / 2 + 5} textAnchor="middle">
					{label}
				</text>
			) : null}
		</>
	)
}

const drawingDescription =
	'Clients reach services through an edge firewall and an API gateway. Services, a queue and a database are spread across two zones of a cloud region inside a security perimeter, with the database replicated between zones. A code repository feeds a deploy pipeline through a review gate, and Terraform defines the infrastructure.'

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
			<title id={titleId}>Illustrative reference architecture</title>
			<desc id={descId}>{drawingDescription}</desc>
			{children}
		</svg>
	)
}

/**
 * The phone variant: the same reference architecture in a narrow layout with
 * fewer, larger parts, so its labels stay legible at phone width.
 */
function CompactDrawing() {
	return (
		<DrawingFrame
			viewBox="0 0 340 360"
			className="drawing-compact mx-auto max-h-[42svh] sm:hidden"
		>
			<Part area="architecture" delay={0}>
				<Box x={4} y={4} w={332} h={352} />
				<text x={14} y={346}>
					System boundary
				</text>
			</Part>

			<Part area="cloud-planning" delay={150}>
				<Box x={122} y={68} w={202} h={244} />
				<text x={130} y={86}>
					Region
				</text>
				<Box x={130} y={94} w={90} h={210} />
				<text x={137} y={112}>
					Zone A
				</text>
				<Box x={228} y={94} w={90} h={210} />
				<text x={235} y={112}>
					Zone B
				</text>
			</Part>

			<Part area="security" delay={300}>
				<Box x={122} y={14} w={96} h={32} label="Edge / WAF" />
				<rect
					x={114}
					y={60}
					width={218}
					height={260}
					strokeDasharray="6 5"
					className="draw-fade"
				/>
				<text x={326} y={334} textAnchor="end">
					Perimeter
				</text>
			</Part>

			<Part area="platform-tooling" delay={450}>
				<Box x={12} y={70} w={96} h={32} label="Repo" />
				<Stroke d="M60 102 V110" />
				<Box x={12} y={154} w={96} h={32} label="Pipeline" />
				<Stroke d="M108 170 H130 M124 164 L130 170 L124 176" />
			</Part>

			<Part area="code-review" delay={600}>
				<Stroke d="M60 110 L76 126 L60 142 L44 126 Z" />
				<Stroke d="M60 142 V154 M54 148 L60 154 L66 148" />
			</Part>

			<Part area="iac" delay={750}>
				<Box x={12} y={232} w={96} h={32} label="Terraform" />
				<Stroke d="M108 248 H122 M116 242 L122 248 L116 254" />
			</Part>

			<Part area="architecture" delay={900}>
				<Box x={12} y={14} w={96} h={32} label="Clients" />
				<Stroke d="M108 30 H122 M116 24 L122 30 L116 36" />
				<Stroke d="M218 30 H234 M228 24 L234 30 L228 36" />
				<Box x={234} y={14} w={94} h={32} label="Gateway" />
				<Stroke d="M281 46 V124 M275 118 L281 124 L287 118 M281 54 H175 V124 M169 118 L175 124 L181 118" />
				<Box x={136} y={124} w={78} h={32} label="Service" />
				<Box x={234} y={124} w={78} h={32} label="Service" />
				<Box x={136} y={252} w={78} h={32} label="Data" />
				<Box x={234} y={252} w={78} h={32} label="Replica" />
				<Stroke d="M175 156 V252 M273 156 V252" />
				<Stroke d="M214 268 H234 M228 262 L234 268 L228 274" />
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
 * An illustrative reference architecture, drawn as an engineering schematic.
 * Deliberately generic: it describes no client or employer system.
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
				<Box x={170} y={100} w={406} h={300} />
				<text x={182} y={120}>
					Cloud region
				</text>
				<Box x={186} y={132} w={180} h={252} />
				<text x={198} y={152}>
					Zone A
				</text>
				<Box x={382} y={132} w={180} h={252} />
				<text x={394} y={152}>
					Zone B
				</text>
			</Part>

			<Part area="security" delay={300}>
				<Box x={316} y={28} w={112} h={36} label="Edge / WAF" />
				<rect
					x={160}
					y={90}
					width={426}
					height={320}
					strokeDasharray="6 5"
					className="draw-fade"
				/>
				<text x={578} y={426} textAnchor="end">
					Security perimeter
				</text>
			</Part>

			<Part area="platform-tooling" delay={450}>
				<Box x={24} y={120} w={116} h={36} label="Code repository" />
				<Stroke d="M82 156 V172" />
				<Box x={24} y={214} w={116} h={36} label="Pipeline" />
				<Stroke d="M140 232 H206 M200 226 L206 232 L200 238" />
			</Part>

			<Part area="code-review" delay={600}>
				<Stroke d="M82 172 L95 185 L82 198 L69 185 Z" />
				<Stroke d="M82 198 V214 M76 208 L82 214 L88 208" />
				<text x={102} y={190}>
					Review
				</text>
			</Part>

			<Part area="iac" delay={750}>
				<Box x={24} y={300} w={116} h={36} label="Terraform" />
				<Stroke d="M140 318 H186 M180 312 L186 318 L180 324" />
			</Part>

			<Part area="architecture" delay={900}>
				<Box x={176} y={28} w={104} h={36} label="Clients" />
				<Stroke d="M280 46 H316 M310 40 L316 46 L310 52" />
				<Stroke d="M428 46 H464 M458 40 L464 46 L458 52" />
				<Box x={464} y={28} w={112} h={36} label="API gateway" />
				<Stroke d="M520 64 V116 H276 V168 M270 162 L276 168 L282 162 M472 116 V168 M466 162 L472 168 L478 162" />
				<Box x={206} y={168} w={140} h={32} label="Service" />
				<Box x={206} y={216} w={140} h={32} label="Service" />
				<Box x={206} y={330} w={140} h={36} label="Database" />
				<Stroke d="M276 200 V216 M276 248 V330" />
				<Box x={402} y={168} w={140} h={32} label="Service" />
				<Box x={402} y={216} w={140} h={32} label="Queue" />
				<Box x={402} y={330} w={140} h={36} label="Replica" />
				<Stroke d="M472 200 V216 M472 248 V330" />
				<Stroke d="M346 348 H402 M396 342 L402 348 L396 354" />
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
