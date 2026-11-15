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
import { reactQueryDevtools } from '#/lib/react-query'
import { NotFoundPage } from '../components/layout/not-found-page'
import { SiteLayout } from '../components/layout/site-layout'
import { themeBootScript } from '../components/ui/theme-toggle'
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
			// Link previews (LinkedIn, Slack, iMessage and others).
			{ property: 'og:type', content: 'website' },
			{ property: 'og:site_name', content: 'Ryan Haytree' },
			{ property: 'og:title', content: 'Ryan Haytree' },
			{
				property: 'og:description',
				content:
					'Platform and systems engineer: data integration, cloud architecture and platform tooling.',
			},
			{ property: 'og:image', content: 'https://rhaytree.com/og.png' },
			{ property: 'og:image:width', content: '1200' },
			{ property: 'og:image:height', content: '630' },
			{
				property: 'og:image:alt',
				content:
					'Ryan Haytree, platform and systems engineer, set as an engineering drawing sheet.',
			},
			{ name: 'twitter:card', content: 'summary_large_image' },
			// Browser chrome follows the default (dark) sheet.
			{ name: 'theme-color', content: '#0c0f14' },
			// Review builds carry sample content: keep them out of search.
			...(import.meta.env.MODE === 'review'
				? [{ name: 'robots', content: 'noindex, nofollow' }]
				: []),
		],
		links: [
			{ rel: 'stylesheet', href: appCss },
			{ rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
			{ rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
		],
	}),
	shellComponent: RootDocument,
	component: RootLayout,
	notFoundComponent: NotFoundPage,
})

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		// The theme boot script may add a class to <html> before hydration.
		<html lang="en-GB" suppressHydrationWarning>
			<head>
				<ScriptOnce>{themeBootScript}</ScriptOnce>
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
						reactQueryDevtools,
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
