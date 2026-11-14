import type { z } from 'zod'
import type { Experience } from '../types/experience'
import { experienceSchema } from '../types/experience'
import { experienceFixture } from './experience.fixtures'

// Real roles and skills go here.
const published: z.input<typeof experienceSchema> = {
	roles: [],
	skillGroups: [],
}

// Fixtures show on the dev server and in review builds (`--mode review`).
// Both values are constants at build time, so a normal production build
// only ever sees `published` and tree-shakes the fixtures away.
const includeFixtures = import.meta.env.DEV || import.meta.env.MODE === 'review'

const experience: Experience = experienceSchema.parse(
	includeFixtures ? experienceFixture : published,
)

export async function getExperience(): Promise<Experience> {
	return experience
}
