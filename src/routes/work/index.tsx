import { createFileRoute } from '@tanstack/react-router'

import { WorkPage } from '#/features/case-studies/pages/work-page'

export const Route = createFileRoute('/work/')({
	staticData: { sheet: { number: 'RH-02', title: 'Work register' } },
	head: () => ({ meta: [{ title: 'Work | Ryan Haytree' }] }),
	component: WorkPage,
})
