import { createFileRoute, notFound } from '@tanstack/react-router'

import { DesignSystemPage } from '#/features/design-system/pages/design-system-page'

/** Dev-only preview of the proposed design system; a 404 in production. */
export const Route = createFileRoute('/design-system')({
	staticData: { sheet: { number: 'RH-00', title: 'Design system (draft)' } },
	beforeLoad: () => {
		if (!import.meta.env.DEV) throw notFound()
	},
	head: () => ({
		meta: [
			{ title: 'Design system | Ryan Haytree' },
			{ name: 'robots', content: 'noindex' },
		],
	}),
	component: DesignSystemPage,
})
