import type { Role } from '../types/experience'

const monthYear = new Intl.DateTimeFormat('en-GB', {
	month: 'short',
	year: 'numeric',
	timeZone: 'UTC',
})

function formatYearMonth(value: string) {
	return monthYear.format(new Date(`${value}-01T00:00:00Z`))
}

/** A schedule of roles: dates in the margin column, the role beside them. */
export function RoleList({ roles }: { roles: Array<Role> }) {
	return (
		<ol className="m-0 list-none border-t border-rule p-0">
			{roles.map((role) => (
				<li
					key={`${role.organisation}-${role.start}`}
					className="grid gap-x-10 gap-y-2 border-b border-rule py-7 md:grid-cols-[12rem_minmax(0,1fr)]"
				>
					<p className="font-mono text-sm leading-7 text-muted tabular-nums">
						<time dateTime={role.start}>
							{formatYearMonth(role.start)}
						</time>
						{' to '}
						{role.end ? (
							<time dateTime={role.end}>
								{formatYearMonth(role.end)}
							</time>
						) : (
							'present'
						)}
					</p>
					<div className="max-w-[65ch]">
						<h3 className="text-lg font-semibold text-bright">
							{role.title}
						</h3>
						<p className="text-muted">{role.organisation}</p>
						<p className="mt-4">{role.summary}</p>
						{role.highlights.length > 0 ? (
							<ul className="mt-4 space-y-2 pl-5 text-muted marker:text-rule-strong [list-style-type:'–_']">
								{role.highlights.map((highlight) => (
									<li key={highlight} className="pl-1">
										{highlight}
									</li>
								))}
							</ul>
						) : null}
					</div>
				</li>
			))}
		</ol>
	)
}
