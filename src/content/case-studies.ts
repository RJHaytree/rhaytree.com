import { z } from 'zod'

export const caseStudySchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  summary: z.string().min(1),
  featured: z.boolean().default(false),
})

export type CaseStudy = z.infer<typeof caseStudySchema>

// Empty until case studies are written and cleared under NDA.
// Keep this module as the single source so it can move to D1 later.
const caseStudies: Array<CaseStudy> = z.array(caseStudySchema).parse([])

export async function listCaseStudies(): Promise<Array<CaseStudy>> {
  return caseStudies
}

export async function getCaseStudy(
  slug: string,
): Promise<CaseStudy | undefined> {
  return caseStudies.find((study) => study.slug === slug)
}
