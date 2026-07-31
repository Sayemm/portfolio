# mofakh.com

Portfolio and learning notebook for Mofakh Islam. Next.js (App Router) + Tailwind + MDX, built to the *Modernist* design system.

```bash
npm run dev
```

## Writing a note

Create `content/<topic>/<slug>.mdx`. The file path is the URL: `/notes/<topic>/<slug>`.

```yaml
---
title: "Value types vs reference types"
date: 2026-07-18        # written notes only
status: written         # written | outline
minutes: 8              # written notes only
order: 1                # position within the topic; drives prev/next
lead: "The difference is not 'stack vs heap'..."
outline:                # outline notes only
  - "First thing to cover"
---
```

Everything else is derived at build time — topic counts, the recent-notes list, the sidebar, and the on-this-page outline (from the `##` headings). Nothing is hand-maintained.

Body content is plain MDX. Two conventions beyond markdown:

- Fenced code blocks get the chrome and copy button automatically; the fence language sets the header label.
- `<NoteToSelf>…</NoteToSelf>` renders the accent-bordered callout.

Notes with `status: outline` ignore the body and render the "Note to self" placeholder plus the `outline` bullets, so a stub is never an empty page.

Topics live in `content/topics.ts` (id, name, blurb, order). Profile copy lives in `content/profile.ts`.

## Design system

Tokens are in `app/globals.css` under `@theme` — colours, the Archivo/IBM Plex Mono pairing, and the two breakpoints the layout needs (`rail` 820px, `wide` 1100px). Border radius is zero everywhere on purpose. Code highlighting uses a Shiki theme built from the system's palette in `lib/shiki-modernist.ts`.
