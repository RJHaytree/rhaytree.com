import { createFileRoute, notFound } from '@tanstack/react-router'

import { Page } from '../../components/layout/page'
import { TextLink } from '../../components/ui/text-link'
import { getCaseStudy } from '../../content/case-studies'

export const Route = createFileRoute('/work/$slug')({
  loader: async ({ params }) => {
    const study = await getCaseStudy(params.slug)
    if (!study) throw notFound()
    return study
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} | Ryan Haytree` },
          { name: 'description', content: loaderData.summary },
        ]
      : [],
  }),
  component: CaseStudyPage,
})

function CaseStudyPage() {
  const study = Route.useLoaderData()

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
