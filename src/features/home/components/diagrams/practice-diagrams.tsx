import {
	Balloon,
	Box,
	Diagram,
	FrameLabel,
	head,
	Layer,
	Line,
} from './primitives'

/** Services with clear boundaries: a synchronous API and asynchronous events. */
export function ArchitectureDiagram() {
	return (
		<Diagram title="Diagram: three services with clear boundaries, talking over an API and events, each owning its data">
			<Layer>
				<Box x={8} y={8} w={464} h={344} />
				<FrameLabel x={20} y={30}>
					System
				</FrameLabel>
				<Box x={40} y={70} w={150} h={52} label="Service A" />
				<Box x={290} y={70} w={150} h={52} label="Service B" />
				<Box x={290} y={236} w={150} h={52} label="Service C" />
				<Box x={40} y={236} w={150} h={52} label="A's data" />
				<Line d={`M115 122 V236 ${head.down(115, 236)}`} />
			</Layer>
			<Layer focal>
				<Line d={`M190 96 H290 ${head.right(290, 96)}`} />
				<text x={240} y={86} textAnchor="middle">
					API
				</text>
				<Line d="M365 122 V236" dashed />
				<Line d={head.down(365, 236)} />
				<text x={377} y={184}>
					Events
				</text>
			</Layer>
		</Diagram>
	)
}

/** Many protocols in, normalised into one canonical model, then stored. */
export function DataModellingDiagram() {
	const protocols = ['HTTP', 'MQTT', 'IBM MQ', 'SMTP']

	return (
		<Diagram title="Diagram: data from HTTP, MQTT, IBM MQ and SMTP normalised into one canonical model, then stored">
			<Layer>
				{protocols.map((name, index) => (
					<Box
						key={name}
						x={16}
						y={36 + index * 62}
						w={110}
						h={40}
						label={name}
					/>
				))}
				<Line d="M126 56 H146 M126 118 H146 M126 180 H146 M126 242 H146 M146 56 V242" />
				<Line d={`M146 150 H170 ${head.right(170, 150)}`} />
				<Box x={170} y={124} w={120} h={52} label="Normalise" />
				<Line d={`M290 150 H318 ${head.right(318, 150)}`} />
				<Line d={`M384 228 V292 ${head.down(384, 292)}`} />
				<Box x={318} y={292} w={132} h={44} label="Database" />
			</Layer>
			<Layer focal>
				<Box x={318} y={72} w={132} h={156} />
				<text x={330} y={98}>
					Model
				</text>
				<Line d="M318 110 H450" />
				<text x={330} y={136} className="drawing-note">
					id
				</text>
				<text x={330} y={162} className="drawing-note">
					source
				</text>
				<text x={330} y={188} className="drawing-note">
					value
				</text>
				<text x={330} y={214} className="drawing-note">
					timestamp
				</text>
			</Layer>
		</Diagram>
	)
}

/** What runs where: receivers, functions, serving and storage in one region. */
export function CloudPlanningDiagram() {
	return (
		<Diagram title="Diagram: a cloud region with receivers on Kubernetes, processing in functions, serving on container apps and a managed database">
			<Layer>
				<Box x={8} y={8} w={464} h={344} />
				<FrameLabel x={20} y={30}>
					Cloud region
				</FrameLabel>
				<Box
					x={36}
					y={60}
					w={180}
					h={72}
					label="Kubernetes"
					note="receivers"
				/>
				<Box
					x={264}
					y={60}
					w={180}
					h={72}
					label="Functions"
					note="processing"
				/>
				<Box
					x={264}
					y={232}
					w={180}
					h={72}
					label="Managed DB"
					note="storage"
				/>
				<Box
					x={36}
					y={232}
					w={180}
					h={72}
					label="Container apps"
					note="serving"
				/>
			</Layer>
			<Layer focal>
				<Line d={`M216 96 H264 ${head.right(264, 96)}`} />
				<Line d={`M354 132 V232 ${head.down(354, 232)}`} />
				<Line d={`M264 268 H216 ${head.left(216, 268)}`} />
			</Layer>
		</Diagram>
	)
}

