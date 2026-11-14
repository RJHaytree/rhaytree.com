export interface PracticeArea {
	id: string
	name: string
	detail: string
}

/** The areas of practice, in the order they read best. */
export const practiceAreas: Array<PracticeArea> = [
	{
		id: 'architecture',
		name: 'Architecture',
		detail: 'Deciding how systems and services fit together before any are built: their boundaries, the contracts between them, and which data each one owns.',
	},
	{
		id: 'data',
		name: 'Data handling and modelling',
		detail: 'Taking data in from many sources and protocols, and shaping it into one consistent model the rest of the system can rely on.',
	},
	{
		id: 'cloud',
		name: 'Cloud planning',
		detail: 'Planning what runs where in the cloud, from containers and functions to managed databases, and how the pieces connect.',
	},
	{
		id: 'platform',
		name: 'Platform tooling',
		detail: 'Shared tooling and pipelines that let teams build, test and ship their services the same way every time.',
	},
	{
		id: 'iac',
		name: 'Infrastructure as code',
		detail: 'Describing infrastructure in Terraform, so every environment is repeatable, reviewable and built from the same modules.',
	},
	{
		id: 'security',
		name: 'Security auditing',
		detail: 'Reviewing infrastructure layer by layer for weaknesses, and turning the findings into fixes that stay fixed.',
	},
	{
		id: 'review',
		name: 'Code review',
		detail: 'Reviewing changes before they merge, to keep quality and consistency high across the team.',
	},
]
