import type { SkillGroup } from '../types/experience'

export function SkillGroups({ groups }: { groups: Array<SkillGroup> }) {
  return (
    <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-[10rem_1fr]">
      {groups.map((group) => (
        <div key={group.area} className="contents">
          <dt className="font-medium">{group.area}</dt>
          <dd>{group.skills.join(', ')}</dd>
        </div>
      ))}
    </dl>
  )
}
