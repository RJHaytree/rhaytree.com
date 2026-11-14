import { Page } from '#/components/layout/page'
import { TextLink } from '#/components/ui/text-link'

import { CaseStudyList } from '../components/case-study-list'
import type { CaseStudySummary } from '../types/case-study'

export function WorkPage({ studies }: { studies: Array<CaseStudySummary> }) {
  return (
    <Page.Root>
      <Page.Title>Work</Page.Title>
      <Page.Lead>
        Client work is under NDA, so these case studies describe the problem,
        the approach and the outcome without naming the client.
      </Page.Lead>
      <div className="mt-8">
        {studies.length > 0 ? (
          <CaseStudyList studies={studies} />
        ) : (
          <p className="max-w-prose">
            No case studies are published yet.{' '}
            <TextLink to="/experience">See my experience</TextLink> for the
            roles and work so far.
          </p>
        )}
      </div>
    </Page.Root>
  )
}
