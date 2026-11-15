import { CopyButton } from './copy-button'
import { Anchor } from './text-link'

/** The site's contact address. */
export const contactEmail = 'rjhaytree@gmail.com'

/**
 * The email address as a link, with a copy button beside it for visitors
 * whose mail client does not open from mailto links (most webmail users).
 */
export function EmailContact() {
	return (
		<span className="inline-flex flex-wrap items-center gap-x-3 gap-y-1">
			<Anchor href={`mailto:${contactEmail}`}>{contactEmail}</Anchor>
			<CopyButton value={contactEmail} label="email address" />
		</span>
	)
}
