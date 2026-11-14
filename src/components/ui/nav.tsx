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
      <ul className="flex flex-wrap gap-x-5 gap-y-1">{children}</ul>
    </nav>
  )
}

function NavItem({ children }: { children: React.ReactNode }) {
  return <li>{children}</li>
}

/** Plain nav anchor, for #hash targets that stay on the current page. */
function NavAnchor({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<'a'>) {
  return (
    <a
      ref={ref}
      className={cn(
        'hover:underline data-[status=active]:underline',
        className,
      )}
      {...props}
    />
  )
}

/** Router nav link; the active route gets data-status="active". */
const NavLink = createLink(NavAnchor)

export const Nav = {
  Root: NavRoot,
  Item: NavItem,
  Link: NavLink,
  Anchor: NavAnchor,
}
