---
name: Ryan Haytree
description: A personal professional site drawn as a set of engineering drawing sheets on a blue-tinted graphite ground.
colors:
  ground: "oklch(0.13 0.012 255)"
  sheet: "oklch(0.16 0.012 255)"
  grid: "oklch(0.185 0.013 255)"
  rule: "oklch(0.27 0.015 255)"
  rule-strong: "oklch(0.38 0.017 255)"
  muted: "oklch(0.76 0.014 255)"
  ink: "oklch(0.93 0.006 255)"
  bright: "oklch(0.985 0.003 255)"
  signal: "oklch(0.87 0.17 92)"
  sky-6: "oklch(0.42 0.09 237)"
  sky-7: "oklch(0.8 0.12 237)"
  sky-9: "oklch(0.82 0.08 237)"
  sky-10: "oklch(0.93 0.035 237)"
  orange-7: "oklch(0.76 0.16 65)"
  violet-7: "oklch(0.68 0.14 330)"
  azure-7: "oklch(0.56 0.17 258)"
  vermilion-7: "oklch(0.62 0.19 38)"
typography:
  display:
    fontFamily: "Archivo Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.5rem, 9vw, 5.5rem)"
    fontWeight: 600
    lineHeight: 0.95
    letterSpacing: "-0.035em"
    fontVariation: "\"wdth\" 115"
  headline:
    fontFamily: "Archivo Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "3rem"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.02em"
    fontVariation: "\"wdth\" 112"
  title:
    fontFamily: "Archivo Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "2rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.02em"
    fontVariation: "\"wdth\" 112"
  item:
    fontFamily: "Geist Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.75
  lead:
    fontFamily: "Geist Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "Geist Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Geist Mono Variable, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: "\"tnum\" 1"
rounded:
  none: "0px"
spacing:
  sheet-inset-sm: "8px"
  sheet-inset-md: "16px"
  sheet-inset-lg: "24px"
  gutter-sm: "20px"
  gutter-md: "32px"
  gutter-lg: "40px"
  column-gutter: "56px"
  row: "10px"
  list-row: "20px"
  schedule-row: "28px"
  section-gap: "80px"
  section-gap-home: "112px"
  number-column: "3rem"
  ref-column: "6.5rem"
  margin-column: "12rem"
components:
  sheet:
    backgroundColor: "{colors.sheet}"
    rounded: "{rounded.none}"
  register-link:
    textColor: "{colors.muted}"
    typography: "{typography.body}"
  register-link-current:
    textColor: "{colors.bright}"
  section-nav-link:
    textColor: "{colors.muted}"
    typography: "{typography.body}"
    padding: "6px 0"
  section-nav-link-current:
    textColor: "{colors.bright}"
  text-link:
    textColor: "{colors.sky-9}"
  text-link-hover:
    textColor: "{colors.sky-10}"
  theme-toggle:
    textColor: "{colors.muted}"
    typography: "{typography.body}"
  theme-toggle-hover:
    textColor: "{colors.bright}"
  title-block:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "10px 16px"
  title-block-label:
    textColor: "{colors.muted}"
    typography: "{typography.label}"
  tag:
    textColor: "{colors.muted}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "2px 10px"
---

# Design System: Ryan Haytree

## Overview

**Creative North Star: "The Drawing Office"**

Every page is one engineering drawing sheet. A bordered, faintly gridded sheet sits inset from a dark graphite ground; a numbered sheet register runs across its head as navigation; a title block at its foot states which drawing this is and doubles as contact. The site documents its author the way he documents systems: schedules of labelled rows, hairline rules, dimension lines with end ticks, and numbered registers of practice, roles and work.

The palette is blue-tinted graphite in the spirit of Vercel and Expo, built as ten-step OKLCH scales with a fixed job per step. Meaning is carried by lightness, weight, length and underline first; hue is a supporting cue, never the only one, because the owner reads red-green poorly. A drafting-highlighter yellow marks what is live or current, sky blue marks what can be followed, and a small set of category hues, each paired with a shape, is held in reserve for diagrams. Density is moderate and quiet: generous section spacing, prose capped near 60 to 65ch, schedules that reward a slower read. It is not flashy, not corporate, and not "hacker": no terminal green, no neon, no monospace-everything.

