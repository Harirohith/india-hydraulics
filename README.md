# India Hydraulics — Marketing Site

A five-page brochure / catalog site for India Hydraulics, a Tiruchengode-based
hydraulic systems manufacturer (founded 1996). Light theme with white + blue,
real technical content from the client brief.

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** for utilities, with a proper token layer (`app/globals.css` +
  `tailwind.config.ts`)
- **next/font** for self-hosted `Space Grotesk`, `Inter Tight`, `JetBrains Mono`
  (no Google Fonts link)
- **Static generation** (SSG) for all five pages
- Deployable to Vercel as-is

## Pages

| Route | File | Purpose |
| --- | --- | --- |
| `/` | `app/page.tsx` | Hero, capabilities, featured categories, hose cross-section, industries strip, positioning |
| `/about` | `app/about/page.tsx` | Story, mission & vision, founder-year note, facilities, standards |
| `/products` | `app/products/page.tsx` | All 9 product categories with spec bullets per category |
| `/industries` | `app/industries/page.tsx` | 10 segments served |
| `/contact` | `app/contact/page.tsx` | Phone, email, two locations, Google Maps embeds, enquiry form |

## Design tokens

All visual decisions are sourced from `app/globals.css` and `tailwind.config.ts`.

| Token | Value | Purpose |
| --- | --- | --- |
| `--surface-0` | `#F8FAFC` | Page base (soft white) |
| `--surface-1` | `#F1F5F9` | Section alternation (pale blue-gray) |
| `--surface-2` | `#FFFFFF` | Cards, raised surfaces (pure white) |
| `--surface-3` | `#EFF6FF` | Elevated / hover state (blue tint) |
| `--hairline` | `#E2E8F0` | Dividers (light steel) |
| `--brand` | `#2563EB` | Cobalt blue — primary accent for CTAs, links, active states |
| `--accent` | `#0891B2` | Teal blue — small highlights, badges, data points (use sparingly) |
| `--ease-mech-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Mechanical ease-out — primary motion curve |
| `--ease-ram` | `cubic-bezier(0.23, 1, 0.32, 1)` | For the "hydraulic ram extending" line motif on hover |
| `--dur-press` | `160ms` | Tactile button feedback |
| `--dur-hover` | `180ms` | Color / border transitions |
| `--dur-enter` | `220ms` | Page enter transitions |

**Shape lock:** every container is sharp (`border-radius: 0`) except a single
pill used on the small `.placeholder-badge`. No rounded card corners —
engineering aesthetic.

**Type scale:** `micro / caption / body / lead / h6 → h1 / display`. Heading
size uses Space Grotesk with negative tracking; body uses Inter Tight; mono
(JetBrains Mono) is reserved for spec values, units, standards codes, section
numbers.

**Motion:** short (150–250ms), mechanical curves, no bounce/elastic easing.
`prefers-reduced-motion` collapses all transitions to ~0ms (see base CSS).

## Placeholder assets to swap

The site currently uses schematic SVG illustrations instead of stock
photography. When the client supplies real assets, swap the following:

| Slot | Current | Replace with |
| --- | --- | --- |
| Logo | `components/LogoMark.tsx` (inline SVG) | Client-supplied logo file (`logo.svg` or `logo.png`) |
| Hero illustration | `components/SchematicCircuit.tsx` (open hydraulic circuit schematic) | Real product / facility photography |
| Hose cross-section | `components/HoseCrossSection.tsx` | Real cross-section photo, or kept as-is (it is on-brand) |
| Map embeds | OpenStreetMap embed via query string | Google Maps / client-supplied iframe URLs |
| Email | `enquiry@indiahydraulics.example` (placeholder) | Real enquiry email |
| Contact form submit | `app/contact/ContactForm.tsx` stubs the POST with a `setTimeout` | Wire to backend / email service (`// TODO: wire to backend/email service`) |

Each asset slot is marked with the badge `// PLACEHOLDER` in the code or a
visible `<span class="placeholder-badge">Placeholder</span>` in the UI.

## Founder-year discrepancy

The About page surfaces a flag: an older archived page listed the founding
year as **1991** with founders **Ramasamy & Moorthy**; the current LinkedIn
listing says **1996**. This site defaults to **1996** per the brief; the
client should confirm before launch.

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve production build
npm run lint     # next lint
```

## Performance & a11y notes

- All marketing pages are statically generated (`force-static` via App Router
  defaults — no runtime server work).
- No client-side JS on the About / Products / Industries pages beyond `next/font`.
- The Contact form is the only client island (`"use client"` at the top of
  `ContactForm.tsx`).
- `prefers-reduced-motion` is honored globally.
- Color tokens are checked against WCAG AA against the graphite base.
- The OpenStreetMap embeds are lazy-loaded via `<iframe loading="lazy">`.

## Project structure

```
app/
  layout.tsx               # root layout: fonts, Nav, Footer, skip-link
  globals.css              # design tokens + base + utilities
  page.tsx                 # Home
  about/page.tsx
  products/page.tsx
  industries/page.tsx
  contact/
    page.tsx               # server
    ContactForm.tsx        # client
components/
  Nav.tsx                  # client (uses pathname)
  Footer.tsx
  LogoMark.tsx
  SchematicCircuit.tsx
  HoseCrossSection.tsx
  SectionHead.tsx
lib/
  content.ts               # all real content lives here
tailwind.config.ts
postcss.config.js
next.config.mjs
tsconfig.json
package.json
```
