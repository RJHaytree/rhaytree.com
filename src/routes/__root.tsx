import { TanStackDevtools } from '@tanstack/react-devtools'
import type { QueryClient } from '@tanstack/react-query'
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	ScriptOnce,
	Scripts,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { NotFoundPage } from '../components/layout/not-found-page'
import { SiteLayout } from '../components/layout/site-layout'
import { greyscaleBootScript } from '../components/ui/greyscale-toggle'
import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'
import appCss from '../styles.css?url'

interface MyRouterContext {
	queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{ charSet: 'utf-8' },
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{ title: 'Ryan Haytree' },
			{
				name: 'description',
				content:
					'Ryan Haytree, platform and systems engineer: cloud architecture, internal developer tooling and infrastructure.',
			},
		],
		links: [{ rel: 'stylesheet', href: appCss }],
	}),
	shellComponent: RootDocument,
	component: RootLayout,
	notFoundComponent: NotFoundPage,
})

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		// The greyscale boot script may add a class to <html> before hydration.
		<html lang="en-GB" suppressHydrationWarning>
			<head>
				<ScriptOnce>{greyscaleBootScript}</ScriptOnce>
				<HeadContent />
			</head>
			<body>
				{children}
				<TanStackDevtools
					config={{
						position: 'bottom-right',
					}}
					plugins={[
						{
							name: 'Tanstack Router',
							render: <TanStackRouterDevtoolsPanel />,
						},
						TanStackQueryDevtools,
					]}
				/>
				<Scripts />
			</body>
		</html>
	)
}

function RootLayout() {
	return (
		<SiteLayout>
			<Outlet />
		</SiteLayout>
	)
}
