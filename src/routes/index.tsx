import { createFileRoute } from '@tanstack/react-router'

import { getExperience } from '#/features/experience/api/experience'
import { HomePage } from '#/features/home/pages/home-page'

export const Route = createFileRoute('/')({
	staticData: {
		sheet: { number: 'RH-01', title: 'Home' },
		titleBlockInPage: true,
	},
	loader: () => getExperience(),
	component: function HomeRoute() {
		return <HomePage experience={Route.useLoaderData()} />
	},
})
