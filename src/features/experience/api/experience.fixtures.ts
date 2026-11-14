import type { z } from 'zod'

import type { experienceSchema } from '../types/experience'

/**
 * Dev-only fixture data. Fictional roles for local development and design
 * work; never shipped to production (see experience.ts).
 */
export const experienceFixture: z.input<typeof experienceSchema> = {
	roles: [
		{
			title: 'Software Developer (Platform & Systems)',
			organisation: '[Fixture] Example Software Ltd',
			start: '2022-03',
			summary:
				'Leads architecture and platform work: system design, cloud planning, shared tooling and infrastructure security.',
			highlights: [
				'Defines architecture for projects spanning several integrated systems.',
				'Builds shared tooling that other teams use to ship and run services.',
				'Writes infrastructure as code and audits it for vulnerabilities.',
				'Reviews code across the team.',
			],
		},
		{
			title: 'Software Developer',
			organisation: '[Fixture] Previous Company Ltd',
			start: '2019-07',
			end: '2022-02',
			summary:
				'Full-stack development on client web applications, moving into deployment and infrastructure work.',
			highlights: [
				'Built and maintained client web applications.',
				'Introduced automated deployments for the team.',
			],
		},
	],
	skillGroups: [
		{
			area: 'Cloud',
			skills: ['AWS', 'Cloudflare Workers'],
		},
		{ area: 'Infrastructure', skills: ['Terraform', 'Docker', 'CI/CD'] },
		{ area: 'Languages', skills: ['TypeScript', 'JavaScript', 'SQL'] },
		{
			area: 'Practice',
			skills: ['System design', 'Security auditing', 'Code review'],
		},
	],
}
