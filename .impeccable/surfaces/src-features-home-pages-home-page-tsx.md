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

FIRST VIEWPORT: Sheet border inset from the viewport. Top: sheet register (name left; 01 Home, 02 Work, 03 Experience, 04 Contact right, current sheet white and underlined). Left: a dimension line measuring the positioning width, the name at display scale in wide Archivo, the positioning paragraph in muted grey. Right, flush to the sheet border: the title block (Drawing RH-01, Discipline, Scope, Edition). Below the fold line, the Areas of practice section begins and its first diagram (Architecture) peeks into view.

FORM: Drawing Office (graphite), engineering drawing sets; grounded candidate 2 of 7, chosen in the safer register after the user's steer (darker, Vercel/Expo-like neutrals). seed:1e287a166361901f. Signature interaction: the Practice Tour. At lg the Areas of practice section splits down the middle: seven numbered steps on the left, and a sticky stage on the right showing one simple, generic diagram per area (architecture, data handling and modelling, cloud planning, platform tooling, infrastructure as code, security auditing, code review). As a step crosses the middle of the viewport it becomes active (heading brightens, signal leader draws) and the stage swaps to its diagram, which draws itself in with its focal layer in signal yellow. Below lg each step shows its diagram inline. Motion grammar, all disabled under reduced motion: lettered name on load, diagram strokes drawing in on swap, section rules drawn on scroll, register leader lines on hover, view-transition sheet swaps.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Open decisions

- Real positioning statement, About text, roles and first cleared case study (currently placeholders/fixtures).
- Final professional title.
