import { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'
import { createElement } from 'react'

/** A fresh query client per router (and so per SSR request). */
export function createQueryClient() {
	return new QueryClient()
}

/** The TanStack Query panel for the TanStack devtools shell (dev only). */
export const reactQueryDevtools = {
	name: 'TanStack Query',
	render: createElement(ReactQueryDevtoolsPanel),
}
