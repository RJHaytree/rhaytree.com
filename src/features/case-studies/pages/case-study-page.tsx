import { Page } from '#/components/layout/page'
import { Section } from '#/components/ui/section'
import { TextLink } from '#/components/ui/text-link'

import type { CaseStudy } from '../types/case-study'

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  return (
    <Page.Root>
      <article className="space-y-12">
        <div>
          <p className="mb-6">
            <TextLink to="/work">All work</TextLink>
          </p>
          <Page.Title>{study.title}</Page.Title>
          <Page.Lead>{study.summary}</Page.Lead>
        </div>

        <Section.Root>
          <Section.Title>Context</Section.Title>
          <Section.Body>
            <p>{study.context}</p>
          </Section.Body>
        </Section.Root>

        <Section.Root>
          <Section.Title>The problem</Section.Title>
          <Section.Body>
            <p>{study.problem}</p>
          </Section.Body>
        </Section.Root>

        <Section.Root>
          <Section.Title>My role</Section.Title>
          <Section.Body>
            <p>{study.role}</p>
          </Section.Body>
        </Section.Root>

        <Section.Root>
          <Section.Title>Approach</Section.Title>
          <Section.Body className="space-y-4">
            {study.approach.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Section.Body>
        </Section.Root>

        <Section.Root>
          <Section.Title>Outcome</Section.Title>
          <Section.Body>
            <p>{study.outcome}</p>
          </Section.Body>
        </Section.Root>

        <Section.Root>
          <Section.Title>Stack</Section.Title>
          <Section.Body>
            <ul className="flex flex-wrap gap-x-4 gap-y-1">
              {study.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Section.Body>
        </Section.Root>
      </article>
    </Page.Root>
  )
}
