import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import { getContext } from './integrations/tanstack-query/root-provider'
import { routeTree } from './routeTree.gen'

export function getRouter() {
	const context = getContext()

	const router = createTanStackRouter({
		routeTree,
		context,
		scrollRestoration: true,
		defaultPreload: 'intent',
		defaultPreloadStaleTime: 0,
		defaultViewTransition: true,
	})

	setupRouterSsrQueryIntegration({ router, queryClient: context.queryClient })

	return router
}

declare module '@tanstack/react-router' {
	interface Register {
		router: ReturnType<typeof getRouter>
	}

	interface StaticDataRouteOption {
		/** Drawing identity shown in the sheet's title block. */
		sheet?: { number: string; title: string }
		/** The page shows its own title block on lg, so the footer hides there. */
		titleBlockInPage?: boolean
	}
}
