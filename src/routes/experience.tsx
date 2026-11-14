import { createFileRoute } from '@tanstack/react-router'

import { getExperience } from '#/features/experience/api/experience'
import { ExperiencePage } from '#/features/experience/pages/experience-page'

export const Route = createFileRoute('/experience')({
	head: () => ({ meta: [{ title: 'Experience | Ryan Haytree' }] }),
	loader: () => getExperience(),
	component: function ExperienceRoute() {
		return <ExperiencePage experience={Route.useLoaderData()} />
	},
})
