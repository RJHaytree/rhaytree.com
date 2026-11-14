import type { z } from 'zod'
import type { Experience } from '../types/experience'
import { experienceSchema } from '../types/experience'
import { experienceFixture } from './experience.fixtures'

// Real roles and skills go here.
const published: z.input<typeof experienceSchema> = {
  roles: [],
  skillGroups: [],
}

// The dev server uses fixtures; production builds only ever see `published`
// (import.meta.env.DEV is false at build time, so fixtures are tree-shaken).
const experience: Experience = experienceSchema.parse(
  import.meta.env.DEV ? experienceFixture : published,
)

export async function getExperience(): Promise<Experience> {
  return experience
}
