import type { ShapeKind } from './category-shape'
import { CategoryShape } from './category-shape'

const sources: Array<{ name: string; shape: ShapeKind; label: string }> = [
	{ name: 'sky', shape: 'circle', label: 'HTTP' },
	{ name: 'orange', shape: 'triangle', label: 'MQTT' },
	{ name: 'violet', shape: 'square', label: 'IBM MQ' },
	{ name: 'azure', shape: 'diamond', label: 'SMTP' },
]

const mono = { fontFamily: 'var(--font-mono)', fontSize: 13 }

function arrowRight(x: number, y: number) {
	return `M${x - 7} ${y - 5} L${x} ${y} L${x - 7} ${y + 5}`
}

function Node({
	x,
	y,
	w,
	label,
	note,
	focal = false,
}: {
	x: number
	y: number
	w: number
	label: string
	note?: string
	focal?: boolean
}) {
	const h = note ? 44 : 36
	return (
		<g>
			<rect
				x={x}
				y={y}
				width={w}
				height={h}
				fill={
					focal ? 'var(--color-signal-2)' : 'var(--color-graphite-2)'
				}
				stroke={
					focal ? 'var(--color-signal-7)' : 'var(--color-graphite-6)'
				}
				strokeWidth={focal ? 2 : 1}
			/>
			<text
				x={x + w / 2}
				y={note ? y + 19 : y + 23}
				textAnchor="middle"
				fill={
					focal ? 'var(--color-signal-9)' : 'var(--color-graphite-10)'
				}
				fontWeight={focal ? 600 : 400}
				{...mono}
			>
				{label}
			</text>
			{note ? (
				<text
					x={x + w / 2}
					y={y + 35}
					textAnchor="middle"
					fill="var(--color-graphite-9)"
					{...mono}
					fontSize={11}
				>
					{note}
				</text>
			) : null}
		</g>
	)
}

/** A canonical record: one uniform shape, whatever its source. */
function Record({ x, y }: { x: number; y: number }) {
	return (
		<rect
			x={x - 5}
			y={y - 5}
			width={10}
			height={10}
			fill="var(--color-graphite-10)"
		/>
	)
}

/**
 * The diagram vocabulary in one complete flow: sources (shape plus colour)
 * merge onto a queue, are normalised (the focal step, in signal) into one
 * uniform record shape, then stored and cached. Ends in a legend.
 */
export function FlowSample() {
	return (
		<svg
			viewBox="0 0 560 330"
			role="img"
			aria-label="Messages from HTTP, MQTT, IBM MQ and SMTP sources merge onto a queue, are normalised into one uniform record format, then written to a database and a cache"
			className="h-auto w-full border border-graphite-4 bg-graphite-1"
			fill="none"
		>
			{sources.map((source, index) => {
				const y = 30 + index * 46
				return (
					<g key={source.name}>
						<rect
							x={16}
							y={y}
							width={104}
							height={32}
							fill={`var(--color-${source.name}-2)`}
							stroke={`var(--color-${source.name}-6)`}
						/>
						<g
							transform={`translate(26 ${y + 10})`}
							style={{ color: `var(--color-${source.name}-7)` }}
						>
							<CategoryShape
								kind={source.shape}
								size={12}
								className=""
							/>
						</g>
						<text
							x={46}
							y={y + 21}
							fill={`var(--color-${source.name}-9)`}
							{...mono}
						>
							{source.label}
						</text>
						<path
							d={`M120 ${y + 16} H140`}
							stroke="var(--color-graphite-6)"
						/>
					</g>
				)
			})}

			<path
				d={`M140 46 V184 M140 115 H164 ${arrowRight(164, 115)}`}
				stroke="var(--color-graphite-6)"
			/>
			<Node x={164} y={97} w={84} label="Queue" />

			<path
				d={`M248 115 H272 ${arrowRight(272, 115)}`}
				stroke="var(--color-graphite-6)"
			/>
			<Node
				x={272}
				y={93}
				w={108}
				label="Normalise"
				note="one model"
				focal
			/>

			<path
				d={`M380 115 H404 V74 H432 ${arrowRight(432, 74)} M404 115 V156 H432 ${arrowRight(432, 156)}`}
				stroke="var(--color-graphite-6)"
			/>
			<Record x={418} y={74} />
			<Record x={418} y={156} />
			<Node x={432} y={52} w={112} label="Database" note="managed" />
			<Node x={432} y={134} w={112} label="Cache" note="hot reads" />

			<path d="M16 236 H544" stroke="var(--color-graphite-4)" />
			<text
				x={16}
				y={262}
				fill="var(--color-graphite-9)"
				{...mono}
				fontSize={12}
			>
				Key
			</text>
			<g
				transform="translate(60 252)"
				style={{ color: 'var(--color-graphite-9)' }}
			>
				<CategoryShape kind="circle" size={12} className="" />
			</g>
			<text
				x={78}
				y={262}
				fill="var(--color-graphite-9)"
				{...mono}
				fontSize={12}
			>
				source type (shape + colour)
			</text>
			<Record x={302} y={258} />
			<text
				x={314}
				y={262}
				fill="var(--color-graphite-9)"
				{...mono}
				fontSize={12}
			>
				canonical record
			</text>
			<rect
				x={60}
				y={284}
				width={14}
				height={14}
				fill="var(--color-signal-2)"
				stroke="var(--color-signal-7)"
				strokeWidth={2}
			/>
			<text
				x={82}
				y={296}
				fill="var(--color-graphite-9)"
				{...mono}
				fontSize={12}
			>
				focal step (signal)
			</text>
			<path d="M296 291 H330" stroke="var(--color-graphite-6)" />
			<path d={arrowRight(330, 291)} stroke="var(--color-graphite-6)" />
			<text
				x={340}
				y={296}
				fill="var(--color-graphite-9)"
				{...mono}
				fontSize={12}
			>
				data flow
			</text>
		</svg>
	)
}
