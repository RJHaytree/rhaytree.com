import { cn } from '../../lib/cn'

/**
 * A drawing dimension line with end ticks, measuring the width of its
 * container. Decorative, so hidden from assistive tech. It heads the page,
 * so it draws once on load unless reduced motion is preferred.
 */
export function DimensionLine({ className }: { className?: string }) {
	return (
		<div
			aria-hidden="true"
			className={cn(
				'relative h-4 origin-left motion-safe:animate-[draw-dimension_900ms_var(--ease-draft)_both]',
				className,
			)}
		>
			<span className="absolute inset-x-0 top-1/2 border-t border-rule-strong" />
			<span className="absolute top-0 left-0 h-full border-l border-rule-strong" />
			<span className="absolute top-0 right-0 h-full border-l border-rule-strong" />
		</div>
	)
}
