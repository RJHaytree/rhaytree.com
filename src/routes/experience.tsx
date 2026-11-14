import { createFileRoute } from '@tanstack/react-router'

import { Page } from '../components/layout/page'
import { Section } from '../components/ui/section'

export const Route = createFileRoute('/experience')({
  head: () => ({ meta: [{ title: 'Experience | Ryan Haytree' }] }),
  component: Experience,
})

function Experience() {
  return (
    <Page.Root className="space-y-12">
      <Page.Title>Experience</Page.Title>

      <Section.Root>
        <Section.Title>Roles</Section.Title>
        <Section.Body>
          <p>[Placeholder: role history.]</p>
        </Section.Body>
      </Section.Root>

      <Section.Root>
        <Section.Title>Skills</Section.Title>
        <Section.Body>
          <p>[Placeholder: skills grouped by area.]</p>
        </Section.Body>
      </Section.Root>
    </Page.Root>
  )
}
