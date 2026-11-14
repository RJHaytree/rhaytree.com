import { Page } from '#/components/layout/page'
import { Section } from '#/components/ui/section'

export function ExperiencePage() {
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
