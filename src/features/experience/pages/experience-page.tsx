import { Page } from '#/components/layout/page'
import { Section } from '#/components/ui/section'

import { RoleList } from '../components/role-list'
import { SkillGroups } from '../components/skill-groups'
import type { Experience } from '../types/experience'

export function ExperiencePage({ experience }: { experience: Experience }) {
  return (
    <Page.Root className="space-y-12">
      <Page.Title>Experience</Page.Title>

      <Section.Root>
        <Section.Title>Roles</Section.Title>
        <Section.Body>
          {experience.roles.length > 0 ? (
            <RoleList roles={experience.roles} />
          ) : (
            <p>Role history is being added.</p>
          )}
        </Section.Body>
      </Section.Root>

      <Section.Root>
        <Section.Title>Skills</Section.Title>
        <Section.Body>
          {experience.skillGroups.length > 0 ? (
            <SkillGroups groups={experience.skillGroups} />
          ) : (
            <p>Skills are being added.</p>
          )}
        </Section.Body>
      </Section.Root>
    </Page.Root>
  )
}
