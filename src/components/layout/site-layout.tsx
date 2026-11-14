import { SiteFooter } from './site-footer'
import { SiteHeader } from './site-header'

/** The drawing sheet: a bordered, gridded frame inset from the black ground. */
export function SiteLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen p-2 sm:p-4 lg:p-6">
			<div className="drafting-grid flex min-h-[calc(100vh-1rem)] flex-col border border-rule-strong sm:min-h-[calc(100vh-2rem)] lg:min-h-[calc(100vh-3rem)]">
				<SiteHeader />
				<main
					id="main"
					tabIndex={-1}
					className="flex-1 focus:outline-none"
				>
					{children}
				</main>
				<SiteFooter />
			</div>
		</div>
	)
}
