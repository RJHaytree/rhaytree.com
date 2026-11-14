# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: people checking out Ryan Haytree professionally, such as engineering peers, his wider network and recruiters who reach out to him. He is employed full-time and not actively job-hunting, so the site has to make a good impression whenever someone visits, without trying to sell or convert.

Later (not a current target): non-technical contracting clients and agencies, if he moves into contracting. The site should be able to grow to serve them, but current work should not be optimised for them.

## Product Purpose

A personal professional site at rhaytree.com that replaces a seven-year-old GitHub Pages site. It presents Ryan as a platform and systems engineer rather than a "software developer". Success means a visitor quickly understands the level he works at (system architecture, multi-system cloud planning, internal tooling, infrastructure security, technical leadership) and finds evidence for it.

## Positioning

Ryan sits between senior software engineering and platform engineering. He writes code, but his work is defining project architecture, planning large cloud projects that span many systems, building internal tooling that provisions AWS infrastructure (Lightsail, EC2) and defines deployment flows for other teams, writing infrastructure as code with Terraform, auditing infrastructure for vulnerabilities, and doing code reviews. Working title direction: Lead Platform & Systems Engineer. Not final.

## Operating Context

- Visitors usually arrive from a LinkedIn profile, a CV link, a GitHub profile or a recruiter message, and assess him in a short visit.
- Client work is under NDA. Describing what he has done is permitted. Clients must never be named or identifiable (no unique combinations of sector, size and location, no real metrics, no reproduced client diagrams). Case studies should be cleared in writing before publishing.

## Capabilities and Constraints

- Planned content: landing, about, experience, anonymised case studies, writing (later), contact.
- No availability or "hire me" status while he is employed full-time.
- His current employer and job title may be named. Clients and project specifics may not.
- Stack: TanStack Start (React) on Cloudflare Workers, Tailwind v4, TanStack Query, zod, react-hook-form with the zod resolver. Cloudflare D1 is the expected database (e.g. contact submissions). Domain rhaytree.com is on Cloudflare.
- The site's own repo and infrastructure are intended to become a public showcase ("how this site is built"). Undecided: whether the repo goes public and when.
- Open decisions: final professional title, whether to add a contact form or email only, whether a writing/blog section ships at launch.

## Evidence on Hand

- Anonymised case studies of NDA client work: available or obtainable. Not yet written. Candidates include the internal AWS provisioning and deployment tool, a multi-system cloud project, an infrastructure security audit, Terraform standardisation and engineering standards and code review.
- Absent: no public open-source repos to feature, no testimonials, no press, no cleared metrics. Do not fabricate any of these. Use placeholders clearly marked as such until real content exists.

## Product Principles

1. Show the level, not a list of logos: evidence of system-level thinking beats an inventory of tools.
2. NDA-safe by construction: content describes patterns and decisions, never identifiable clients.
3. Quiet confidence: a professional presence for someone not currently looking, so no urgency, no sales funnel and no availability prompts.
4. Built to grow: structure should let contracting services and writing slot in later without a redesign.
5. The site is itself evidence: its build and infrastructure should hold up to an engineer's scrutiny.
