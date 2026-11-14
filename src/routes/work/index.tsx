import { createFileRoute } from '@tanstack/react-router'

import { Page } from '../../components/layout/page'
import { CaseStudyList } from '../../components/ui/case-study-list'
import { TextLink } from '../../components/ui/text-link'
import { listCaseStudies } from '../../content/case-studies'

export const Route = createFileRoute('/work/')({
  head: () => ({ meta: [{ title: 'Work | Ryan Haytree' }] }),
  loader: () => listCaseStudies(),
  component: WorkIndex,
})

function WorkIndex() {
  const studies = Route.useLoaderData()

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
