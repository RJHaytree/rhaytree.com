import { useId } from 'react'

/**
 * Drawing notes: a schedule of titled notes, title in the margin column and
 * body beside it. Each note is a labelled section.
 */
function NotesRoot({ children }: { children: React.ReactNode }) {
	return <div className="border-t border-rule">{children}</div>
}

function NotesItem({
	title,
	children,
}: {
	title: string
	children: React.ReactNode
}) {
	const titleId = useId()

	return (
		<section
			aria-labelledby={titleId}
			className="grid gap-x-10 gap-y-2 border-b border-rule py-7 md:grid-cols-[12rem_minmax(0,1fr)]"
		>
			<h2
				id={titleId}
				className="font-mono text-sm leading-7 font-medium text-bright"
			>
				{title}
			</h2>
			<div className="max-w-[65ch] space-y-4">{children}</div>
		</section>
	)
}

export const Notes = {
	Root: NotesRoot,
	Item: NotesItem,
}
