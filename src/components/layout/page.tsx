import { cn } from '../../lib/cn'
import { DimensionLine } from '../ui/dimension-line'

function PageRoot({
	className,
	children,
}: {
	className?: string
	children: React.ReactNode
}) {
	return (
		<div className={cn('px-5 pt-12 sm:px-8 sm:pt-16 lg:px-10', className)}>
			{children}
		</div>
	)
}

/**
 * The sheet's heading block. A dimension line measures its width, and the
 * title and lead share that measure.
 */
function PageHeader({ children }: { children: React.ReactNode }) {
	return (
		<div className="max-w-[44rem]">
			<DimensionLine className="mb-7" />
			{children}
		</div>
	)
}

/** The sheet's single h1, set wide. */
function PageTitle({ children }: { children: React.ReactNode }) {
	return (
		<h1 className="text-4xl leading-[1.05] font-semibold tracking-[-0.02em] text-bright [font-stretch:112%] sm:text-5xl">
			{children}
		</h1>
	)
}

function PageLead({ children }: { children: React.ReactNode }) {
	return (
		<p className="mt-5 text-lg leading-relaxed text-muted sm:text-xl">
			{children}
		</p>
	)
}

/** Page frame: gutters inside the sheet and the page's single h1. */
export const Page = {
	Root: PageRoot,
	Header: PageHeader,
	Title: PageTitle,
	Lead: PageLead,
}
