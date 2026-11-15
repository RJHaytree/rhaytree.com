import { Page } from '#/components/layout/page'
import { TextLink } from '#/components/ui/text-link'

/**
 * Work, for now: a holding sheet, reachable by link but not from the
 * register. Case studies are written up and cleared for publication before
 * they appear (see the case-studies api).
 */
export function WorkPage() {
	return (
		<Page.Root>
			<Page.Header>
				<Page.Title>Work</Page.Title>
				<Page.Lead>Case studies are being written up.</Page.Lead>
			</Page.Header>

			<div className="mt-14 max-w-[60ch] space-y-4 text-lg text-muted">
				<p>
					Project work is confidential, so each case study is cleared
					with the project's owner before it is published.
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
