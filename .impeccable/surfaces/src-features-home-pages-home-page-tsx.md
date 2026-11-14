---
version: 1
slug: "src-features-home-pages-home-page-tsx"
primary_target: "src/features/home/pages/home-page.tsx"
related_targets: ["src/components/layout/site-layout.tsx","src/features/case-studies/pages/work-page.tsx","src/features/case-studies/pages/case-study-page.tsx","src/features/experience/pages/experience-page.tsx","src/components/layout/not-found-page.tsx"]
---

# Home (and site world)

Mode: Persuade (light). Visitors arrive from LinkedIn, a CV link or a recruiter message and decide in seconds whether Ryan works at system level. Success: they leave with a clear, accurate picture of what he does; no conversion action. Must not feel flashy, corporate, "hacker" or sparse. Owner is heavily colourblind and prefers dark: meaning never rides on hue.

Carries the world to Work, case study, Experience and 404.

## Direction contract

THESIS: Every page is one engineering drawing sheet. The site documents Ryan the way he documents systems: a bordered sheet, a title block stating what this is, a sheet register as navigation. It refuses the category default of a centred "Hi, I'm" hero over a row of project cards.

OWN-WORLD: Black ground (#000), sheet surface #0A0A0A inside a 1px light-grey border, a barely visible 48px drafting grid, hairline rules #2E2E2E, muted text #A1A1A1, primary text #EDEDED, white for emphasis. One accent, drafting-highlighter yellow #FFD23F, reserved for live elements (the highlighted part of the system drawing, leader lines); it is always paired with extra weight or brightness so it reads by lightness alone. Navigation state stays lightness, weight and underline. Archivo variable (width axis) as the only family: wide for the name, normal for prose, semi-condensed for title-block labels. Dimension lines with end ticks mark measured extents.

STORY: The visitor sees a precise, quiet sheet, reads the name and one-line positioning, understands the level from the areas of practice and the work register, and finds contact in the title block at the foot of every sheet.

FIRST VIEWPORT: Sheet border inset from the viewport. Top: sheet register (name left; 01 Home, 02 Work, 03 Experience, 04 Contact right, current sheet white and underlined). Left column: a dimension line measuring the positioning width, the name at display scale in wide Archivo, the positioning paragraph in muted grey, then the areas of practice as the drawing's key. Right column: an authored, generic data-integration drawing (protocol receivers HTTP, MQTT, IBM MQ, SMTP and Other on Kubernetes, merging to a queue, consolidated by functions, stored in a managed database and a cache, served by an API on container apps through an edge/WAF to consumers; cloud region, security perimeter, code repository and pipeline with a review gate, Terraform), captioned as illustrative and not a client or employer system. Seven key entries trace it, including Data integration. A compact top-to-bottom variant renders below 640px. Lower right, flush to the sheet border: the title block (Drawing RH-01, Discipline, Scope, Edition).

FORM: Drawing Office (graphite), engineering drawing sets; grounded candidate 2 of 7, chosen in the safer register after the user's steer (darker, Vercel/Expo-like neutrals). seed:1e287a166361901f. Signature interaction: the key traces the drawing; hovering, focusing or tapping an area of practice highlights its part of the system drawing in the accent and dims the rest. Motion grammar, all disabled under reduced motion: on load the name is lettered from narrow to wide and the system drawing draws itself stroke by stroke; section rules and dimension lines draw as they scroll into view; register rows draw a leader line on hover; sheets swap with a view-transition crossfade while the register and title block update to the new drawing number.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Open decisions

- Real positioning statement, About text, roles and first cleared case study (currently placeholders/fixtures).
- Final professional title.
