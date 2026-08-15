# Logo asset

Place your logo file here, named exactly:

    jayakalogo.png

Full path from the project root:

    public/logo/jayakalogo.png

`src/components/ui/Logo.tsx` references it by that exact path (`/logo/jayakalogo.png`).
No other code changes are needed — the Navbar and Footer both already import
and use `<Logo />`, so dropping the file here is the only step.

## Recommended file

- PNG with a transparent background.
- Roughly landscape/wordmark-shaped (the component's bounding box defaults
  to about 150×36px in the navbar, 170×40px in the footer). A tall/square
  mark will still render correctly (it's scaled with `object-contain`, so
  it never stretches) but will appear smaller within that box — see
  `src/components/ui/Logo.tsx` to widen the box if your mark is more square.
- At least 2x the display size (e.g. ~340×80px) so it stays sharp on
  retina screens.

## If your logo is dark-colored

The footer has a dark cocoa background. If your PNG is a dark/black mark
that won't read well there, either:
1. export a second, light/white version and swap the `src` used inside
   the footer's `<Logo />` call, or
2. pass `imgClassName="invert"` to the footer's `<Logo />` (in
   `src/components/layout/Footer.tsx`) to flip it for that dark background —
   only do this if the mark is a single flat color, since `invert` will
   distort multi-color logos.

## Fallback behavior

Until this file exists, both the navbar and footer automatically fall
back to the "JAYAKA CINNAMON" text wordmark (no broken-image icon) —
`Logo.tsx` catches the image load error. Once you add the real file,
it takes over automatically; no code change needed.
