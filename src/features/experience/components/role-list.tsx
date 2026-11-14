import type { Role } from '../types/experience'

// Fixed three-letter months: en-GB's Intl short form gives "Sept", which
// breaks the even rhythm of the date column.
const months = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
]

function formatYearMonth(value: string) {
	const [year, month] = value.split('-')
	return `${months[Number(month) - 1]} ${year}`
}

function DateRange({ start, end }: { start: string; end?: string }) {
	return (
		<>
			<time dateTime={start}>{formatYearMonth(start)}</time>
			{' to '}
			{end ? (
				<time dateTime={end}>{formatYearMonth(end)}</time>
			) : (
				'present'
			)}
		</>
	)
}

interface OrganisationGroup {
	organisation: string
	location?: string
	roles: Array<Role>
}

/** Consecutive roles at the same organisation, kept in their given order. */
function groupByOrganisation(roles: Array<Role>): Array<OrganisationGroup> {
	const groups: Array<OrganisationGroup> = []
	for (const role of roles) {
		const last = groups[groups.length - 1]
		if (last && last.organisation === role.organisation) {
			last.roles.push(role)
		} else {
			groups.push({
				organisation: role.organisation,
				location: role.location,
				roles: [role],
			})
		}
	}
	return groups
}

/**
 * Roles grouped by organisation: the organisation's span in the margin
 * column, then each role as a step on a hairline timeline.
 */
export function RoleList({ roles }: { roles: Array<Role> }) {
	const groups = groupByOrganisation(roles)

	return (
		<ol className="m-0 list-none border-t border-rule p-0">
			{groups.map((group) => {
				const earliest = group.roles[group.roles.length - 1]
				const latest = group.roles[0]
				const current = group.roles.some((role) => !role.end)

				return (
					<li
						key={`${group.organisation}-${earliest?.start}`}
						className="grid gap-x-10 gap-y-3 border-b border-rule py-8 md:grid-cols-[12rem_minmax(0,1fr)]"
					>
						<p className="font-mono text-sm leading-7 text-muted tabular-nums">
							{earliest ? (
								<DateRange
									start={earliest.start}
									end={current ? undefined : latest?.end}
								/>
							) : null}
						</p>
						<div className="max-w-[65ch]">
							<h3 className="text-xl font-semibold text-bright">
								{group.organisation}
							</h3>
							{group.location ? (
								<p className="text-muted">{group.location}</p>
							) : null}

							<ol className="m-0 mt-6 list-none space-y-7 border-l border-rule-strong p-0 pl-6">
								{group.roles.map((role) => (
									<li
										key={`${role.title}-${role.start}`}
										className="relative"
									>
										<span
											aria-hidden="true"
											className={
												role.end
													? 'absolute top-2.5 -left-[1.6rem] size-2 border border-rule-strong bg-sheet'
													: 'absolute top-2.5 -left-[1.6rem] size-2 bg-signal'
											}
										/>
										<h4 className="font-display text-lg font-semibold text-bright [font-stretch:112%]">
											{role.title}
										</h4>
										<p className="font-mono text-sm text-muted tabular-nums">
											<DateRange
												start={role.start}
												end={role.end}
											/>
											{role.arrangement
												? `, ${role.arrangement}`
												: null}
										</p>
										<p className="mt-3">{role.summary}</p>
										{role.highlights.length > 0 ? (
											<ul className="mt-3 space-y-2 pl-5 text-muted marker:text-rule-strong [list-style-type:'–_']">
												{role.highlights.map(
													(highlight) => (
														<li
															key={highlight}
															className="pl-1"
														>
															{highlight}
														</li>
													),
												)}
											</ul>
										) : null}
									</li>
								))}
							</ol>
						</div>
					</li>
				)
			})}
		</ol>
	)
}
