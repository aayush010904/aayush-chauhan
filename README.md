# Premium Portfolio (React + Tailwind)

A multi-page, Spotify-inspired (design language only) recruiter-facing portfolio with a premium dark UI, smooth transitions, reusable components, and data-driven architecture.

## Stack

- React (hooks + functional components)
- React Router
- Tailwind CSS
- Framer Motion
- Vite

## Included Pages

- Home dashboard
- About profile
- Projects album experience + detail pages
- Research playlist experience + detail pages
- Contact page
- ⭐ Other Side of Me page

## Premium Features

- Global smart search across projects and research
- Project tech-stack filters
- Featured highlights
- Structured data arrays for easy updates
- Loading skeleton states
- Microinteractions and hover transitions
- Sticky desktop sidebar + mobile nav + topbar search
- Optional aesthetic playback bar

## Project Structure

- `src/components/layout` — Sidebar, Topbar, PlaybackBar, MobileNav, AppShell
- `src/components/cards` — AlbumCard, PlaylistCard
- `src/components/ui` — GlassCard, TagBadge, SkeletonCard
- `src/components/shared` — Timeline, Gallery, ProficiencyBar, MusicEmbed
- `src/pages` — all route pages + detail pages
- `src/data/portfolioData.js` — centralized placeholder content
- `src/context/SearchContext.jsx` — shared smart-search state

## Run Locally

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

## Notes

- Replace placeholder links, images, and profile data in `src/data/portfolioData.js`.
- This workspace environment currently does not provide Node/npm, so install and build were prepared but not executed here.
