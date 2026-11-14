import type { Role } from '../types/experience'

const monthYear = new Intl.DateTimeFormat('en-GB', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

function formatYearMonth(value: string) {
  return monthYear.format(new Date(`${value}-01T00:00:00Z`))
}

export function RoleList({ roles }: { roles: Array<Role> }) {
  return (
    <ol className="space-y-10">
      {roles.map((role) => (
        <li key={`${role.organisation}-${role.start}`}>
          <h3 className="text-lg font-semibold">{role.title}</h3>
          <p className="text-neutral-600">
            {role.organisation},{' '}
            <time dateTime={role.start}>{formatYearMonth(role.start)}</time> to{' '}
            {role.end ? (
              <time dateTime={role.end}>{formatYearMonth(role.end)}</time>
            ) : (
              'present'
            )}
          </p>
          <p className="mt-3">{role.summary}</p>
          {role.highlights.length > 0 ? (
            <ul className="mt-3 list-disc space-y-1 pl-5">
              {role.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ol>
  )
}
