---
name: Ryan Haytree
description: A personal professional site drawn as a set of engineering drawing sheets on a near-black ground.
colors:
  ground: "#000000"
  sheet: "#0a0a0a"
  grid: "#141414"
  rule: "#2e2e2e"
  rule-strong: "#4a4a4a"
  drawing-stroke: "#6b6b6b"
  muted: "#a1a1a1"
  ink: "#ededed"
  bright: "#ffffff"
  signal: "#ffd23f"
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
  lead:
    fontFamily: "Archivo Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "Archivo Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Archivo Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
    fontVariation: "\"wdth\" 87.5"
rounded:
  none: "0px"
spacing:
  sheet-inset-sm: "8px"
  sheet-inset-md: "16px"
  sheet-inset-lg: "24px"
  gutter-sm: "20px"
  gutter-md: "32px"
  gutter-lg: "40px"
  row: "10px"
  schedule-row: "28px"
  section-gap: "96px"
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
  text-link:
    textColor: "{colors.bright}"
  title-block:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
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
  key-entry:
    textColor: "{colors.ink}"
  key-entry-active:
    textColor: "{colors.signal}"
---

# Design System: Ryan Haytree

## Overview

**Creative North Star: "The Drawing Office"**

Every page is one engineering drawing sheet. A bordered, faintly gridded sheet sits inset from a pure black ground; a numbered sheet register runs across its head as navigation; a title block at its foot states which drawing this is and doubles as contact. The site documents its author the way he documents systems: schedules of labelled rows, hairline rules, dimension lines with end ticks, and one authored reference-architecture drawing that the reader can trace.

The palette is graphite: near-black neutrals in the spirit of Vercel and Expo, with meaning carried by lightness, weight and underline rather than hue. One drafting-highlighter yellow exists, and it marks only what is live. Density is moderate and quiet: generous section spacing, long-measure prose capped near 65ch, and tabular schedules that reward a slower read. It is not flashy, not corporate, and not "hacker": no terminal green, no neon, no monospace-everything.

Motion is drafting motion. The name is lettered narrow to wide on the width axis, the drawing draws itself stroke by stroke, rules and dimension lines draw as they scroll in, register rows draw a leader line on hover, and sheets swap with a short crossfade. All of it is gated behind `prefers-reduced-motion: no-preference`.

**Key Characteristics:**
- One bordered sheet per page, inset from a black ground, with a 48px drafting grid.
- One family, Archivo Variable, used across its width axis: wide for names and headings, normal for prose, semi-condensed for labels and numbers.
- Schedules (margin-column label, value beside it) as the universal content pattern.
- Square corners, 1px rules, no shadows.
- A single accent, reserved for live state and always paired with weight, underline or stroke width.

## Colors

A strictly neutral graphite ladder, ordered by lightness, with one yellow for live elements.

### Primary
- **Drafting Highlighter** (signal): the one accent. Used only for live state: the focal layer of the active practice diagram, the leader beside the active practice step, and the leader line on a register row under hover or focus. Never decorative, never for static emphasis, never for links at rest.

### Neutral
- **Black Ground** (ground): the page behind the sheet, the scrollbar track, and the text colour on inverted selections and the skip link.
- **Sheet** (sheet): the drawing surface, the register band and the title block background.
- **Grid Line** (grid): the 48px drafting grid only. Barely visible by design.
- **Hairline Rule** (rule): row dividers in schedules, section rules, the register's lower edge.
- **Strong Rule** (rule-strong): the sheet border, title block border, dimension lines, link underlines at rest, list markers, scrollbar thumb.
- **Drawing Stroke** (drawing-stroke): resting strokes of the practice diagrams.
- **Muted Graphite** (muted): secondary text: leads, descriptions, labels, register entries at rest, captions.
- **Ink** (ink): body text.
- **White** (bright): emphasis: headings, the name, current register entry, link text, focus ring, selection background.

### Named Rules
**The Lightness Carries Meaning Rule.** Every state (current page, link, hover, active, selected) must be distinguishable in greyscale. A state change moves lightness, weight, underline or stroke width; hue alone never carries it.

**The Live Signal Rule.** Yellow marks only what is live right now and always travels with a second cue: heavier stroke (2.25 vs 1.25), semibold label, or a 2px underline. If an element is yellow at rest, it is wrong.

## Typography

**Display Font:** Archivo Variable (with Helvetica Neue, Arial, sans-serif)
**Body Font:** Archivo Variable
**Label Font:** Archivo Variable at semi-condensed width

**Character:** A single grotesque stretched across its width axis does the work of a whole type family: wide and tight for lettering, normal for prose, condensed for the small print of a title block.

### Hierarchy
- **Display** (600, clamp(2.5rem, 9vw, 5.5rem), 0.95, wdth 115): the name on the home sheet only, one line, lettered in from narrow on load. Narrows to clamp(2.5rem, 5.2vw, 4.75rem) in the two-column layout.
- **Headline** (600, 2.25rem to 3rem, 1.05, wdth 112): each sheet's single h1.
- **Title** (600, 1.75rem to 2rem, 1.25, wdth 112): section titles.
- **Lead** (400, 1.125rem to 1.5rem, relaxed): positioning and page leads, in muted graphite.
- **Body** (400, 1.0625rem, 1.6): prose, capped at 60 to 65ch, `text-wrap: pretty`.
- **Label** (400, 0.9375rem, wdth 87.5): title block labels, sheet and case references, dates, figure captions (0.875rem), drawing labels (13px, 15px compact).

