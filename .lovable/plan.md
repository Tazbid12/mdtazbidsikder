# Plan: Global spider-web + homepage polish

## 1. Make the spider web global and more alive

- Move `SpiderWeb` out of `src/routes/index.tsx` and mount it once in `src/routes/__root.tsx` as a `fixed inset-0 -z-0` layer, so it renders behind every page (home, photography, skills, labs, blog).
- Bump visibility and motion:
  - Increase `density` (~2–2.5×) and slightly increase `linkDistance` so the web reads clearly on both phone and desktop.
  - Increase node radius and link/node alpha so lines are visible against `#F8F8F8`.
  - Increase mouse influence radius + pull strength on desktop.
  - Increase gyroscope multiplier on mobile (bigger parallax shift per degree of tilt) and lower the "natural hold" offset so small tilts already move the field.
- Keep the canvas `pointer-events-none` so it never blocks clicks.
- Retire the standalone `MouseFollower` on all routes (spider web now owns the mouse interaction globally); remove its mount from `__root.tsx`.

## 2. Let the animation show through the UI

- On the homepage tiles: drop the heavy `bg-white/70 backdrop-blur-md` in favor of a lighter translucent surface (e.g. `bg-white/40` + `backdrop-blur-sm`, thinner border) so the web is clearly visible behind text and tiles on mobile and desktop.
- Apply the same lighter tile treatment to Skills, Labs, Photography, and Blog cards/sections so the global web reads through those pages too.
- Header/Footer: give them a translucent background (`bg-[#F8F8F8]/70 backdrop-blur`) so the web animates behind them instead of being masked by solid bars.

## 3. Bring the portrait back on the homepage

- Restore the portrait visibly on both mobile and desktop:
  - Desktop: promote the small avatar in the intro tile into a proper portrait block (grayscale, rounded, sized to the intro column) — remove the `hidden md:block` gate.
  - Mobile: add a compact circular portrait next to the name/role inside the intro tile, so it's visible in the zero-scroll layout without breaking the grid.
- Keep using `portraitAsset.url` from `src/assets/portrait.jpg.asset.json`.

## 4. Fix desktop overflow / alignment on the homepage grid

- Constrain the intro heading with a sensible `max-w` and slightly smaller `clamp()` upper bound so "Building systems & capturing quiet frames." never spills past its tile at wide desktop widths.
- Ensure every tile uses `min-w-0` on flex/grid text containers and `shrink-0` on icons/portraits (per the responsive-layout rule) so nothing pushes out of its tile.
- Verify the 12-col / 6-row grid math still adds up on `md+` after adding the portrait block; adjust column/row spans if the intro tile needs more room for the portrait.
- Re-check tiles on `sm` (single column) to keep the zero-scroll promise: content stays inside `100svh - header`.

## 5. Verification pass

- Typecheck / build after edits.
- Drive Playwright against `http://localhost:8080` at desktop (1280×1800) and mobile (`iPhone 13` viewport):
  - Screenshot `/`, `/skills`, `/labs`, `/photography`, `/blog`.
  - Confirm: web visible on all routes, portrait visible on `/`, no text overflow on desktop, everything fits within one viewport on `/`.
  - Check console for errors.

## Technical notes

- Files touched: `src/routes/__root.tsx`, `src/components/SpiderWeb.tsx`, `src/routes/index.tsx`, `src/routes/{skills,labs,photography,blog}.tsx` (tile surface tweaks only), `src/components/Header.tsx`, `src/components/Footer.tsx`.
- No functionality/data changes — presentation and motion only.

## Open question

You said "Anything else?" — one thing worth deciding: on `/photography`, the gallery images are opaque by design. Do you want the web to still show in the page margins/background (my current plan), or should photography stay web-free so images dominate?

&nbsp;

U can blur the web a bit there , 

&nbsp;

But for other pages I want people to notice the movement, density of the web and their movements 