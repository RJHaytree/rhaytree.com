import type { z } from 'zod'
import type { Experience } from '../types/experience'
import { experienceSchema } from '../types/experience'
import { experienceFixture } from './experience.fixtures'

/** Real roles, most recent first (from LinkedIn). */
const published: z.input<typeof experienceSchema> = {
	roles: [
		{
			title: 'Senior Lead Engineer',
			organisation: 'Scorchsoft Ltd',
			location: 'Birmingham, UK',
			arrangement: 'Remote',
			start: '2026-09',
			summary:
				'An evolution of the lead role: helping drive technical decision-making across the organisation, and identifying greater opportunities for coordination and technical excellence.',
		},
		{
			title: 'Lead Developer',
			organisation: 'Scorchsoft Ltd',
			location: 'Birmingham, UK',
			arrangement: 'Remote',
			start: '2025-03',
			end: '2026-09',
			summary:
				'Making use of Laravel, Filament, React, React Native, TypeScript and a plethora of other technologies to develop and maintain high-quality applications.',
		},
		{
			title: 'Mid-Level Software Developer',
			organisation: 'Scorchsoft Ltd',
			location: 'Birmingham, UK',
			arrangement: 'Remote',
			start: '2024-03',
			end: '2025-03',
			summary:
				'Making use of Laravel, Filament, React, React Native, TypeScript and a plethora of other technologies to develop and maintain high-quality applications.',
		},
		{
			title: 'Junior Software Developer',
			organisation: 'Scorchsoft Ltd',
			location: 'Birmingham, UK',
			arrangement: 'Hybrid',
			start: '2023-03',
			end: '2024-03',
			summary:
				'Making use of Laravel, React and React Native to build and support a plethora of development projects.',
		},
		{
			title: 'Lecturer in Computing',
			organisation: 'Walsall College',
			location: 'Walsall, UK',
			arrangement: 'Part-time',
			start: '2021-11',
			end: '2023-03',
			summary:
				'Planned and delivered lecturing sessions for Level 2, 3 and 4 students, with a primary focus on Level 3 Cyber Security (equivalent to three A levels), covering cyber security, enterprise computing and big data analytics.',
			highlights: [
				'Produced teaching materials for Level 3 and Level 6 subjects, including ReactJS development, Node.js development and Azure deployment.',
				'Ensured assignments were completed and assessed within set time frames.',
				'Supported students where needed and tailored lessons to their needs.',
				'Worked with colleagues and management to keep lessons and assignments to a high standard.',
			],
		},
	],
	skillGroups: [
		{
			area: 'Languages and frameworks',
			skills: [
				'TypeScript',
				'React',
				'React Native',
				'Laravel',
				'Filament',
			],
		},
		{
			area: 'Leadership',
			skills: [
				'Technology leadership',
				'Time management',
				'Lesson planning',
			],
		},
		{ area: 'Security', skills: ['Cyber security'] },
	],
}

// Sample roles only fill in while no real ones exist, on the dev server and
// in review builds (`--mode review`). Both values are constants at build
// time, so a normal production build tree-shakes the fixtures away.
const includeFixtures = import.meta.env.DEV || import.meta.env.MODE === 'review'

const experience: Experience = experienceSchema.parse(
	includeFixtures && published.roles.length === 0
		? experienceFixture
		: published,
)

export async function getExperience(): Promise<Experience> {
	return experience
}
