import { z } from 'zod'

import { caseStudySchema } from '../types/case-study'
import type { CaseStudy } from '../types/case-study'

// Empty until case studies are written and cleared under NDA.
// This module is the single source, so it can move to D1 later without
// touching pages or routes.
const caseStudies: Array<CaseStudy> = z.array(caseStudySchema).parse([])

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
