# Jayaka Cinnamon — Website Rebuild

A premium, cinematic, scroll-driven website for Jayaka Ceylon Cinnamon,
built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Framer
Motion, GSAP/ScrollTrigger, and Lenis.

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. Production build:

```bash
npm run build
npm run start
```

Both `npm run build` and `npm run lint` are verified clean in this
delivery (zero TypeScript errors, zero ESLint errors, all 5 routes plus
`/sitemap.xml` and `/robots.txt` statically generated).

## Pages

| Route | File |
| --- | --- |
| Home | `src/app/page.tsx` |
| Our Story | `src/app/our-story/page.tsx` |
| Products | `src/app/products/page.tsx` |
| Ceylon Cinnamon | `src/app/ceylon-cinnamon/page.tsx` |
| Contact | `src/app/contact/page.tsx` |

## The cinematic hero — how to drop in the final render

`src/components/hero/CinnamonScrollHero.tsx` owns a single GSAP
`ScrollTrigger` (pinned, scrubbed 0→1 across a 400vh section) and pushes
that progress into whichever visual layer is mounted. Today it renders
**`CinnamonStickRig`**, a CSS-built placeholder that reproduces the
brief's exact choreography (three sticks converge → two roll fully out
of frame → the remaining stick becomes a 3D showcase → rotates upright
→ floats) using real transforms, never fades or teleports.

When the externally generated animation is ready, swap it in without
touching the hero's structure:

```tsx
// Video (10–11s render, e.g. exported as /public/video/hero.mp4)
<CinnamonScrollHero videoSrc="/video/hero.mp4" />

// or an image sequence
<CinnamonScrollHero frames={Array.from(
  { length: 240 },
  (_, i) => `/frames/hero_${String(i).padStart(4, "0")}.webp`
)} />
```

Both `HeroVideo` and `HeroCanvas` (in the same folder) already implement
the `HeroVisualHandle` interface (`onProgress(progress: number)`) that
the hero calls on every scroll tick — that's the entire contract a
replacement visual layer needs to satisfy.

## Data — nothing invented

`src/data/products.ts` and `src/data/company.ts` hold every product
grade, spec, and company/contact fact used across the site, sourced from
Jayaka's existing published materials (jayakacinnamon.lk). Certifications,
figures and testimonials are only included where the source explicitly
states them — no invented specs, stats, or claims. Update these two
files and the whole site (nav, cards, catalogue, journey, footer) stays
in sync.

## Placeholder imagery

No product photography or the final hero render were supplied with this
brief, so:

- `src/components/products/ProductVisual.tsx` renders a tasteful
  category-specific gradient study in place of a photo.
- The hero uses the CSS stick rig described above.

Swap `ProductVisual` for a plain `next/image` once photography exists —
`RangeCard` and `ProductCatalogue` already read `product.image` from
the data file, so only that one component needs to change.

## Motion & accessibility

- All scroll-driven components (`CinnamonScrollHero`, `ScrollStatement`,
  `CinnamonJourney`) check `prefers-reduced-motion` via
  `useReducedMotion()` and fall back to simple static/fade states —
  scrubbed pins and physical motion are skipped entirely.
- Lenis is wired into GSAP's ticker in
  `src/components/layout/SmoothScrollProvider.tsx`, and disables itself
  under reduced motion so native scrolling takes over.
- Focus states are visible everywhere via a shared `:focus-visible` rule
  in `globals.css`.

## Typography

Plus Jakarta Sans is self-hosted via `@fontsource-variable/plus-jakarta-sans`
(SIL Open Font License) rather than fetched from Google Fonts at build
time — this keeps `npm run build` fully offline-capable and avoids a
runtime dependency on fonts.googleapis.com. If you'd rather use Next's
Google Fonts integration in an environment with internet access at build
time, swap the import in `src/app/layout.tsx` for `next/font/google`.

## Logo

Both the navbar and footer render `<Logo />` (`src/components/ui/Logo.tsx`),
which loads `/logo/jayakalogo.png`. **Add your logo file at
`public/logo/jayakalogo.png`** — see `public/logo/README.md` for sizing
notes and a dark-background variant option for the footer. Until that
file exists, both spots automatically show a "JAYAKA CINNAMON" text
fallback (no broken-image icon) — `Logo.tsx` catches the load error
client-side, so nothing needs to change in code once you add the file.

## Hero video

The hero's cinematic visual is the video you generated
(`jayakavideo.mp4`), extracted frame-by-frame into
`public/video/frames/hero_0000.webp` … `hero_0168.webp` (169 frames,
1600×900 WebP, sharpened and lightly contrast/saturation-boosted on
extraction, ~3.8MB total) and scrubbed via `HeroCanvas`
(`src/components/hero/HeroCanvas.tsx`) — each scroll position maps
directly to a specific frame, drawn to a canvas. This was used instead
of embedding the video file directly for two reasons: the source is
HEVC/10-bit, which most browsers besides Safari can't play at all, and
frame-indexed canvas drawing gives frame-perfect scroll scrubbing with
no seek latency, which `video.currentTime` scrubbing can't reliably
guarantee across devices.

