import { Page } from '#/components/layout/page'
import { Section } from '#/components/ui/section'

import { RoleList } from '../components/role-list'
import { SkillGroups } from '../components/skill-groups'
import type { Experience } from '../types/experience'

export function ExperiencePage({ experience }: { experience: Experience }) {
	return (
		<Page.Root>
			<Page.Header>
				<Page.Title>Experience</Page.Title>
				<Page.Lead>
					Roles held and the skills used in them, most recent first.
				</Page.Lead>
			</Page.Header>

			<div className="mt-14 space-y-20">
				<Section.Root>
					<Section.Title>Roles</Section.Title>
					<Section.Body>
						{experience.roles.length > 0 ? (
							<RoleList roles={experience.roles} />
						) : (
							<p className="text-muted">
								Role history is being added.
							</p>
						)}
					</Section.Body>
				</Section.Root>

				<Section.Root>
					<Section.Title>Skills</Section.Title>
					<Section.Body>
						{experience.skillGroups.length > 0 ? (
							<SkillGroups groups={experience.skillGroups} />
						) : (
							<p className="text-muted">
								Skills are being added.
							</p>
						)}
					</Section.Body>
				</Section.Root>
			</div>
		</Page.Root>
	)
}