Motion is drafting motion. The name is lettered narrow to wide on the width axis, dimension lines draw in on load, section rules draw as they scroll in, leaders lengthen beside the current section and the hovered work row, and sheets swap with a short crossfade. All of it is gated behind `prefers-reduced-motion: no-preference`.

**Key Characteristics:**
- One bordered sheet per page, inset from a graphite ground, with a 48px drafting grid.
- Three families, one job each: Archivo set wide for headings, Geist for reading, Geist Mono for references, dates, labels and numbers.
- Ten-step OKLCH scales with fixed step roles: 1-3 backgrounds, 4-6 borders, 7-8 solid fills, 9 secondary text, 10 primary text.
- Schedules (number or margin-column label, value beside it, hairline rows) as the universal content pattern.
- Square corners, 1px rules, no shadows.
- Two themes from one set of roles: dark graphite (the default world) and light drafting paper, switched with a circular reveal.
- Every state survives greyscale in both themes.

## Colors

Blue-tinted graphite surfaces and text, one yellow for live state, one blue for links, and shape-paired category hues on the blue versus orange/yellow axis.

### Primary
- **Drafting Highlighter** (signal, signal-7 on its scale): live and current state only. The 2px underline under the current sheet in the register, the lengthened leader beside the current section in the section nav, the leader that draws across a work-register row on hover or focus, and the traced part of a diagram. Never decorative, never for static emphasis, never for links.

### Secondary
- **Drafting Sky** (sky scale): links and interactive controls. Link text sits on sky-9 with a sky-6 underline; hover lifts the text to sky-10 and the underline to sky-9. Sky-7 is the solid fill should a filled control ever ship.

### Tertiary
- **Category hues** (sky, orange, violet, azure, vermilion): reserved for diagram categories and status. Each hue is fixed to a shape: sky circle, orange triangle, violet square, azure diamond, vermilion cross. Within each side of the blue versus orange/yellow axis the solids differ clearly in lightness (sky-7 0.80 vs azure-7 0.56; orange-7 0.76 vs vermilion-7 0.62), so pairs stay distinct with red-green colour vision and in greyscale.

### Neutral
- **Graphite Ground** (ground, graphite-0): the page behind the sheet, the scrollbar track, and the text on inverted selections and the skip link.
- **Sheet** (sheet, graphite-1): the drawing surface, the register band and the title block background.
- **Grid Line** (grid): the 48px drafting grid only, a half step above the sheet. Barely visible by design.
- **Hairline Rule** (rule, graphite-4): row dividers in schedules, section rules, the register's lower edge, the hairline between the home columns, tag borders.
- **Strong Rule** (rule-strong, graphite-6): the sheet border, title block border, dimension lines, resting section-nav leaders, list markers, the register's hover underline, the scrollbar thumb.
- **Muted Graphite** (muted, graphite-9): secondary text: leads, descriptions, labels, references and dates, register and section-nav entries at rest.
- **Ink** (ink, graphite-10): body text.
- **Bright** (bright): emphasis: headings, the name, current register and section-nav entries, schedule titles, the focus ring, the selection background.

### Light Theme
Drafting paper: `html.light` flips every scale so each step keeps its job (1-3 backgrounds, 4-6 borders, 7-8 solids, 9-10 text), and the semantic roles follow (sheet oklch 0.975, ground 0.945, ink 0.24, bright 0.15, muted 0.42, all at hue 255). Signal deepens to ochre (oklch 0.64 0.145 78) so it still reads as a mark on white, at 3.2:1 on the sheet; strong rules and orange-7 are darkened to clear 3:1 too; category solids darken so each stays distinct by lightness from its pair. Components never carry theme-specific classes: a colour that only works in one theme is a bug in the scale, not the component. Dark is the default; a saved choice wins, otherwise the system setting, applied before first paint.

### Named Rules
**The Lightness Carries Meaning Rule.** Every state (current page, current section, link, hover, pressed, active) must be distinguishable in greyscale. A state change moves lightness, weight, length, underline or stroke width; hue alone never carries it.

**The Live Signal Rule.** Yellow marks only what is live or current right now and always travels with a second cue: bright text, a 2px weight, a longer leader, or a heavier stroke. An element with no state is never yellow.

**The Fixed Step Rule.** A colour is chosen by its step's job, not its look: steps 1-3 fill backgrounds, 4-6 draw borders, 7-8 are solids, 9 is secondary text, 10 is primary text. Components use the semantic roles; diagrams and previews may read the scales directly.

