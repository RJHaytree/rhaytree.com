/**
 * A small system-design sketch for the identity column: external data feeds
 * several services, which join into one product. Varied shapes travel from
 * the outside to the services; uniform records travel on to the product.
 * The product is the focal part, marked by a heavier, brighter stroke rather
 * than colour. All motion is hidden under reduced motion.
 */

const services = [
	{ y: 8, label: 'Service A' },
	{ y: 40, label: 'Service B' },
	{ y: 72, label: 'Service C' },
] as const

const inputs = [
	{ colour: 'sky', shape: 'circle', delay: '0s', service: 0 },
	{ colour: 'orange', shape: 'triangle', delay: '-1.4s', service: 1 },
	{ colour: 'azure', shape: 'diamond', delay: '-2.8s', service: 2 },
] as const

/** Centre line of each service box. */
const serviceMid = (index: number) => services[index].y + 12

/** External data (right edge, x 108) through the left bus to a service. */
const inPath = (index: number) =>
	`path("M108 52 H136 V${serviceMid(index)} H164")`

/** A service (right edge, x 244) through the right bus to the product. */
const outPath = (index: number) =>
	`path("M244 ${serviceMid(index)} H284 V52 H316")`

function InputShape({
	shape,
	fill,
}: {
	shape: (typeof inputs)[number]['shape']
	fill: string
}) {
	if (shape === 'circle') return <circle r={4.5} fill={fill} />
	if (shape === 'triangle') return <path d="M0 -5 L5 4 H-5 Z" fill={fill} />
	return <path d="M0 -5.5 L5.5 0 L0 5.5 L-5.5 0 Z" fill={fill} />
}

const label = {
	fontSize: 12,
	fontFamily: 'var(--font-mono)',
	textAnchor: 'middle',
} as const

export function SystemSketch() {
	return (
		<figure className="m-0">
			<svg
				viewBox="0 0 420 104"
				role="img"
				aria-label="System sketch: external data feeds three services, which join together into one product."
				className="h-auto w-full"
				fill="none"
			>
				{/* External data: outside the system, so a dashed boundary. */}
				<rect
					x={4}
					y={36}
					width={104}
					height={32}
					fill="var(--color-graphite-1)"
					stroke="var(--color-graphite-6)"
					strokeDasharray="4 3"
				/>
				<text x={56} y={56} fill="var(--color-graphite-9)" {...label}>
					External data
				</text>

				{/* Wiring: a bus either side of the services. */}
				<path
					d="M108 52 H136 M136 20 V84 M136 20 H164 M136 52 H164 M136 84 H164 M244 20 H284 M244 52 H284 M244 84 H284 M284 20 V84 M284 52 H316"
					stroke="var(--color-graphite-6)"
				/>

				{services.map((service) => (
					<g key={service.label}>
						<rect
							x={164}
							y={service.y}
							width={80}
							height={24}
							fill="var(--color-graphite-2)"
							stroke="var(--color-graphite-6)"
						/>
						<text
							x={204}
							y={service.y + 16}
							fill="var(--color-graphite-10)"
							{...label}
						>
							{service.label}
						</text>
					</g>
				))}

				{/* The product: focal by weight and brightness. */}
				<rect
					x={316}
					y={32}
					width={100}
					height={40}
					fill="var(--color-graphite-2)"
					stroke="var(--color-graphite-10)"
					strokeWidth={2}
				/>
				<text
					x={366}
					y={56}
					fill="var(--color-graphite-10)"
					fontWeight={600}
					{...label}
				>
					Product
				</text>

				{/* Moving parts: varied inputs in, uniform records out. */}
				{inputs.map((input) => (
					<g
						key={input.shape}
						className="sketch-input"
						style={{
							offsetPath: inPath(input.service),
							animationDelay: input.delay,
						}}
					>
						<InputShape
							shape={input.shape}
							fill={`var(--color-${input.colour}-7)`}
						/>
					</g>
				))}
				{inputs.map((input) => (
					<rect
						key={input.shape}
						className="sketch-record"
						x={-6}
						y={-3}
						width={12}
						height={6}
						fill="var(--color-graphite-10)"
						style={{
							offsetPath: outPath(input.service),
							animationDelay: `calc(${input.delay} - 2.1s)`,
						}}
					/>
				))}
			</svg>
		</figure>
	)
}
