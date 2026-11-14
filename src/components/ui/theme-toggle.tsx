import { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'

const storageKey = 'rh-theme'
const lightClass = 'light'

/**
 * Runs before first paint (via ScriptOnce in the document head) so the theme
 * applies without a flash. A saved choice wins; otherwise the system setting.
 * Dark is the default world.
 */
export const themeBootScript = `try{var t=localStorage.getItem('${storageKey}');if(t==='light'||(!t&&matchMedia('(prefers-color-scheme: light)').matches))document.documentElement.classList.add('${lightClass}')}catch(e){}`

function ThemeIcon({ light }: { light: boolean }) {
	// A drafting-style sun (light) or crescent (dark): outlined, 1.5px stroke.
	return (
		<svg
			viewBox="0 0 16 16"
			aria-hidden="true"
			className="size-4 shrink-0"
			fill="none"
			stroke="currentColor"
			strokeWidth={1.5}
			strokeLinecap="round"
		>
			{light ? (
				<>
					<circle cx={8} cy={8} r={3} />
					<path d="M8 1.5v1.5M8 13v1.5M1.5 8H3M13 8h1.5M3.4 3.4l1.06 1.06M11.54 11.54l1.06 1.06M3.4 12.6l1.06-1.06M11.54 4.46l1.06-1.06" />
				</>
			) : (
				<path d="M13.5 9.6A5.75 5.75 0 1 1 6.4 2.5a4.5 4.5 0 0 0 7.1 7.1Z" />
			)}
		</svg>
	)
}

/**
 * Switches between the dark (default) and light themes and remembers the
 * choice. Where supported, the new theme is revealed as a circle spreading
 * from the button; under reduced motion it swaps instantly.
 */
export function ThemeToggle() {
	const [light, setLight] = useState(false)

	// The boot script may already have applied the class before hydration.
	useEffect(() => {
		setLight(document.documentElement.classList.contains(lightClass))
	}, [])

	function apply(next: boolean) {
		setLight(next)
		document.documentElement.classList.toggle(lightClass, next)
		try {
			localStorage.setItem(storageKey, next ? 'light' : 'dark')
		} catch {
			// Storage can be unavailable (private mode); the switch still works.
		}
	}

	function toggle(event: React.MouseEvent<HTMLButtonElement>) {
		const next = !light
		const root = document.documentElement
		const reduceMotion = window.matchMedia(
			'(prefers-reduced-motion: reduce)',
		).matches

		if (!document.startViewTransition || reduceMotion) {
			apply(next)
			return
		}

		// Grow the reveal from the button to the farthest corner.
		const rect = event.currentTarget.getBoundingClientRect()
		const x = rect.left + rect.width / 2
		const y = rect.top + rect.height / 2
		const radius = Math.hypot(
			Math.max(x, window.innerWidth - x),
			Math.max(y, window.innerHeight - y),
		)

		root.classList.add('theme-switching')
		const transition = document.startViewTransition(() => {
			flushSync(() => apply(next))
		})

		transition.ready
			.then(() => {
				root.animate(
					{
						clipPath: [
							`circle(0px at ${x}px ${y}px)`,
							`circle(${radius}px at ${x}px ${y}px)`,
						],
					},
					{
						duration: 650,
						easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
						pseudoElement: '::view-transition-new(root)',
					},
				)
			})
			.catch(() => {})
		transition.finished.finally(() => {
			root.classList.remove('theme-switching')
		})
	}

	return (
		<button
			type="button"
			onClick={toggle}
			aria-label={
				light ? 'Switch to dark theme' : 'Switch to light theme'
			}
			className="flex cursor-pointer items-center gap-2 text-muted transition-colors duration-150 hover:text-bright"
		>
			<ThemeIcon light={light} />
			<span aria-hidden="true">{light ? 'Light' : 'Dark'}</span>
		</button>
	)
}
