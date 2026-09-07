# Renolicious — Full-Stack Roblox Developer

Refinement of https://ilesdmm.github.io/, using its original Next.js/React source, black/red palette, project content, and UI/GFX assets.

## Edit portfolio content

`app/portfolio-config.ts` is the central configuration:

- `YEARS_EXPERIENCE`: experience, currently `3+`.
- `DAILY_AVAILABILITY`: active-project availability, currently `16+ Hrs/Day`.
- `CLIENT_WORK_VALUE`: commissions/client work earned in the past two weeks. Currently `$2,000`.
- `PROJECT_COUNT`: projects completed this month. Currently `8+`.
- `DISCORD_USERNAME`: contact username.
- `capabilities`: grouped services.
- `testimonials`: real quotes, attribution, and project. Empty by default; section is hidden.

The stats include the time periods in their labels so they can be updated without ambiguity. The 14 showcased systems are counted separately from completed client projects.

`app/portfolio-projects.ts` holds all project descriptions, video IDs, titles, and UI/GFX gallery entries. Replacement videos use the exact YouTube titles verified via oEmbed:
- AI AGGRO & ZONE DETECTION SYSTEM — xkzckJU9c6g
- ROUND & ROLE SYSTEM — h4Un0kK6uOg

Player Movement System was removed. The separate Dynamic Movement System remains.

## Development and checks

Requires Node 22.13+.

```sh
npm ci
npm run dev
npm run lint
npm run typecheck
npm test
```

`npm run build` and `npm run pages:build` both generate the Next.js static export in `out/`. `npm test` builds and checks exported content, retained local assets, navigation targets, removal, demo IDs, and placeholder handling. Dev/build scripts are now Windows-compatible. No new dependencies were added.

## Deployment

The existing `.github/workflows/deploy.yml` (or equivalent workflow filename in `.github/workflows/`) publishes `out/` to GitHub Pages when these changes are pushed to `main`. This workspace was recovered from the public repository; no changes have been pushed to that repository.

`.openai/hosting.json` identifies the separate private Sites review deployment.

## Change summary

- `app/page.tsx`: stronger hero, project-first order, expanded capability/why-hire sections, hidden real-feedback section, contact CTA; accessible native video dialog, resilient clipboard status, reduced-motion/mobile-aware previews.
- `app/globals.css`: preserves red/black display typography; larger lead project, readable card type, responsive grids, hover/focus states, reduced motion.
- `app/portfolio-config.ts`: new single content configuration.
- `app/portfolio-projects.ts`: extracted existing projects, replacement videos, and gallery data.
- `app/layout.tsx`: full-stack SEO positioning.
- `package.json`, `eslint.config.mjs`: portable Next.js commands and working lint/typecheck setup.
- `tests/rendered-html.test.mjs`: exported-page checks.
- `.gitignore`: generated build/cache exclusions.
- `.openai/hosting.json`: private review deployment configuration.
- `README.md`: editing, testing, and deployment instructions.

Content still needed: genuine testimonials. No invented project or testimonial content is included. No payment methods existed in the original source.