**The Shape Pairs Hue Rule.** A category colour never appears without its shape, and a status never appears without its shape and words.

## Typography

**Display Font:** Archivo Variable (with Helvetica Neue, Arial, sans-serif)
**Body Font:** Geist Variable (with Helvetica Neue, Arial, sans-serif)
**Label/Mono Font:** Geist Mono Variable (with ui-monospace, SFMono-Regular, Menlo, monospace)

**Character:** Archivo stretched wide does the lettering of a drawing set; Geist reads cleanly at length; Geist Mono sets the small print of references, dates and title-block labels with even figures.

### Hierarchy
- **Display** (Archivo 600, clamp(2.5rem, 9vw, 5.5rem), 0.95, wdth 115): the name on the home sheet only, one line, lettered in from narrow on load. Narrows to clamp(2.5rem, 4.1vw, 4rem) in the lg identity column.
- **Headline** (Archivo 600, 2.25rem to 3rem, 1.05, wdth 112): each sheet's single h1.
- **Title** (Archivo 600, 1.75rem to 2rem, 1.25, wdth 112): section titles. The home sheet's professional title under the name uses Archivo 600 at 1.25rem, wdth 112, in ink.
- **Item** (Geist 600, 1.125rem): titles of entries in a schedule: practice areas, roles, case-study links (500 there).
- **Lead** (Geist 400, 1.125rem to 1.25rem, relaxed): positioning and page leads, in muted graphite.
- **Body** (Geist 400, 1.0625rem, 1.6): prose, capped at 60 to 65ch, `text-wrap: pretty`.
- **Label** (Geist Mono 400, 0.875rem, tabular): title-block labels, sheet and case references, dates, register and section numbers, tags, notes titles (500, bright), and diagram text (13 to 16 viewBox units, larger below 640px).

### Named Rules
**The One Job Per Family Rule.** h1 to h3 at section level and above are Archivo, set wide (112%) by the base styles. Reading text is Geist. Mono is only for references, dates, numbers, labels, tags and diagram text, never for prose or headings.

**The Tabular Reference Rule.** Sheet numbers, references, dates and editions are set in Geist Mono with tabular figures.

## Layout

The sheet is inset from the viewport by 8px, 16px and 24px at small, sm and lg widths and fills at least the remaining viewport height. Inside it, page gutters are 20px, 32px and 40px. Sections open with a full-width hairline rule that draws left to right as it scrolls in, then 32px to the title and 24px to the body. Sections are 80px apart on inner sheets and 112px apart on the home sheet.

Schedules are the grid: a fixed column on the left (3rem for practice numbers, 6.5rem for references and title-block labels, 7.5rem from sm, 12rem for notes and role dates) with the value in a fluid column beside it. Below sm or md they stack. Rows are divided by hairlines; long rows pad 28px vertically, list rows 20px, title-block rows 10px.

At lg the home sheet is two columns (5fr / 7fr). The left identity column is sticky at the top of the viewport and a full viewport tall, 64px top and bottom: dimension line, name, professional title, positioning, the section nav, and the Email and GitHub links pinned to its foot. The right column scrolls the content (About with its title block, Areas of practice, Experience, Selected work) and is divided from the identity column by a full-height hairline with 56px of gutter either side. Below lg it is a single column with no section nav. Breakpoints are Tailwind defaults (sm 640px, md 768px, lg 1024px).

## Elevation & Depth

Flat. There are no shadows anywhere. Depth is conveyed by the ground-to-sheet lightness step (graphite-0 to graphite-1), the 1px sheet border, and hairline rules. The sticky identity column separates by a hairline, not a shadow.

### Named Rules
**The Paper Is Flat Rule.** Nothing lifts off the sheet. Separation is a rule or a lightness step, never a shadow, glow or blur.

## Shapes

Square everywhere: sheet, title block, tags and focus ring (a 1px radius on the 2px outline is the only softening). Borders are 1px; strong rules frame objects (sheet, title block, dimension lines), hairline rules divide content. The recurring geometry is drafting geometry: dimension lines with end ticks measuring a block's width, leader lines, the gridded field, and the five category shapes (circle, triangle, square, diamond, cross) as small 12px filled marks.

## Components

