import { createFileRoute } from '@tanstack/react-router'

import { listFeaturedCaseStudies } from '#/features/case-studies/api/case-studies'
import { getExperience } from '#/features/experience/api/experience'
import { HomePage } from '#/features/home/pages/home-page'

export const Route = createFileRoute('/')({
	staticData: {
		sheet: { number: 'RH-01', title: 'Home' },
		titleBlockInPage: true,
	},
	loader: async () => {
		const [featured, experience] = await Promise.all([
			listFeaturedCaseStudies(),
			getExperience(),
		])
		return { featured, experience }
	},
	component: function HomeRoute() {
		const { featured, experience } = Route.useLoaderData()
		return <HomePage featured={featured} experience={experience} />
	},
})
