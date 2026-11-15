export interface PracticeArea {
	id: string
	name: string
	detail: string
}

/** The areas of practice, in the order they read best. */
export const practiceAreas: Array<PracticeArea> = [
	{
		id: 'architecture',
		name: 'Architecture and cloud planning',
		detail: 'Deciding how systems fit together before any are built, and what runs where in the cloud: their boundaries, the contracts between them, and which data each one owns.',
	},
	{
		id: 'data',
		name: 'Data handling',
		detail: 'Planning how systems use and generate large amounts of data to support or improve business-critical processes, including bringing AI into them.',
	},
	{
		id: 'infrastructure',
		name: 'Infrastructure as code and platform tooling',
		detail: 'Environments described in Terraform, and shared pipelines, so teams build, test and ship the same way every time.',
	},
	{
		id: 'security',
		name: 'Security and review',
		detail: 'Auditing infrastructure layer by layer and reviewing code before it merges, so weaknesses are caught early and fixes stay fixed.',
	},
]
