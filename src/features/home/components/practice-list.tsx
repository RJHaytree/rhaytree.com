import type { PracticeArea } from '../api/practice-areas'

/** The areas of practice as a numbered schedule: number, name, one line. */
export function PracticeList({ areas }: { areas: Array<PracticeArea> }) {
	return (
		<ol className="m-0 list-none border-t border-rule p-0">
			{areas.map((area, index) => (
				<li
					key={area.id}
					className="grid gap-x-6 gap-y-1 border-b border-rule py-5 sm:grid-cols-[3rem_minmax(0,1fr)]"
				>
					<span className="font-mono text-sm leading-7 text-muted tabular-nums">
						{String(index + 1).padStart(2, '0')}
					</span>
					<div>
						<h3 className="text-lg leading-7 font-semibold text-bright">
							{area.name}
						</h3>
						<p className="mt-1 max-w-[60ch] text-muted">
							{area.detail}
						</p>
					</div>
				</li>
			))}
		</ol>
	)
}
