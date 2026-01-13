# Randus

<p align="center">
  <img src="public/randus-text.svg" alt="Randus logo" />
</p>

A straightforward and fancy group randomizer built with Next.js. Add members, choose how to split them, and export the resulting board as an image.

## Features

- Two grouping modes: split by a chosen number of groups or by marked leaders.
- Leader designation per member with round-robin leader assignment.
- Optional gender balance that targets overall gender ratio across groups.
- Member list table with multi-select and bulk delete.
- Single add or bulk add via separators (comma, space, semicolon, pipe).
- Editable board title with smooth scroll to results after randomize.
- Animated group cards and item reveal for visual clarity.
- Export the board to PNG, JPEG, or SVG with auto-incremented filenames.
- Theme toggle (light/dark blurple variants).
- English and Indonesian UI text.
- Local storage persistence for members and export index.

## Tech Stack

- Next.js 15 (Pages Router) + React 19 + TypeScript
- Tailwind CSS + HeroUI
- Framer Motion animations
- React Hook Form + Zod validation
- html-to-image export

## Getting Started

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Scripts

- `npm run dev` - Start Next.js dev server (Turbopack).
- `npm run build` - Build for production.
- `npm run start` - Start production server.
- `npm run lint` - Run ESLint.

## Project Structure

- `src/pages/index.tsx` - Main UI and user flows.
- `src/utils/randomizeGroups.ts` - Grouping and balancing logic.
- `src/hooks/useRandomizer.ts` - Randomization state and error handling.
- `src/contexts/TranslationContext.tsx` - Localization state.
- `src/locales/*.json` - Language strings.
- `src/components` - UI building blocks (navbar, theme, export, etc).

## Notes

- Theme names are defined in `tailwind.config.js` (`blurple-dark`, `blurple-light`).
- Export uses `html-to-image` and targets the board container.

## License

MIT. See `LICENSE`.
