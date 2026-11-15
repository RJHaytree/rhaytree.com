import { useEffect, useState } from 'react'
import { cn } from '../../lib/cn'

/**
 * A small text button that copies a value and confirms in words ("Copied"),
 * announced to screen readers. Hidden where the Clipboard API is missing.
 */
export function CopyButton({
	value,
	label,
	className,
}: {
	value: string
	/** What is being copied, for the accessible name, e.g. "email address". */
	label: string
	className?: string
}) {
	const [supported, setSupported] = useState(false)
	const [copied, setCopied] = useState(false)

	useEffect(() => {
		setSupported(Boolean(navigator.clipboard?.writeText))
	}, [])

	useEffect(() => {
		if (!copied) return
		const timer = window.setTimeout(() => setCopied(false), 2000)
		return () => window.clearTimeout(timer)
	}, [copied])

	if (!supported) return null

	async function copy() {
		try {
			await navigator.clipboard.writeText(value)
			setCopied(true)
		} catch {
			// Permission denied: the address is still on screen to copy by hand.
		}
	}

	return (
		<button
			type="button"
			onClick={copy}
			aria-label={copied ? `Copied ${label}` : `Copy ${label}`}
			className={cn(
				'cursor-pointer border border-rule px-1.5 font-mono text-xs leading-5 text-muted transition-colors duration-150 hover:border-rule-strong hover:text-bright',
				copied && 'border-rule-strong text-bright',
				className,
			)}
		>
			<span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
		</button>
	)
}
