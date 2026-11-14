import { TextLink } from './text-link'

import type { CaseStudy } from '../../content/case-studies'

export function CaseStudyList({
  studies,
}: {
  studies: Array<Pick<CaseStudy, 'slug' | 'title' | 'summary'>>
}) {
  return (
    <ul className="space-y-6">
      {studies.map((study) => (
        <li key={study.slug}>
          <TextLink
            to="/work/$slug"
            params={{ slug: study.slug }}
            className="text-lg font-medium"
          >
            {study.title}
          </TextLink>
          <p className="mt-1">{study.summary}</p>
        </li>
      ))}
    </ul>
  )
}
