import { Page } from '#/components/layout/page'
import { TextLink } from '#/components/ui/text-link'

import type { CaseStudy } from '../types/case-study'

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  return (
    <Page.Root>
      <article>
        <p className="mb-6">
          <TextLink to="/work">All work</TextLink>
        </p>
        <Page.Title>{study.title}</Page.Title>
        <Page.Lead>{study.summary}</Page.Lead>
      </article>
    </Page.Root>
  )
}
