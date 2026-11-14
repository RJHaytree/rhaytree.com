import { createLink } from '@tanstack/react-router'

import { cn } from '../../lib/cn'

/** Inline text link for external URLs, mailto: and #hash targets. */
export function Anchor({
	className,
	ref,
	...props
}: React.ComponentPropsWithRef<'a'>) {
	return (
		<a
			ref={ref}
			className={cn(
				'text-bright underline decoration-rule-strong transition-colors duration-150 hover:decoration-bright',
				className,
			)}
			{...props}
		/>
	)
}

/** Type-safe router link with the same styling as Anchor. */
export const TextLink = createLink(Anchor)
