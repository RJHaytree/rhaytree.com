import { Page } from '#/components/layout/page'
import { Section } from '#/components/ui/section'
import { TextLink } from '#/components/ui/text-link'
import { CaseStudyList } from '#/features/case-studies/components/case-study-list'
import type { CaseStudySummary } from '#/features/case-studies/types/case-study'

export function HomePage({ featured }: { featured: Array<CaseStudySummary> }) {
  return (
    <Page.Root className="space-y-16">
      <div>
        <Page.Title>Ryan Haytree</Page.Title>
        <Page.Lead>
          Platform and systems engineer. [Placeholder: positioning statement.]
        </Page.Lead>
      </div>

      <Section.Root id="about">
        <Section.Title>About</Section.Title>
        <Section.Body>
          <p>[Placeholder: short about section.]</p>
        </Section.Body>
      </Section.Root>

      <Section.Root>
        <Section.Title>Selected work</Section.Title>
        <Section.Body>
          {featured.length > 0 ? (
            <CaseStudyList studies={featured} />
          ) : (
            <p>
              Case studies are being written up.{' '}
              <TextLink to="/experience">See my experience</TextLink> in the
              meantime.
            </p>
          )}
        </Section.Body>
      </Section.Root>
    </Page.Root>
  )
}
