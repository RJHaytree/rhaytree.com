import { z } from 'zod'
import type { CaseStudy } from '../types/case-study'
import { caseStudySchema } from '../types/case-study'
import { caseStudyFixtures } from './case-studies.fixtures'

// Real case studies go here once written and cleared under NDA.
const published: Array<z.input<typeof caseStudySchema>> = []

// Fixtures show on the dev server and in review builds (`--mode review`).
// Both values are constants at build time, so a normal production build
// only ever sees `published` and tree-shakes the fixtures away.
const includeFixtures = import.meta.env.DEV || import.meta.env.MODE === 'review'

const caseStudies: Array<CaseStudy> = z
	.array(caseStudySchema)
	.parse(includeFixtures ? caseStudyFixtures : published)
	.map((study, index) => ({ ...study, reference: `RH-02.${index + 1}` }))

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
