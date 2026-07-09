# Aeonik-style portfolio redesign

Adopting the reference vibe: oversized neo-grotesk display type, tight monochrome palette, big editorial hero portrait, thin dividing rules, vertical side-labels, and a small "Scroll down" cue. Using your uploaded self-portrait as the hero image.

## Visual direction (locked)

- **Palette**: #222222 primary, #7B7B7B secondary, #F8F8F8 tertiary, #FFFFFF. Replaces the current Paper & Ink cream tones with a cleaner grey/white system. Dark-mode variant keeps the same relationships inverted.
- **Typography**: Space Grotesk stays (closest free equivalent to Aeonik — geometric neo-grotesk). Display sizes go much larger (clamp up to ~12rem for "Hello"). DM Sans body stays for support text.
- **Layout language**: thin 1px rules, vertical rotated labels on the left/right ("Photographer / ETE student", year "2026"), tiny uppercase meta labels, oversized numbers with a small `+` superscript for stats.

## Hero redesign (index)

```text
┌─────────────────────────────────────────────────────┐
│ logo  About  Photography  Skills  Labs  Blog   ↗    │
├─────────────────────────────────────────────────────┤
│ │   +200        +50                                 │
│ │   Frames      Labs                                │
│ P                                                   │
│ h    Hello                    [   PORTRAIT   ]      │
│ o    — ETE student &          [   (your     ]      │
│ t    photographer, CUET       [    photo)   ]      │
│ o                              [             ]      │
│ │                              [             ]      │
│ │   2026    Scroll down ↓                           │
└─────────────────────────────────────────────────────┘
```

- Left column: rotated "Photographer" label, stat pair (Frames / Labs), giant "Hello" wordmark, one-line tagline, year + scroll cue at bottom.
- Right column: your camera self-portrait, full-bleed inside a subtle frame, slight desaturation to match monochrome palette (kept as CSS filter — original file untouched).
- Ambient mouse-following blur orbs stay, toned down to soft grey so they don't fight the minimal palette.

## Photography page

- Replace the current 3-col masonry with an **editorial-scroll layout**: full-width feature photo, then alternating two-up / one-up rows with generous whitespace, tiny caption metadata (title · category · year) beneath each, thin rule separators.
- Filter chips (All / Portrait / Street / Nature / Night) across the top — you fill categories when you upload photos.
- Hover: subtle scale + reveal of a longer caption line.

## Other pages (light polish only, same pass)

- Skills / Labs / Blog: adopt the new oversized H1 + thin-rule dividers + rotated section label so the whole site feels consistent. No structural changes.

## Assets

- Upload your self-portrait (`user-uploads://IMG_20260118_150637524_HDR_PORTRAIT.jpg`) via `lovable-assets` and swap it in as the hero image.
- Keep the current AI-generated gallery photos as placeholders until you send yours — I'll wire the swap points clearly.

## Open question

You mentioned "I want to add some of my own things" — happy to include any of: a downloadable CV/resume, a contact block (email + socials), specific project write-ups (e.g. a communication-lab project), or photo captions with camera/lens info. Tell me which and I'll fit them into this same layout.

## Technical notes

- Update `src/styles.css` tokens to the new monochrome oklch values (light + dark).
- Rewrite `src/routes/index.tsx` hero section and `src/routes/photography.tsx` layout.
- Add a `lovable-assets` pointer for the portrait at `src/assets/portrait.jpg.asset.json`.
- Tune `MouseFollower` orb colors to the new palette.
- No new dependencies; no backend changes.
