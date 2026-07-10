## Goal
Fix the awkward whitespace above "Selected work" on the homepage, and give the inner pages (Photography, Skills, Labs, Blog) a more creative, professional, responsive treatment with tactile click animations.

## 1. Homepage — tighten the scroll seam
The gap looks weird because the hero uses `pb-24 pt-12` and "Selected work" starts with a big empty band before the title. Changes:
- Reduce hero bottom padding and "Selected work" top padding so the transition feels intentional.
- Add a slim divider strip between hero and selected work: a thin rule with a small uppercase eyebrow ("Index / 2026") on the left and an arrow-down marker on the right — turns dead space into a section break.
- Mobile: after the full-bleed portrait section, add the same divider strip so the next section doesn't feel disconnected.
- The "Selected work" list rows: tighten vertical rhythm on mobile (`py-6` instead of `py-8`), keep desktop generous. Add a subtle animated underline sweep on hover and a scale-down press state on tap for the click animation.

## 2. Shared polish — click + hover language
Introduce one consistent interaction vocabulary reused across every page:
- **Link rows / cards**: hover slides content right by 8px and reveals a thin underline; `whileTap` scales to 0.98 for tactile press feedback on mobile.
- **Filter chips / buttons**: `whileTap` scale 0.95, active state gets a small dot indicator.
- **Images**: hover zoom stays, add a soft brightness lift on tap.
Implemented via a small set of framer-motion variants in a new `src/lib/motion.ts` so every page pulls from the same source.

## 3. Photography — more creative, still organized
Keep the editorial scroll but upgrade composition:
- Sticky category filter bar that becomes a compact pill row on mobile (horizontal scroll, no wrap jitter).
- Add a running index counter on the left rail (desktop): `01 — 06` scrolls alongside frames.
- Alternate `full / left / right / pair` layouts with clear captions; on mobile everything collapses to single column with the caption directly under the frame.
- Add a lightbox on tap: click a frame → framer-motion `layoutId` expands it to a full-viewport modal with metadata, close on tap/escape.
- Ensure every image has `loading="lazy"` and proper aspect ratios so mobile doesn't jank.

## 4. Skills — from list to visual grid
Rebuild as a responsive bento grid:
- Categories: Electronics & Hardware, Programming, Photography, Tools.
- Each cell is a card with an icon, category label, and a chip cloud of skills. Cards use the shared hover/tap animation.
- Desktop: 4-column bento with one hero cell spanning 2×2. Mobile: single column, cards stack with generous spacing.

## 5. Labs — sessional work as an editorial index
- Numbered list (01, 02, …) with course code, lab title, brief description, and tags (e.g. "Microcontroller", "Signals").
- Expandable rows: tap a row → framer-motion height animation reveals details (objective, tools, outcome). Only one open at a time.
- Desktop shows a two-column layout: numbered index on the left, expanded content on the right rail.

## 6. Blog — social-first cards
- Three tall cards (LinkedIn, Facebook, Instagram) with distinctive typography, a short "what to expect there" note, and a large arrow. Whole card is the link with press animation.
- Add a "Notes" strip below for future written posts (placeholder empty state — "Writing soon").

## 7. Responsiveness & professionalism checklist (applied to every page)
- Consistent page padding scale: `px-6 md:px-12` and `max-w-[1400px] mx-auto`.
- Section headers share the same rhythm: eyebrow (uppercase tracked), oversized display title, one-line intro, thin border-b.
- All grids use `min-w-0` on text containers and `shrink-0` on icons per the responsive rules.
- Add `<title>` and `<meta description>` per route (already present — verify uniqueness).
- Focus-visible rings on every interactive element for keyboard users.

## Technical
- New file: `src/lib/motion.ts` — exported variants (`tapPress`, `hoverShift`, `chipPress`).
- New component: `src/components/SectionDivider.tsx` — reusable strip used between hero and following section.
- Edits: `src/routes/index.tsx` (spacing fix + divider + press anims), `src/routes/photography.tsx` (sticky filters, index rail, lightbox), `src/routes/skills.tsx` (bento), `src/routes/labs.tsx` (expandable rows), `src/routes/blog.tsx` (social cards).
- No new dependencies — framer-motion, lucide-react, and Tailwind v4 tokens already cover this.

## Out of scope
- No backend / Lovable Cloud changes.
- No new color tokens; the current Paper & Ink monochrome palette stays.
- No content copy rewrites beyond section eyebrows and empty states.
