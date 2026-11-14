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
				'Leads architecture and platform work across client projects: internal provisioning tooling, multi-system cloud planning and infrastructure security.',
			highlights: [
				'Built an internal tool that provisions AWS Lightsail and EC2 environments and defines deployment flows.',
				'Plans large cloud projects spanning several integrated systems.',
				'Writes and maintains Terraform for client infrastructure, and audits it for vulnerabilities.',
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
			skills: ['AWS (EC2, Lightsail, IAM)', 'Cloudflare Workers'],
		},
		{ area: 'Infrastructure', skills: ['Terraform', 'Docker', 'CI/CD'] },
		{ area: 'Languages', skills: ['TypeScript', 'JavaScript', 'SQL'] },
		{
			area: 'Practice',
			skills: ['System design', 'Security auditing', 'Code review'],
		},
	],
}
