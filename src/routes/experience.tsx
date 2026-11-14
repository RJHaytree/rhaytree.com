import { createFileRoute } from '@tanstack/react-router'

import { ExperiencePage } from '#/features/experience/pages/experience-page'

export const Route = createFileRoute('/experience')({
  head: () => ({ meta: [{ title: 'Experience | Ryan Haytree' }] }),
  component: ExperiencePage,
})