### Sheet Register (navigation)
Numbered like a drawing set: the name at left (Archivo 600, wide, bright), entries "01 Home" to "04 Contact", each prefixed by a Geist Mono tabular number, then the theme toggle. Entries rest in muted graphite. Hover turns the entry bright with a 2px strong-rule underline at 6px offset; the current sheet is bright with a 2px signal underline. Two-column grid on phones, single row from sm. A skip link inverts to bright on ground when focused.

### Section Nav (signature)
In-page navigation in the home identity column that follows the reader. Each entry is a mono number, a leader and a label. At rest: muted text, a 32px strong-rule hairline leader that grows to 48px on hover while the text lifts to ink. Current (the section crossing the upper third of the viewport, `aria-current="location"`): bright text and a 64px, 2px signal leader. The leader eases with the drafting curve over 300ms; the state reads by lightness and length before hue.

### Theme Toggle
A plain text button in the register: a 16px outlined icon (crescent in dark, sun in light, 1.5px stroke) and the current theme's name, "Dark" or "Light". Muted at rest, bright on hover; its accessible name says what it will do ("Switch to light theme"). Switching reveals the new theme as a circle growing from the button to the farthest corner over 650ms on the drafting ease, via a view transition scoped to the switch so route transitions keep their crossfade. Under reduced motion, or without view transitions, it swaps instantly. The choice is remembered across visits.

### Title Block
A bordered schedule (`dl`) on the sheet surface: label column in Geist Mono muted graphite, value in ink, hairline between rows, 10px by 16px row padding. It appears at the foot of every sheet as contact (Drawing number and title from the route, Author, Email, GitHub, Edition), running flush into the sheet's edge by dropping the adjoining borders, and inside the home About section as the author's own title block.

### Text Link
Sky-9 text with a 1px sky-6 underline at 0.22em offset; hover lifts the text to sky-10 and the underline to sky-9 over 150ms. Router links and plain anchors share the style. The underline is the non-hue cue.

### Schedule (Practice, Roles, Notes, Skills)
The universal content pattern: hairline-divided rows, a number or margin column on the left and the body beside it, capped at 60 to 65ch. Practice rows carry a mono number, a bright item title and a muted line. Role rows carry mono dates, a bright title, the organisation in muted, a summary, and highlights with an en-dash marker in strong-rule grey. Notes titles are mono 500 in bright.

### Work Register
A schedule of case studies: mono tabular reference in the margin, a sky title link and muted summary beside it. On row hover or focus the reference brightens and a 2px signal leader draws across the gutter toward the title.

### Tags
Square chips with a hairline border, Geist Mono 0.875rem muted text, 2px by 10px padding, used for a case study's stack. Static, not interactive.

### Dimension Line
A decorative horizontal strong-rule line with end ticks that measures the width of the heading block it sits above. Draws in from the left on load.

## Do's and Don'ts

### Do:
- **Do** frame every page as one sheet: inset border in strong rule, drafting grid, register at the head, title block at the foot with the route's drawing number.
- **Do** carry every state by lightness, weight, length, underline or stroke width so it survives greyscale in both themes.
- **Do** pair signal yellow with a second cue every time it appears.
- **Do** pick colours by step role (1-3 backgrounds, 4-6 borders, 7-8 solids, 9 secondary text, 10 primary text).
- **Do** pair every category colour with its fixed shape, and every status with its shape and words.
- **Do** lay out lists of facts as schedules with a number or margin column and hairline rows.
- **Do** set references, dates, numbers and labels in Geist Mono with tabular figures.
- **Do** gate every animation behind reduced-motion preference and use the drafting ease (cubic-bezier(0.16, 1, 0.3, 1)).
- **Do** caption any illustration as a generic reference architecture, never a client, employer or internal tool.

### Don't:
- **Don't** let hue alone carry meaning, and don't distinguish anything by a red/green pair; no green in the palette.
- **Don't** use yellow for links, decoration, static emphasis or anything without a live state.
- **Don't** use sky for anything that can't be followed or pressed.
- **Don't** add shadows, glows, blurs or rounded corners.
- **Don't** set prose or headings in mono, or add a fourth typeface.
- **Don't** depict, diagram or name any specific internal tool, client or employer system in drawings or fixtures.
- **Don't** fall back to a centred "Hi, I'm" hero over a row of project cards.
