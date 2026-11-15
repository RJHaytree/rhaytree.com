---
version: 1
slug: "src-features-home-pages-home-page-tsx"
primary_target: "src/features/home/pages/home-page.tsx"
related_targets: ["src/components/layout/site-layout.tsx","src/features/case-studies/pages/work-page.tsx","src/features/case-studies/pages/case-study-page.tsx","src/features/experience/pages/experience-page.tsx","src/components/layout/not-found-page.tsx"]
---

# Home (and site world)

Mode: Persuade (light). Visitors arrive from LinkedIn, a CV link or a recruiter message and decide in seconds whether Ryan works at system level. Success: they leave with a clear, accurate picture of what he does; no conversion action and no availability messaging. Must not feel flashy, corporate, "hacker" or sparse. Owner is heavily red-green colourblind and prefers dark: meaning never rides on hue.

Carries the world to Work, case study, Experience and 404.

## Direction contract

THESIS: Every page is one engineering drawing sheet. The site documents Ryan the way he documents systems: a bordered sheet, a title block stating what this is, a sheet register as navigation. It refuses the category default of a centred "Hi, I'm" hero over a row of project cards.

OWN-WORLD: Drawing Office v2, as recorded in DESIGN.md. Blue-tinted graphite OKLCH scales with fixed step roles; semantic tokens ground, sheet, grid, rule, rule-strong, muted, ink, bright, signal. Signal yellow marks live or current state only, always with a second cue; sky marks links and controls; category hues are paired with shapes. Archivo set wide for headings, Geist for reading, Geist Mono for references, dates, labels and tags. Two themes from the same roles: dark graphite (default) and light drafting paper, switched from the register with a circular reveal.

STORY: The visitor sees a precise, quiet sheet, reads the name, title and one-line positioning, watches a small system run, and understands the level from About, Areas of practice, Experience and the work register. Contact sits in the title block.

FIRST VIEWPORT: Sheet border inset from the viewport; sheet register across the top with the theme toggle at its end. At lg the sheet splits 5fr / 7fr with a full-height hairline. Left (sticky, one viewport tall): dimension line, the name at display scale, the title "Senior lead engineer, cloud infrastructure", the positioning line, the Ingest / Model / Store / Serve system sketch (hidden below 860px of height), the section nav, and the title block (Email, GitHub, LinkedIn) at its foot with a 24px minimum gap above it. Right: About (three paragraphs and a title block), Areas of practice, Experience. Work is a "coming soon" sheet until a case study is cleared. Below lg it is one column without the section nav.

FORM: Drawing Office (graphite), engineering drawing sets. Signature interaction: the section nav that follows the reader (current section bright with a long signal leader). The interactive data-flow simulation (src/features/case-studies/components/data-flow) is built but unmounted: Ryan withdrew it on 2026-11-15 as possibly too close to a system he built at work. Motion grammar, all disabled under reduced motion: lettered name on load, dimension lines and section rules drawing in, leader lines on hover and current state, the sketch's travelling records, view-transition sheet swaps, the theme reveal.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Open decisions

- First real case study: drafted (provisioning tooling, high level only), blocked on the NDA check with Ryan's employer. Sample case studies remain in review builds until then.
- Launch: remove fixtures and the noindex tag, switch CI to `npm run deploy`, add case study URLs to the sitemap.
