import { TextLink } from '../ui/text-link'
import { Page } from './page'

export function NotFoundPage() {
	return (
		<Page.Root>
			<Page.Header>
				<Page.Title>Sheet not found</Page.Title>
				<Page.Lead>
					No drawing exists at this address. It may have moved, or the
					link may have a typo.
				</Page.Lead>
			</Page.Header>
			<p className="mt-8">
				<TextLink to="/">Go to the home sheet</TextLink>
			</p>
		</Page.Root>
	)
}
