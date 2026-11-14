import { Link } from '@tanstack/react-router'

import { Nav } from '../ui/nav'

export function SiteHeader() {
	return (
		<header className="border-b border-neutral-200">
			<a
				href="#main"
				className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-white focus:px-3 focus:py-2 focus:outline-2"
			>
				Skip to content
			</a>
			<div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-4">
				<Link to="/" className="font-semibold">
					Ryan Haytree
				</Link>
				<Nav.Root label="Primary">
					<Nav.Item>
						<Nav.Link to="/work">Work</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link to="/experience">Experience</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Anchor href="#contact">Contact</Nav.Anchor>
					</Nav.Item>
				</Nav.Root>
			</div>
		</header>
	)
}
