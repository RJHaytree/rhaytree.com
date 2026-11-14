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
			skills: [
				'Technology leadership',
				'Systems design',
				'TypeScript',
				'React Native',
				'Laravel',
				'PHP',
				'Terraform',
				'Microsoft Azure',
				'AWS',
				'Cyber security',
			],
		},
		{
			title: 'Lead Developer',
			organisation: 'Scorchsoft Ltd',
			location: 'Birmingham, UK',
			arrangement: 'Remote',
			start: '2025-03',
			end: '2026-09',
			summary:
				'Oversaw the successful completion and maintenance of projects for both clients and internal use cases. Provided guidance for developers, and delivered high-quality, high-availability, cloud-based solutions.',
			skills: [
				'Project management',
				'Time management',
				'Quality assurance',
				'Software development',
				'Laravel',
				'Filament',
				'PHP',
				'MySQL',
				'TypeScript',
				'JavaScript',
				'React',
				'React Native',
				'Swift',
				'Cyber security',
			],
		},
		{
			title: 'Mid-Level Software Developer',
			organisation: 'Scorchsoft Ltd',
			location: 'Birmingham, UK',
			arrangement: 'Remote',
			start: '2024-03',
			end: '2025-03',
			summary:
				'Developed and maintained high-quality web and mobile applications, from Laravel and Filament back ends to React and React Native front ends, taking on a growing share of each project.',
			skills: [
				'TypeScript',
				'React',
				'React Native',
				'Laravel',
				'Filament',
				'MySQL',
				'Swift',
			],
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
			skills: [
				'Software development',
				'PHP',
				'Laravel',
				'MySQL',
				'JavaScript',
				'React',
				'React Native',
			],
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
			skills: [
				'Lesson planning',
				'Time management',
				'Quality assurance',
				'Software development',
				'Cyber security',
			],
		},
	],
	skillGroups: [],
}

// Sample roles only fill in while no real ones exist, on the dev server and
// in review builds (`--mode review`). Both values are constants at build
// time, so a normal production build tree-shakes the fixtures away.
const includeFixtures = import.meta.env.DEV || import.meta.env.MODE === 'review'

/**
 * Where each skill sits in the Skills summary, in display order. The summary
 * is built from the skills tagged on roles, so only skills actually used
 * appear; anything not listed here falls into "Other".
 */
const skillAreas: Array<{ area: string; skills: Array<string> }> = [
	{
		area: 'Leadership and practice',
		skills: [
			'Technology leadership',
			'Systems design',
			'Project management',
			'Time management',
			'Quality assurance',
			'Software development',
			'Lesson planning',
		],
	},
	{
		area: 'Languages and frameworks',
		skills: [
			'TypeScript',
			'JavaScript',
			'PHP',
			'Swift',
			'React',
			'React Native',
			'Laravel',
			'Filament',
		],
	},
	{
		area: 'Cloud and data',
		skills: ['AWS', 'Microsoft Azure', 'Terraform', 'MySQL'],
	},
	{ area: 'Security', skills: ['Cyber security'] },
]

function summariseSkills(
	roles: Experience['roles'],
): Experience['skillGroups'] {
	const used = new Set(roles.flatMap((role) => role.skills))
	const placed = new Set(skillAreas.flatMap((group) => group.skills))
	const groups = skillAreas.map((group) => ({
		area: group.area,
		skills: group.skills.filter((skill) => used.has(skill)),
	}))
	const other = [...used].filter((skill) => !placed.has(skill))
	if (other.length > 0) groups.push({ area: 'Other', skills: other })
	return groups.filter((group) => group.skills.length > 0)
}

const parsed: Experience = experienceSchema.parse(
	includeFixtures && published.roles.length === 0
		? experienceFixture
		: published,
)

const experience: Experience =
	parsed.skillGroups.length > 0
		? parsed
		: { ...parsed, skillGroups: summariseSkills(parsed.roles) }

export async function getExperience(): Promise<Experience> {
	return experience
}
