import handler, { createServerEntry } from '@tanstack/react-start/server-entry'

const canonicalHost = 'rhaytree.com'

/**
 * The Worker entry: TanStack Start's handler, with www sent permanently to
 * the bare domain (path and query kept) so there is one canonical address.
 */
export default createServerEntry({
	fetch(request, opts) {
		const url = new URL(request.url)
		if (url.hostname === `www.${canonicalHost}`) {
			url.hostname = canonicalHost
			return Response.redirect(url.toString(), 301)
		}
		return handler.fetch(request, opts)
	},
})
