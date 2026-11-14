import { z } from 'zod'

import { caseStudySchema } from '../types/case-study'
import { caseStudyFixtures } from './case-studies.fixtures'
import type { CaseStudy } from '../types/case-study'

// Real case studies go here once written and cleared under NDA.
const published: Array<z.input<typeof caseStudySchema>> = []

// The dev server uses fixtures; production builds only ever see `published`
// (import.meta.env.DEV is false at build time, so fixtures are tree-shaken).
const caseStudies: Array<CaseStudy> = z
  .array(caseStudySchema)
  .parse(import.meta.env.DEV ? caseStudyFixtures : published)

export async function listCaseStudies(): Promise<Array<CaseStudy>> {
  return caseStudies
}

export async function listFeaturedCaseStudies(): Promise<Array<CaseStudy>> {
  return caseStudies.filter((study) => study.featured)
}

export async function getCaseStudy(
  slug: string,
): Promise<CaseStudy | undefined> {
  return caseStudies.find((study) => study.slug === slug)
}
