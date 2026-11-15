import { useMatches } from '@tanstack/react-router'

export interface Sheet {
	number: string
	title: string
}

const notFoundSheet: Sheet = { number: 'RH-00', title: 'Page not found' }

function isSheet(value: unknown): value is Sheet {
	return (
		typeof value === 'object' &&
		value !== null &&
		typeof (value as Sheet).number === 'string' &&
		typeof (value as Sheet).title === 'string'
	)
}

/** A loader may return `{ sheet }` to give a dynamic route its own drawing number. */
function sheetFromLoaderData(loaderData: unknown): Sheet | undefined {
	if (typeof loaderData !== 'object' || loaderData === null) return undefined
	const { sheet } = loaderData as { sheet?: unknown }
	return isSheet(sheet) ? sheet : undefined
}

/**
 * The deepest matched route's sheet identity, for the title block: a sheet
 * returned by its loader first, then its static `sheet`.
 */
export function useCurrentSheet(): Sheet {
	const matches = useMatches()

	if (matches.some((match) => match.status === 'notFound')) {
		return notFoundSheet
	}

	for (let i = matches.length - 1; i >= 0; i--) {
		const match = matches[i]
		const sheet =
			sheetFromLoaderData(match?.loaderData) ?? match?.staticData.sheet
		if (sheet) return sheet
	}

	return notFoundSheet
}

/** Whether the current page renders its own title block (so the footer stands down). */
export function useTitleBlockInPage(): boolean {
	const matches = useMatches()
	return matches.some((match) => match.staticData.titleBlockInPage === true)
}
