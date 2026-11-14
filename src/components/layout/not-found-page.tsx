import { TextLink } from '../ui/text-link'
import { Page } from './page'

export function NotFoundPage() {
	return (
		<Page.Root>
			<Page.Title>Page not found</Page.Title>
			<p className="mt-4 max-w-prose">
				That address doesn't match a page on this site. It may have
				moved, or the link may have a typo.
			</p>
			<p className="mt-4">
				<TextLink to="/">Go to the home page</TextLink>
			</p>
		</Page.Root>
	)
}
