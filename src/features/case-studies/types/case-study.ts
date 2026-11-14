import { z } from 'zod'

export const caseStudySchema = z.object({
	slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
	title: z.string().min(1),
	summary: z.string().min(1),
	featured: z.boolean().default(false),
	/** Anonymised client context: sector and rough size, never a name. */
	context: z.string().min(1),
	problem: z.string().min(1),
	role: z.string().min(1),
	approach: z.array(z.string().min(1)).min(1),
	outcome: z.string().min(1),
	stack: z.array(z.string().min(1)).min(1),
})

export type CaseStudy = z.infer<typeof caseStudySchema> & {
	/** Drawing reference, e.g. "RH-02.1"; assigned by list position. */
	reference: string
}

export type CaseStudySummary = Pick<
	CaseStudy,
	'slug' | 'title' | 'summary' | 'reference'
>
