Plan: Minimal-creative portfolio for an Electronics & Telecommunication Engineering student + photographer.

Visual direction

- Palette: Paper & Ink (#f5f3ee, #e8e4dd, #2d2d2d, #0d0d0d). Light, editorial, high contrast.
- Typography: Space Grotesk (headings) + DM Sans (body). Clean engineering-meets-editorial feel.
- Layout: Split-screen hero on the overview page, full-width content bands inside each section route.
- Motion: Ambient blurred shapes that follow the mouse on desktop, subtle fade/scale page transitions, staggered reveals for text and cards.

Site structure (TanStack Start file routes)

- / — Overview / landing
- /photography — Photo gallery / showcase
- /skills — Engineering & creative skills
- /labs — Sessional lab progress / experiments
- /blog — Blog / notes
- Shared shell in \_\_root.tsx contains the persistent header/nav and mouse-following background layer.

Key interactions

- Overview page shows a short intro + tab-like links to each section. Clicking a tab navigates to its route with a smooth page transition.
- Mouse-following background: small, soft, blurred SVG/gradient orbs that lag behind cursor movement on pointer devices; disabled or simplified on touch.
- Transitions: route-level fade/slide wrapper around &nbsp;.
- Scroll-triggered fade-in for section content.

Content per route

- Overview: split-screen hero — left: name, tagline, quick bio; right: a featured photograph or abstract visual. Below: tab cards for Photography, Skills, Labs, Blog.
- Photography: masonry or bento grid of photo categories / selected shots. Lazy-loaded images, light hover scale.
- Skills: two-column list of engineering skills (hardware, telecom, programming) and creative skills (photography, editing, design).
- Labs: timeline or card list of sessional lab work, with status tags and short descriptions.
- Blog: list of posts with dates and excerpts; each post can open to a detail view if content exists.

Technical notes

- Use Tailwind v4 semantic tokens; add Paper & Ink values to :root and .dark.
- Load Space Grotesk and DM Sans via @fontsource packages.
- Implement mouse-follower as a client-only React component using requestAnimationFrame, with pointer/touch detection.
- Use Framer Motion for route transitions and scroll reveals.
- Images: generate a small set of hero/photography placeholders from prompts, saved under src/assets/.
- SEO: each route gets its own head() with title, description, og:title, og:description.

Build steps

1. Set up design tokens and fonts.
2. Build shared shell, header, and mouse-follower background.
3. Build route transition wrapper.
4. Create all route files and page components.
5. Generate image assets.
6. Add animations and polish.
7. Verify build, navigation, and responsive behavior.

Open questions

- Do you want a dark mode toggle, or Paper & Ink in light mode only? U can do toggle one for dark mode
- Should the blog link to external posts (e.g. Medium) or host posts inside the app? Yes u can add option to link my posts from fb/linkdin
- Do you have specific photos you want to use, or should I generate placeholder photography images? I have specific photoz
- Any engineering/photography project names or lab course titles you want mentioned? Yes I have some.. electronics lab , communication lab
