import { createFileRoute } from '@tanstack/react-router'

import { listFeaturedCaseStudies } from '#/features/case-studies/api/case-studies'
import { HomePage } from '#/features/home/pages/home-page'

export const Route = createFileRoute('/')({
  loader: () => listFeaturedCaseStudies(),
  component: function HomeRoute() {
    return <HomePage featured={Route.useLoaderData()} />
  },
})
