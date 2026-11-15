import { Link } from '@tanstack/react-router'
import { Nav } from '../ui/nav'
import { ThemeToggle } from '../ui/theme-toggle'

/**
 * "Contact" goes to the title block. When it is already fully on screen (the
 * home sheet's sticky column), skip the scroll, which would only shift the
 * content beside it, and replay the arrival outline instead.
 */
function showContact(event: React.MouseEvent<HTMLAnchorElement>) {
	const block = document.getElementById('contact')
	if (!block) return
	const rect = block.getBoundingClientRect()
	if (rect.top < 0 || rect.bottom > window.innerHeight) return

	event.preventDefault()
	block.classList.remove('is-arriving')
	// Force a reflow so the outline animation restarts on repeat clicks.
	void block.offsetWidth
	block.classList.add('is-arriving')
	block.querySelector('a')?.focus({ preventScroll: true })
	// The outline has faded by now; under reduced motion this clears it.
	window.setTimeout(() => block.classList.remove('is-arriving'), 2000)
}

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
					className="order-1 font-display font-semibold text-bright no-underline [font-stretch:112%]"
				>
					Ryan Haytree
				</Link>
				{/* Phones: name and theme toggle share the first row, the register
				    takes the second. From sm the register sits between them. */}
				<div className="order-3 w-full sm:order-2 sm:w-auto">
					<Nav.Root label="Sheets">
						<Nav.Item>
							<Nav.Link to="/" activeOptions={{ exact: true }}>
								<Nav.Number>01</Nav.Number>Home
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link to="/experience">
								<Nav.Number>02</Nav.Number>Experience
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Anchor href="#contact" onClick={showContact}>
								<Nav.Number>03</Nav.Number>Contact
							</Nav.Anchor>
						</Nav.Item>
					</Nav.Root>
				</div>
				<div className="order-2 sm:order-3">
					<ThemeToggle />
				</div>
			</div>
		</header>
	)
}
