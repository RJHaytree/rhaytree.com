import { Link } from '@tanstack/react-router'

import { Nav } from '../ui/nav'

/** The sheet register: the site's navigation, numbered like a drawing set. */
export function SiteHeader() {
	return (
		<header className="border-b border-rule bg-sheet">
			<a
				href="#main"
				className="sr-only focus:not-sr-only focus:absolute focus:top-6 focus:left-6 focus:z-10 focus:bg-bright focus:px-3 focus:py-2 focus:text-ground"
			>
				Skip to content
			</a>
			<div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 px-5 py-4 sm:px-8 lg:px-10">
				<Link
					to="/"
					className="font-semibold text-bright no-underline [font-stretch:112%]"
				>
					Ryan Haytree
				</Link>
				<Nav.Root label="Sheets">
					<Nav.Item>
						<Nav.Link to="/" activeOptions={{ exact: true }}>
							<Nav.Number>01</Nav.Number>Home
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link to="/work">
							<Nav.Number>02</Nav.Number>Work
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link to="/experience">
							<Nav.Number>03</Nav.Number>Experience
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Anchor href="#contact">
							<Nav.Number>04</Nav.Number>Contact
						</Nav.Anchor>
					</Nav.Item>
				</Nav.Root>
			</div>
		</header>
	)
}
