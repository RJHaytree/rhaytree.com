import { createFileRoute } from '@tanstack/react-router'

import { getExperience } from '#/features/experience/api/experience'
import { ExperiencePage } from '#/features/experience/pages/experience-page'

export const Route = createFileRoute('/experience')({
	staticData: { sheet: { number: 'RH-03', title: 'Experience' } },
	head: () => ({ meta: [{ title: 'Experience | Ryan Haytree' }] }),
	loader: () => getExperience(),
	component: function ExperienceRoute() {
		return <ExperiencePage experience={Route.useLoaderData()} />
	},
})
