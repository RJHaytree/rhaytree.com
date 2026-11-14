import { createFileRoute, notFound } from '@tanstack/react-router'

import { getCaseStudy } from '#/features/case-studies/api/case-studies'
import { CaseStudyPage } from '#/features/case-studies/pages/case-study-page'

export const Route = createFileRoute('/work/$slug')({
	loader: async ({ params }) => {
		const study = await getCaseStudy(params.slug)
		if (!study) throw notFound()
		return { study, sheet: { number: study.reference, title: study.title } }
	},
	head: ({ loaderData }) => ({
		meta: loaderData
			? [
					{ title: `${loaderData.study.title} | Ryan Haytree` },
					{ name: 'description', content: loaderData.study.summary },
				]
			: [],
	}),
	component: function CaseStudyRoute() {
		return <CaseStudyPage study={Route.useLoaderData().study} />
	},
})