/** One shared pipeline from commit to every environment. */
export function PlatformToolingDiagram() {
	const stages = ['Commit', 'Build', 'Test', 'Deploy']
	const envs = ['Dev', 'Staging', 'Prod']

	return (
		<Diagram title="Diagram: a shared pipeline from commit, build and test to deploy, releasing to dev, staging and production">
			<Layer focal>
				<Box x={8} y={40} w={464} h={96} />
				<FrameLabel x={20} y={62}>
					Shared pipeline
				</FrameLabel>
				{stages.map((name, index) => (
					<Box
						key={name}
						x={22 + index * 114}
						y={74}
						w={94}
						h={44}
						label={name}
					/>
				))}
				<Line
					d={[0, 1, 2]
						.map((i) => {
							const x = 116 + i * 114
							return `M${x} 96 H${x + 20} ${head.right(x + 20, 96)}`
						})
						.join(' ')}
				/>
			</Layer>
			<Layer>
				<Line d="M411 118 V180 H85 M240 180 V240 M85 180 V240 M395 180 V240" />
				<Line
					d={`${head.down(85, 240)} ${head.down(240, 240)} ${head.down(395, 240)}`}
				/>
				{envs.map((name, index) => (
					<Box
						key={name}
						x={20 + index * 155}
						y={240}
						w={130}
						h={48}
						label={name}
					/>
				))}
			</Layer>
		</Diagram>
	)
}

/** Terraform modules composed into an environment, reviewed as a plan. */
export function InfrastructureAsCodeDiagram() {
	const modules = ['Network', 'Compute', 'Data']

	return (
		<Diagram title="Diagram: an environment composed from network, compute and data Terraform modules, reviewed as a plan before it is applied">
			<Layer>
				<Box x={165} y={20} w={150} h={48} label="Environment" />
				<Line d="M240 68 V100 H85 V130 M240 100 V130 M395 100 V130" />
				<Line
					d={`${head.down(85, 130)} ${head.down(240, 130)} ${head.down(395, 130)}`}
				/>
				{modules.map((name, index) => (
					<Box
						key={name}
						x={20 + index * 155}
						y={130}
						w={130}
						h={48}
						label={name}
						note="module"
					/>
				))}
				<Line d="M85 178 V214 H395 V178 M240 178 V214 M160 214 V250" />
				<Line d={head.down(160, 250)} />
				<Line d={`M235 274 H285 ${head.right(285, 274)}`} />
				<Box x={285} y={250} w={130} h={48} label="Apply" />
			</Layer>
			<Layer focal>
				<Box
					x={85}
					y={250}
					w={150}
					h={48}
					label="Plan"
					note="reviewed"
				/>
			</Layer>
		</Diagram>
	)
}

/** Nested layers, each with a numbered audit checkpoint. */
export function SecurityAuditingDiagram() {
	return (
		<Diagram title="Diagram: nested security layers (edge, network, service and data), each with a numbered audit checkpoint">
			<Layer>
				<Box x={8} y={8} w={464} h={344} />
				<FrameLabel x={22} y={32}>
					Edge
				</FrameLabel>
				<Box x={52} y={52} w={376} h={256} />
				<FrameLabel x={66} y={76}>
					Network
				</FrameLabel>
				<Box x={100} y={96} w={280} h={168} />
				<FrameLabel x={114} y={120}>
					Service
				</FrameLabel>
				<Box x={170} y={150} w={140} h={66} label="Data" />
			</Layer>
			<Layer focal>
				<Balloon x={448} y={32} n={1} />
				<Balloon x={404} y={76} n={2} />
				<Balloon x={356} y={120} n={3} />
				<Balloon x={286} y={174} n={4} />
			</Layer>
		</Diagram>
	)
}

/** A branch merging back into main only through a review gate. */
export function CodeReviewDiagram() {
	const mainCommits = [60, 140, 440]
	const branchCommits = [170, 240]

	return (
		<Diagram title="Diagram: a feature branch merging back into main only after passing a review gate">
			<Layer>
				<Line d="M30 270 H460" />
				<text x={30} y={300} className="drawing-frame-label">
					main
				</text>
				<Line d="M140 270 V110 H290" />
				<text x={156} y={96} className="drawing-frame-label">
					feature
				</text>
				{mainCommits.map((x) => (
					<circle
						key={x}
						cx={x}
						cy={270}
						r={7}
						pathLength={1}
						className="draw-stroke"
					/>
				))}
				{branchCommits.map((x) => (
					<circle
						key={x}
						cx={x}
						cy={110}
						r={7}
						pathLength={1}
						className="draw-stroke"
					/>
				))}
				<Line d={`M390 110 H420 V270 ${head.down(420, 270)}`} />
			</Layer>
			<Layer focal>
				<Line d="M290 110 H312" />
				<Line d="M340 82 L368 110 L340 138 L312 110 Z" />
				<Line d="M368 110 H390" />
				<text x={340} y={164} textAnchor="middle">
					Review
				</text>
			</Layer>
		</Diagram>
	)
}
