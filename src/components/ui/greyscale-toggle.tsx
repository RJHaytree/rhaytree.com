import { useEffect, useState } from 'react'

const storageKey = 'rh-greyscale'
const className = 'greyscale'

/**
 * Runs before first paint (via ScriptOnce in the document head) so a saved
 * greyscale preference applies without a flash of colour.
 */
export const greyscaleBootScript = `try{if(localStorage.getItem('${storageKey}')==='1')document.documentElement.classList.add('${className}')}catch(e){}`

function GreyscaleIcon() {
	return (
		<svg
			viewBox="0 0 16 16"
			aria-hidden="true"
			className="size-4 shrink-0"
			fill="none"
			stroke="currentColor"
			strokeWidth={1.5}
		>
			<circle cx={8} cy={8} r={6.25} />
			<path d="M8 1.75 A6.25 6.25 0 0 1 8 14.25 Z" fill="currentColor" />
		</svg>
	)
}

/**
 * Switches the whole site to greyscale and remembers the choice. Meaning on
 * this site never relies on colour alone; this lets any visitor check that.
 */
export function GreyscaleToggle() {
	const [enabled, setEnabled] = useState(false)

	// The boot script may already have applied the class before hydration.
	useEffect(() => {
		setEnabled(document.documentElement.classList.contains(className))
	}, [])

	function toggle() {
		const next = !enabled
		setEnabled(next)
		document.documentElement.classList.toggle(className, next)
		try {
			localStorage.setItem(storageKey, next ? '1' : '0')
		} catch {
			// Storage can be unavailable (private mode); the toggle still works.
		}
	}

	return (
		<button
			type="button"
			aria-pressed={enabled}
			onClick={toggle}
			className="flex cursor-pointer items-center gap-2 text-muted transition-colors duration-150 hover:text-bright aria-pressed:text-bright"
		>
			<GreyscaleIcon />
			<span>Greyscale</span>
		</button>
	)
}
