import { z } from 'zod'

/** Year and month, e.g. "2023-04". */
const yearMonth = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/)

export const roleSchema = z.object({
	title: z.string().min(1),
	organisation: z.string().min(1),
	/** Where the organisation is, e.g. "Birmingham, UK". */
	location: z.string().min(1).optional(),
	/** How the role is worked, e.g. "Remote", "Hybrid", "Part-time". */
	arrangement: z.string().min(1).optional(),
	start: yearMonth,
	/** Omit for a current role. */
	end: yearMonth.optional(),
	summary: z.string().min(1),
	highlights: z.array(z.string().min(1)).default([]),
	/** Skills and technologies used in the role, shown as tags. */
	skills: z.array(z.string().min(1)).default([]),
})

export const skillGroupSchema = z.object({
	area: z.string().min(1),
	skills: z.array(z.string().min(1)).min(1),
})

export const experienceSchema = z.object({
	roles: z.array(roleSchema),
	skillGroups: z.array(skillGroupSchema),
})

export type Role = z.infer<typeof roleSchema>
export type SkillGroup = z.infer<typeof skillGroupSchema>
export type Experience = z.infer<typeof experienceSchema>
