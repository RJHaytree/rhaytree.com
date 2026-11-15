import { createLink } from '@tanstack/react-router'

import { cn } from '../../lib/cn'

function NavRoot({
	label,
	children,
}: {
	label: string
	children: React.ReactNode
}) {
	return (
		<nav aria-label={label}>
			<ul className="m-0 flex list-none flex-wrap gap-x-5 gap-y-1 p-0 sm:gap-x-6">
				{children}
			</ul>
		</nav>
	)
}

function NavItem({ children }: { children: React.ReactNode }) {
	return <li>{children}</li>
}

/**
 * Nav anchor. Current state is carried by lightness and underline, never hue:
 * muted by default, white and underlined when current or hovered.
 */
function NavAnchor({
	className,
	ref,
	...props
}: React.ComponentPropsWithRef<'a'>) {
	return (
		<a
			ref={ref}
			className={cn(
				'text-muted no-underline decoration-2 underline-offset-[6px] transition-colors duration-150 hover:text-bright hover:underline hover:decoration-rule-strong data-[status=active]:text-bright data-[status=active]:underline data-[status=active]:decoration-signal',
				className,
			)}
			{...props}
		/>
	)
}

/** Router nav link; the active route gets data-status="active". */
const NavLink = createLink(NavAnchor)

/** The sheet number that prefixes a register entry. */
function NavNumber({ children }: { children: React.ReactNode }) {
	return (
		<span className="mr-1.5 font-mono text-sm tabular-nums">
			{children}
		</span>
	)
}

export const Nav = {
	Root: NavRoot,
	Item: NavItem,
	Link: NavLink,
	Anchor: NavAnchor,
	Number: NavNumber,
}
