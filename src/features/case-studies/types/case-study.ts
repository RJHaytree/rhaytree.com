import { z } from 'zod'

export const caseStudySchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  summary: z.string().min(1),
  featured: z.boolean().default(false),
})

export type CaseStudy = z.infer<typeof caseStudySchema>

export type CaseStudySummary = Pick<CaseStudy, 'slug' | 'title' | 'summary'>
