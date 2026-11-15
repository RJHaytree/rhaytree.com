import { Page } from '#/components/layout/page'
import { TextLink } from '#/components/ui/text-link'

/**
 * Work, for now: a holding sheet. Case studies are written up and cleared
 * for publication before they appear (see the case-studies api).
 */
export function WorkPage() {
	return (
		<Page.Root>
			<Page.Header>
				<Page.Title>Work</Page.Title>
				<Page.Lead>Coming soon.</Page.Lead>
			</Page.Header>

			<div className="mt-14 max-w-[60ch] space-y-4 text-lg text-muted">
				<p>
					Case studies are being written up. Project work is
					confidential, so each one is cleared before it is published.
				</p>
				<p>
					In the meantime,{' '}
					<TextLink to="/experience">see my experience</TextLink> for
					the roles and skills so far.
				</p>
			</div>
		</Page.Root>
	)
}
