import { TextLink } from '../ui/text-link'
import { Page } from './page'

export function NotFoundPage() {
	return (
		<Page.Root>
			<Page.Header>
				<Page.Title>Page not found</Page.Title>
				<Page.Lead>
					There's nothing at this address. It may have moved, or the
					link may have a typo.
				</Page.Lead>
			</Page.Header>
			<p className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
				<TextLink to="/">Go to the homepage</TextLink>
				<TextLink to="/experience">See my experience</TextLink>
			</p>
		</Page.Root>
	)
}