### Named Rules
**The One Family Rule.** Archivo is the only typeface. Hierarchy comes from width, weight and lightness; never introduce a second family or a monospace face.

**The Tabular Reference Rule.** Sheet numbers, references, dates and editions are set with tabular figures at semi-condensed width.

## Layout

The sheet is inset from the viewport by 8px, 16px and 24px at small, sm and lg widths, and fills at least the remaining viewport height. Inside it, page gutters are 20px, 32px and 40px. Sections are separated by 96px and each opens with a full-width hairline rule that draws left to right as it scrolls in.

Schedules are the grid: a fixed margin column (12rem for notes, roles and skills; 6.5rem for references and title block labels, 7.5rem from sm) with the value in a fluid column beside it. Below md they stack. Rows are divided by hairlines; long rows pad 28px vertically, compact rows 10px.

At lg the home sheet splits down the middle from the top: the name, positioning and Areas of practice steps fill the left half, and the sticky diagram stage fills the right half from the first viewport, pinned 2rem from the top. A full-height 1px rule divides the halves and meets the sheet register. Below lg it is a single column with each diagram inline. Breakpoints are Tailwind defaults (sm 640px, md 768px, lg 1024px).

## Elevation & Depth

Flat. There are no shadows anywhere. Depth is conveyed by the ground-to-sheet step (black to #0a0a0a), the 1px sheet border, and hairline rules. The only overlay is the sticky drawing band on narrow screens, which separates by a sheet-coloured background and a bottom hairline rather than a shadow.

### Named Rules
**The Paper Is Flat Rule.** Nothing lifts off the sheet. Separation is a rule or a lightness step, never a shadow, glow or blur.

## Shapes

Square everywhere: sheet, title block, tags and focus ring (a 1px radius on the 2px outline is the only softening). Borders are 1px; strong rules frame objects (sheet, title block, dimension lines), hairline rules divide content. The recurring geometry is drafting geometry: dimension lines with end ticks measuring a block's width, leader lines, and the gridded field.

## Components

### Sheet Register (navigation)
Numbered like a drawing set: the name at left (semibold, wide, white), entries "01 Home" to "04 Contact" at right, each prefixed by a semi-condensed tabular number. Entries rest in muted graphite; hover and the current sheet turn white and underlined. Two-column grid on phones, single row from sm. A skip link inverts to white on black when focused.

### Title Block
A bordered schedule (`dl`) on the sheet surface: label column in condensed muted graphite, value in ink, hairline between rows, 10px by 16px row padding. It appears at the foot of every sheet as contact (Drawing number and title from the route, Author, Email, GitHub, Edition) and on the home sheet as the drawing's own title block. It runs flush into the sheet's edge by dropping the adjoining borders.

### Text Link
White text with a strong-rule underline (1px, 0.22em offset); the underline brightens to white on hover. Router links and plain anchors share the style.

### Schedule (Notes, Roles, Skills, Key)
The universal content pattern: hairline-divided rows, a margin column for the label (title, dates, area) and the body beside it, capped at 65ch. Notes titles and role dates use the condensed width; role highlights use an en-dash marker in strong-rule grey.

### Work Register
A schedule of case studies: condensed tabular reference in the margin, title link and muted summary beside it. On row hover or focus the reference brightens and a 2px signal leader line draws across the gutter toward the title.

### Tags
Square chips with a hairline border, muted 0.9375rem text, 2px by 10px padding, used for a case study's topics. Static, not interactive.

### Dimension Line
A decorative horizontal strong-rule line with end ticks that measures the width of the heading block above which it sits. Draws in from the left on load.

### Practice Tour (signature)
A compound component (Provider, Steps, Stage) that walks through the seven areas of practice. At lg the sheet splits in two from the top: numbered steps on the left (each at least 48vh tall, text at the top), and a sticky stage on the right showing one focused diagram per area. A step becomes active as it crosses a line a third of the way down the viewport; its heading brightens and a 2px signal leader draws beside its number, and the stage remounts the matching diagram so it draws itself in. The stage caption reads "NN of 07: area" plus the illustrative note. Below lg there is no stage: each step shows its own diagram inline. Each diagram (480 by 360 viewBox, labels 16 units, 20 below 640px) is a simple generic illustration with one focal layer in signal yellow at 2.25 stroke and semibold labels, and is always captioned as illustrative, not a client or employer system.

## Do's and Don'ts

### Do:
- **Do** frame every page as one sheet: inset border in strong rule, drafting grid, register at the head, title block at the foot with the route's drawing number.
- **Do** carry every state by lightness, weight, underline or stroke width so it survives greyscale.
- **Do** pair signal yellow with a second cue every time it appears.
- **Do** lay out lists of facts as schedules with a margin column and hairline rows.
- **Do** set references, dates and sheet numbers in tabular, semi-condensed Archivo.
- **Do** gate every animation behind reduced-motion preference and use the drafting ease (cubic-bezier(0.16, 1, 0.3, 1)).
- **Do** caption any illustration as a generic reference architecture, never a client, employer or internal tool.

### Don't:
- **Don't** introduce a second hue, a gradient accent, or any red/green distinction.
- **Don't** use yellow at rest, for decoration, or for static emphasis.
- **Don't** add shadows, glows, blurs or rounded corners.
- **Don't** add a second typeface or a monospace face.
- **Don't** depict, diagram or name any specific internal tool, client or employer system in drawings or fixtures.
- **Don't** fall back to a centred "Hi, I'm" hero over a row of project cards.
