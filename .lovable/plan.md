## Changes

### 1. Add social links

- LinkedIn: `md-tazbid-sikder-519682216`
- Facebook: `share/1DGPAexcYZ`
- Instagram: `md.tazbid`

Wire them into:

- **Footer** (`src/components/Footer.tsx`) — right-side icon row (LinkedIn, Facebook, Instagram) using `lucide-react` icons, subtle hover, opens in new tab with `rel="noreferrer noopener"`.
- **Hero (desktop + mobile)** in `src/routes/index.tsx` — small inline row under the intro paragraph ("Elsewhere — LinkedIn · Facebook · Instagram") as text links, so they're visible above the fold.
- **Blog page** (`src/routes/blog.tsx`) — since Blog is linked to FB/LinkedIn per earlier decision, surface the same three as prominent cards/links.

### 2. Remove the "01 / Hello" numbering + editorial tags

Strip the numeric/label ornamentation so the design reads calmer and more professional:

- Mobile hero: remove `/ 01 — Hello` top-left tag and `2026` top-right, remove the rotated "Photographer / ETE Student" side label, remove the `—` dash before the intro paragraph.
- Desktop hero: remove rotated side labels (`Photographer / ETE Student`, `2026 — Portfolio`), remove `/ 01` and `Yashica · 38mm` overlays on the portrait, remove the `2026` label in the bottom row, remove the `—` dash before the intro.
- Explore section: remove the `01`, `02`, `03`, `04` prefixes and the "01 — Frames & stories" meta strings next to each link. Keep just the section name + arrow.
- Rename the section heading from "Explore" (with "Index" eyebrow) to a cleaner "Selected work" with no eyebrow tag.

### 3. Aesthetic + professional polish

Small, focused refinements — no palette change (keep Paper & Ink monochrome the user approved):

- Tighten the hero: replace giant "Hello" with a more professional composition — a smaller wordmark `Md. Tazbid Sikder` (display font) as the H1, with a one-line role tag `Electronics & Telecommunication Engineering · CUET  /  Photographer` underneath, then the intro paragraph. This keeps the editorial feel without the shouty "Hello".
- Stats bar stays but loses the `+` superscript styling clutter — cleaner numerals with hairline dividers between items.
- Portrait frame: remove the mix-blend-difference labels; keep the image quiet.
- Header: add the user's name as the wordmark instead of the generic "Portfolio".
- Footer: replace "Built with curiosity, circuits, and light." with a shorter, more professional tagline and the socials row.

### 4. Metadata

- Update `__root.tsx` and `index.tsx` head titles from generic "Portfolio —" to `Md. Tazbid Sikder — ETE, CUET & Photographer`.

## Files touched

- `src/routes/index.tsx` — hero + explore rewrite
- `src/components/Footer.tsx` — socials row + tagline
- `src/components/Header.tsx` — wordmark = name
- `src/routes/blog.tsx` — social links surfaced
- `src/routes/__root.tsx` — site title/description

## Not changing

- Color palette, typography, split-screen layout, mobile full-bleed hero structure, gallery page.

Confirm your name spelling — I'll use **Md. Tazbid Sikder** based on your LinkedIn. Say the word and I'll build.