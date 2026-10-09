# Nexora Media — Creative Portfolio

This repository contains the source code for the Nexora Media website, a premium creative portfolio built for modern digital performance.

## Technology Stack
- **Framework:** React 18 + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + Vanilla CSS Custom Properties
- **Motion:** GSAP (ScrollTrigger) + Motion for React
- **UI Primitives:** Radix UI (Accessible Accordion & Dialog)
- **Forms:** Web3Forms API
- **Deployment:** GitHub Pages via GitHub Actions

## Local Development

1. Ensure you have Node.js 22+ installed.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

## Design System

The site uses a strict, typographic design system centered around editorial restraint:

- **Typefaces:** Clash Display (Headings) and General Sans (Body/UI), served via Fontshare CDN.
- **Palette:** 
  - Light: Warm off-white background (`#F6F5F1`), charcoal ink (`#181817`).
  - Dark: Deep background (`#0B0B0C`), off-white ink (`#F3F0E9`).
  - Accent: Electric vermilion (`#F05A3C`) used sparingly for interactions.
- **Theme:** Fully supports system preference (`prefers-color-scheme`) and manual overrides via `localStorage`.

## Deployment

This project uses a GitHub Actions workflow (`.github/workflows/deploy.yml`) to automatically build and deploy the site to the `gh-pages` branch upon every push to `main`.

### Custom Domain
The site is hosted at `https://nexoramediain.in/`.
- The `CNAME` file is located in `public/CNAME` and will automatically be copied to `dist/` during the build process.
- **Vite config:** The `base` is correctly set to `/` in `vite.config.ts` to accommodate the custom domain.

## SEO & Accessibility

- **Metadata:** Comprehensive Open Graph, Twitter Cards, and JSON-LD structured data configured in `index.html`.
- **Accessibility:** All interactions feature focus-trapping, ARIA labels, semantic HTML5, and full keyboard navigability (WCAG 2.2 AA target).
- **Reduced Motion:** Fully respects `prefers-reduced-motion: reduce`, disabling heavy GSAP parallax and ticker animations in favour of clean CSS opacity transitions.
