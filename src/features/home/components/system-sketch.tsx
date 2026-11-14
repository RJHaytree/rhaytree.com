import { TextLink } from '#/components/ui/text-link'

/**
 * A small system-design sketch for the identity column: ingest, model (the
 * focal step), store and serve, each tied to a data lane beneath them.
 * Messages ride the lane: varied source shapes up to the model, uniform
 * records after it. The motion is hidden under reduced motion.
 */

const boxes = [
	{ x: 60, label: 'Ingest' },
	{ x: 152, label: 'Model', focal: true },
	{ x: 244, label: 'Store' },
	{ x: 336, label: 'Serve' },
] as const

const inputs = [
	{ colour: 'sky', shape: 'circle', delay: '0s' },
	{ colour: 'orange', shape: 'triangle', delay: '-1.4s' },
	{ colour: 'azure', shape: 'diamond', delay: '-2.8s' },
] as const

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

export function SystemSketch() {
	return (
		<figure className="m-0">
			<svg
				viewBox="0 0 420 100"
				role="img"
				aria-label="System sketch: data from many sources is ingested, shaped into one model, stored and served."
				className="h-auto w-full"
				fill="none"
			>
				{/* Sources: a small stack of different source shapes. */}
				<circle cx={14} cy={66} r={5} fill="var(--color-sky-7)" />
				<path d="M14 75 L19 84 H9 Z" fill="var(--color-orange-7)" />
				<path
					d="M28 66 H36 M28 80 H36 M36 66 V80 M36 76 H412"
					stroke="var(--color-graphite-6)"
				/>

				{boxes.map((box, index) => {
					const focal = 'focal' in box && box.focal
					const cx = box.x + 36
					return (
						<g key={box.label}>
							{index > 0 ? (
								<path
									d={`M${box.x - 20} 32 H${box.x}`}
									stroke="var(--color-graphite-6)"
								/>
							) : null}
							<path
								d={`M${cx} 48 V76`}
								stroke={
									focal
										? 'var(--color-signal-7)'
										: 'var(--color-graphite-6)'
								}
								strokeDasharray={focal ? undefined : '3 3'}
							/>
							<rect
								x={box.x}
								y={16}
								width={72}
								height={32}
								fill={
									focal
										? 'var(--color-signal-2)'
										: 'var(--color-graphite-2)'
								}
								stroke={
									focal
										? 'var(--color-signal-7)'
										: 'var(--color-graphite-6)'
								}
								strokeWidth={focal ? 2 : 1}
							/>
							<text
								x={cx}
								y={37}
								textAnchor="middle"
								fontSize={12}
								fontFamily="var(--font-mono)"
								fontWeight={focal ? 600 : 400}
								fill={
									focal
										? 'var(--color-signal-9)'
										: 'var(--color-graphite-10)'
								}
							>
								{box.label}
							</text>
						</g>
					)
				})}

				{/* Messages on the lane: varied before the model, uniform after. */}
				{inputs.map((input) => (
					<g
						key={input.shape}
						className="sketch-input"
						style={{ animationDelay: input.delay }}
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
						style={{ animationDelay: input.delay }}
					/>
				))}
			</svg>
			<figcaption className="mt-1 font-mono text-xs text-muted">
				Ingest, model, store, serve.{' '}
				<TextLink to="/work" hash="example">
					See it run
				</TextLink>
			</figcaption>
		</figure>
	)
}