The hero carries **two** text overlays through the same pinned scroll
sequence — "THE ESSENCE OF CEYLON" fades out over the first 30% of
scroll, then "FROM CEYLON. CRAFTED FOR THE WORLD." fades in between
72–90% (timed to when the stick visibly turns upright in the footage),
holding through to the pin's release. Both live in
`CinnamonScrollHero.tsx`; there's no separate transition section
anymore, so the Range section picks up immediately once the pin lets
go — no gap, no leftover animation. Under `prefers-reduced-motion`, the
closing line renders as a plain static block right after the hero
instead of a scroll-synced fade (there's no scroll sequence to sync it
to in that mode).

The closing line also assembles itself character-by-character as it
fades in — each letter starts offset from its line's center (in
proportion to its own distance from center) and settles into place as
the same `fadeIn` value drives both the opacity and the convergence.
This is adapted from a per-character scroll-text technique, but driven
by the hero's existing single `ScrollTrigger` (via plain `gsap.set` on
each character's ref) rather than a second independent scroll listener,
so it stays perfectly in sync with the timing above and doesn't add a
competing scroll system. The offsets scale down automatically below
640px.

`src/components/hero/hero-video-config.ts` is the single source of
truth for the frame count/paths. To swap in a different render later,
replace the files in `public/video/frames/` (same naming) and update
`HERO_FRAME_COUNT`, or pass a `frames` prop directly to
`<CinnamonScrollHero />`. `HeroVideo.tsx` (video.currentTime scrubbing)
is still there too, if you'd rather use a single MP4 file — pass
`videoSrc="..."` instead.

## Navbar transparency over the hero

The navbar stays fully transparent for as long as any part of the hero
(`id="hero-section"`) is still on screen — not just the first 48px of
scroll — checked via `getBoundingClientRect()` against the hero element
on every scroll tick in `Navbar.tsx`. It falls back to the original
48px-based behavior on pages without a hero. If you rename or restructure
the hero, keep that `id` (or update the lookup in `Navbar.tsx`).

## Social icons

`src/components/ui/social-icons.tsx` has real Facebook/Instagram/TikTok
glyphs (path data sourced from simple-icons, CC0-licensed — see the
comment at the top of that file) wrapped in a custom button with a
hover glow + spring micro-interaction, in `dark` (footer) and `light`
(Contact page) variants. `simple-icons` itself isn't a runtime
dependency — the paths were extracted once and inlined.

## Range section (CardStack)

`src/components/ui/card-stack.tsx` is a generic fan/stack carousel
primitive adapted from the source you provided (dark-mode variants and
the local `cn()` helper removed in favor of the site's own; drag-end
handler properly typed). `src/components/products/RangeCardStack.tsx`
configures it with real product data and sizing that's computed from
the section's *measured* width (via `useContainerSize`) rather than
fixed breakpoints, so cards never risk overflowing on narrow phones.

## Cinnamon Journey — desktop vs. mobile

This section now has two genuinely different implementations rather
than one layout straining to fit every screen size:

- `CinnamonJourneyDesktop.tsx` (≥640px) — the pinned, scroll-drawn
  winding path, unchanged in concept from before.
- `CinnamonJourneyMobile.tsx` (<640px) — a plain vertical timeline in
  normal document flow. Each connecting line segment is a flex child
  stretching to fill exactly the gap between its two dots, so however
  tall any one stage's text runs, it can't overlap its neighbors.

`CinnamonJourney.tsx` picks between them via `useMediaQuery`.


## Structure

```
src/
  app/                 routes (home, our-story, products, ceylon-cinnamon, contact)
  components/
    navigation/        Navbar, MobileMenu
    hero/               CinnamonScrollHero + swappable visual layers
    products/           RangeCardStack (Range section), ProductCatalogue
    animations/         ScrollStatement
    cinnamon/            CinnamonJourney, CeylonComparison
    story/               StoryTimeline, QualityReach, Testimonials, CTAs
    contact/             QuoteForm (React Hook Form + Zod)
    layout/              Footer, SmoothScrollProvider
  data/                products.ts, company.ts — single source of truth
  hooks/               useReducedMotion
  lib/                 animation helpers, cn(), Zod schema
```

## Wiring the quote form to a real backend

`QuoteForm` validates with Zod and currently simulates a submit (see the
comment in `src/components/contact/QuoteForm.tsx`). Replace the
`onSubmit` body with a call to your inquiry endpoint, email service, or
CRM webhook — the validated `QuoteFormValues` object is ready to send
as-is.
