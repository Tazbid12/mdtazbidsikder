## Fixes & Polish Pass

### 1. Spider web coverage & density

Currently the canvas sits inside a `fixed inset-0` div that's 100vw × 100vh, so when the phone tilts, the field visibly shifts and reveals empty edges (tilt moves particles by up to ~96px but they only spawn within the visible rect).

- In `SpiderWeb.tsx`, spawn particles across an oversized virtual field (viewport + generous margin on all sides, e.g. `+240px` each side) so tilt/mouse displacement never exposes empty edges.
- Bump default `density` from `0.00028` → ~`0.00042` and raise the particle cap from 220 → ~340 for a fuller mesh.
- Slightly raise `linkDistance` and keep link alpha as-is, so the web reads denser without becoming visually noisy.
- Recompute the field & particle count on resize.
- Increase the sensitivity when user touches the screen and how it reacts
- Compatible for every size of devices 

### 2. Dark mode: make it actually work + invert the web

- The theme toggle exists but no page/tile uses theme tokens — everything is hard-coded to `#F8F8F8`, `#222222`, `bg-white/…`. In dark mode those don't change, so the UI looks identical.
- Replace the hard-coded palette on the homepage tiles, header, footer, labs/skills/blog/photography pages with the existing semantic tokens (`bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-card/60`) so the `.dark` class actually flips colors.
- Global background wrapper in `__root.tsx`: swap the fixed `bg-[#F8F8F8]` for `bg-background`.
- `SpiderWeb`: accept theme-aware color. In `__root.tsx`, read `useTheme()` and pass `color="#FFFFFF"` (with adjusted alphas) when `theme === "dark"`, `#222222` when light. Web nodes/links invert cleanly.
- Verify the theme toggle button in the header is wired to `toggleTheme` and visible on both mobile & desktop; fix if broken.

### 3. Labs page — text visible over the web

Right now the labs list uses only `divide-y` and `border-t` on a transparent background, so the spider web renders through the text on the tight rows and hurts legibility.

- Wrap each lab row in a tile-style container: `rounded-xl border border-border bg-card/70 backdrop-blur-sm` with a small gap between rows instead of hairline dividers.
- Expanded panel gets the same card background so objective/tools/tags stay readable.
- Same treatment for the page header block (intro text) — put it in a soft card so it stands off the animated bg.
- The fonts and their size how they are organized should be compatible for every type or size of devices, specially no words can't get out of the box

### 4. Full site QA pass (cross-check)

Bug-sweep the other pages and apply the same "readable card behind text" + theme-token cleanup:

- **Skills** (`skills.tsx`): confirm bento cards use `bg-card/70 backdrop-blur-sm` + `border-border`; fix any hard-coded hex.
- **Photography** (`photography.tsx`): sticky filter bar needs `bg-background/80 backdrop-blur` so it doesn't blend into the web when scrolling; captions on a subtle card.
- **Blog** (`blog.tsx`): social channel cards → tokenized surface.
- **Header** (`Header.tsx`): translucent card surface + `text-foreground`; theme toggle icon swaps sun/moon.
- **Footer** (`Footer.tsx`): tokenized.
- **Homepage tiles**: swap `bg-white/45` → `bg-card/60`, `text-[#222222]` → `text-foreground`, `text-[#7B7B7B]` → `text-muted-foreground`, `border-[#7B7B7B]/25` → `border-border`. Portrait ring uses `border-border`.
- Meta strip / stats: same token pass.
- Check that the homepage still fits in one viewport on mobile after the changes — no regressions to the zero-scroll layout.
- Confirm `AnimatePresence` route transitions still work and no `key` warnings appear.
- Verify no unresolved imports; run typecheck-friendly edits only.

### Deliverable

After this pass:

- Spider web fills the whole screen even at max tilt, and looks denser.
- Toggling dark mode flips background, text, tiles, and inverts web color from `#222` → `#FFF`.
- Labs (and every other page) has clearly legible text with the web sitting tastefully behind cards, not through the letters.
- Consistent semantic tokens across the site so future theme tweaks are one file.

### Technical notes

- Files touched: `src/components/SpiderWeb.tsx`, `src/components/ThemeProvider.tsx` (only if a bug found), `src/components/Header.tsx`, `src/components/Footer.tsx`, `src/routes/__root.tsx`, `src/routes/index.tsx`, `src/routes/labs.tsx`, `src/routes/skills.tsx`, `src/routes/photography.tsx`, `src/routes/blog.tsx`.
- No new dependencies. Pure presentation/theming changes; no server logic touched.