import { EmailContact } from '../ui/email-contact'
import { Anchor } from '../ui/text-link'
import { TitleBlock } from '../ui/title-block'
import { useCurrentSheet, useTitleBlockInPage } from './use-current-sheet'

/**
 * The title block at the foot of every sheet: which drawing this is, and how
 * to reach its author. It doubles as the site's contact section. Pages that
 * place their own title block (the home sheet) render none here.
 */
export function SiteFooter() {
	const sheet = useCurrentSheet()
	const inPage = useTitleBlockInPage()

	if (inPage) return null

	return (
		<footer id="contact" className="mt-24 flex justify-end">
			<h2 className="sr-only">Title block and contact</h2>
			<TitleBlock.Root className="w-full border-r-0 border-b-0 sm:max-w-[34rem]">
				<TitleBlock.Row label="Drawing">
					<span className="tabular-nums">{sheet.number}</span>{' '}
					<span className="text-muted">{sheet.title}</span>
				</TitleBlock.Row>
				<TitleBlock.Row label="Email">
					<EmailContact />
				</TitleBlock.Row>
				<TitleBlock.Row label="GitHub">
					<Anchor href="https://github.com/RJHaytree">
						github.com/RJHaytree
					</Anchor>
				</TitleBlock.Row>
				<TitleBlock.Row label="LinkedIn">
					<Anchor href="https://www.linkedin.com/in/ryan-haytree-59a645168/">
						linkedin.com/in/ryan-haytree
					</Anchor>
				</TitleBlock.Row>
				<TitleBlock.Row label="Edition">
					<span className="tabular-nums">2026</span>
				</TitleBlock.Row>
			</TitleBlock.Root>
		</footer>
	)
}
