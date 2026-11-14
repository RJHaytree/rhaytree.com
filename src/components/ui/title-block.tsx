import { cn } from '../../lib/cn'

/** A drawing title block: a bordered schedule of label and value rows. */
function TitleBlockRoot({
	className,
	children,
}: {
	className?: string
	children: React.ReactNode
}) {
	return (
		<dl
			className={cn(
				'm-0 border border-rule-strong bg-sheet text-[0.9375rem]',
				className,
			)}
		>
			{children}
		</dl>
	)
}

function TitleBlockRow({
	label,
	children,
}: {
	label: string
	children: React.ReactNode
}) {
	return (
		<div className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-x-4 border-b border-rule px-4 py-2.5 last:border-b-0 sm:grid-cols-[7.5rem_minmax(0,1fr)]">
			<dt className="font-mono text-sm leading-6 text-muted">{label}</dt>
			<dd className="m-0 min-w-0 break-words">{children}</dd>
		</div>
	)
}

export const TitleBlock = {
	Root: TitleBlockRoot,
	Row: TitleBlockRow,
}
