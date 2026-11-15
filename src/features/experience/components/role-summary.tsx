import type { Role } from '../types/experience'
import { DateRange } from './role-list'

/**
 * The short form of the role schedule for the home sheet: dates in the margin
 * column, then title and organisation on one line. Summaries, highlights and
 * skills live only on the Experience sheet.
 */
export function RoleSummary({ roles }: { roles: Array<Role> }) {
	return (
		<ol className="m-0 list-none border-t border-rule p-0">
			{roles.map((role) => (
				<li
					key={`${role.organisation}-${role.start}`}
					className="grid gap-x-10 gap-y-1 border-b border-rule py-4 md:grid-cols-[12rem_minmax(0,1fr)]"
				>
					<p className="font-mono text-sm leading-7 text-muted tabular-nums">
						<DateRange start={role.start} end={role.end} />
					</p>
					<p className="leading-7">
						<span className="font-semibold text-bright">
							{role.title}
						</span>
						<span className="text-muted">
							, {role.organisation}
						</span>
					</p>
				</li>
			))}
		</ol>
	)
}
