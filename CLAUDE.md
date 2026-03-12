# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 16 website with TypeScript, using the App Router and React 19.

## Commands

```
npm run dev      # Start development server (Turbopack)
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint via eslint-config-next
```

## Architecture

- **App Router**: Pages live in `src/app/`. Each route is a directory with a `page.tsx`. Layouts use `layout.tsx`.
- **Path alias**: `@/*` maps to `./src/*` (configured in tsconfig.json).
- **Static assets**: Place files in `public/` — served at the root path.
- **ESLint**: Flat config in `eslint.config.mjs` using `eslint-config-next` directly (no FlatCompat wrapper).
- **Strict TypeScript**: `strict: true` in tsconfig.json.
