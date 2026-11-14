import { cn } from '../../lib/cn'

function PageRoot({
	className,
	children,
}: {
	className?: string
	children: React.ReactNode
}) {
	return (
		<div className={cn('mx-auto max-w-5xl px-4 py-16', className)}>
			{children}
		</div>
	)
}

function PageTitle({ children }: { children: React.ReactNode }) {
	return <h1 className="text-3xl font-semibold">{children}</h1>
}

function PageLead({ children }: { children: React.ReactNode }) {
	return <p className="mt-4 max-w-prose text-lg">{children}</p>
}

/** Page frame: width, gutters and the page's single h1. */
export const Page = {
	Root: PageRoot,
	Title: PageTitle,
	Lead: PageLead,
}
