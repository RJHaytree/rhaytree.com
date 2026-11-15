import type { SkillGroup } from '../types/experience'

/**
 * Skills as a schedule: area in the margin column, skills beside it. Sized
 * by its container, so it stacks when placed in a narrow side column.
 */
export function SkillGroups({ groups }: { groups: Array<SkillGroup> }) {
	return (
		<dl className="@container m-0 border-t border-rule">
			{groups.map((group) => (
				<div
					key={group.area}
					className="grid gap-x-10 gap-y-1 border-b border-rule py-4 @xl:grid-cols-[12rem_minmax(0,1fr)]"
				>
					<dt className="font-medium text-bright">{group.area}</dt>
					<dd className="m-0 max-w-[65ch] text-muted">
						{group.skills.join(', ')}
					</dd>
				</div>
			))}
		</dl>
	)
}
