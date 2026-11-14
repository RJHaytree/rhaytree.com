import { createContext, use, useId } from 'react'

import { cn } from '../../lib/cn'

interface SectionContextValue {
	titleId: string
}

const SectionContext = createContext<SectionContextValue | null>(null)

function useSection() {
	const context = use(SectionContext)
	if (!context) {
		throw new Error('Section parts must be rendered inside <Section.Root>')
	}
	return context
}

/** A titled band on the sheet, opened by a hairline rule that draws in on scroll. */
function SectionRoot({
	id,
	className,
	children,
}: {
	id?: string
	className?: string
	children: React.ReactNode
}) {
	const titleId = useId()

	return (
		<SectionContext value={{ titleId }}>
			<section
				id={id}
				aria-labelledby={titleId}
				className={cn('rule-timeline relative pt-8', className)}
			>
				<span
					aria-hidden="true"
					className="draw-on-view absolute inset-x-0 top-0 h-px origin-left bg-rule"
				/>
				{children}
			</section>
		</SectionContext>
	)
}

function SectionTitle({ children }: { children: React.ReactNode }) {
	const { titleId } = useSection()

	return (
		<h2
			id={titleId}
			className="text-[1.75rem] leading-tight font-semibold tracking-[-0.02em] text-bright [font-stretch:112%] sm:text-[2rem]"
		>
			{children}
		</h2>
	)
}

function SectionBody({
	className,
	children,
}: {
	className?: string
	children: React.ReactNode
}) {
	return <div className={cn('mt-6', className)}>{children}</div>
}

/** A titled page section; the title labels the section for assistive tech. */
export const Section = {
	Root: SectionRoot,
	Title: SectionTitle,
	Body: SectionBody,
}
