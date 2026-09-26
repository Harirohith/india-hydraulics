# India Hydraulics — Marketing Site

A five-page brochure and catalogue site for India Hydraulics, Tiruchengode,
Tamil Nadu (est. 1996): hydraulic hoses, crimped hose assemblies,
CNC-machined fittings, adapters, seals and couplings, supplied across India
and for export.

## Stack

- **Next.js 14** (App Router) + TypeScript, statically generated
- **Tailwind CSS** on a token layer (`app/globals.css` + `tailwind.config.ts`)
- **next/font** self-hosting Barlow Condensed (display), IBM Plex Sans (body)
  and IBM Plex Mono (data)
- Deployable to Vercel as-is

## Page flow

Every page tells one story in the order a buyer asks the questions, and ends
by moving them to the next step — the enquiry form (`/contact#enquiry`).

| Route | File | Story |
| --- | --- | --- |
| `/` | `app/page.tsx` + `components/home/` | Who we are → what we supply → how an assembly is built → how quality is controlled → what happens after an enquiry → where it is made → who it is for → enquire |
| `/products` | `app/products/page.tsx` + `components/products/`, `components/ProductSearch.tsx` | The nine product families with spec tables → the searchable catalogue → HSN codes → enquire |
| `/industries` | `app/industries/page.tsx` + `components/industries/` | Key applications → all ten segments and the products each uses → "not listed?" → enquire |
| `/about` | `app/about/page.tsx` + `components/about/` | Story → mission & vision → ISO quality process → the two units → engineering → standards → enquire |
| `/contact` | `app/contact/` + `components/contact/` | Fastest routes (call, WhatsApp) → enquiry form with drawing upload and "what happens next" → locations |

Anchors other pages rely on: `/products#<category id>`, `/products#catalogue`,
`/products#cat-<catalogue slug>`, `/products#hsn`, `/industries#<industry id>`,
`/about#story|quality|facilities|standards`, `/contact#enquiry|locations`.

## Design system — "ink on paper"

An industrial catalogue rather than a SaaS template: condensed headings,
hairline rules, spec tables and part codes, real product photography and
black-and-white industrial photos, square machined edges.

**Rules**

- One brand colour — the logo's indigo — used flat (buttons, links, active
  states, the enquiry band). No gradients, glows, blobs or grid overlays.
- No decorative icons. `components/Icon.tsx` holds control icons only (menu,
  close, search, upload, check, chevrons, contact marks, WhatsApp).
- Square corners (radius capped at 2px), no shadows; structure comes from
  1px rules and the 12-column grid.
- Every fact comes from `lib/content.ts` / `lib/products.ts` — no invented
  numbers, testimonials or client names.

**Tokens** (RGB channels in `:root`, so Tailwind opacity modifiers work)

| Token | Value | Use |
| --- | --- | --- |
| `paper` / `paper-2` / `paper-3` | `#FFFFFF` / `#F5F4F0` / `#EAE8E2` | Page, alternate sections, photo wells |
| `ink` / `ink-2` / `ink-3` | `#121316` / `#3D4047` / `#5E6168` | Headings, body, labels (all AA) |
| `rule` / `rule-2` | `#DEDBD3` / `#BDB9AF` | Hairlines, input borders |
| `carbon` / `fog` / `fog-2` | `#111214` / `#F2F1ED` / `#A7A9AE` | Dark bands and footer, text on them |
| `brand` | `#2D1C80` | Logo indigo — the only accent |
| `signal`, `success`, `whatsapp` | red, green, WhatsApp green | Gauge needle / errors, QC stamp, WhatsApp only |

**Type:** `.t-display` (home hero), `.t-h1`, `.t-h2`, `.t-h3`, `.t-lede`,
`.t-kicker` (short label above a title), `.t-label` (mono spec keys and codes).

**Building blocks:** `btn` + `btn-primary | btn-outline | btn-light |
btn-outline-light | btn-whatsapp`, `.link`, `.link-arrow`, `.rule-grid`,
`.photo-well`, `.photo-bw`, `.spec-table` / `.spec-row`, `.input`, `.stamp`.
Shared components: `PageHero`, `SectionHead`, `CTABand`, `ISOBadge`, `Nav`,
`Footer`, `WhatsAppFloat`.

## Motion — only where it explains something

| Motion | Where | What it explains |
| --- | --- | --- |
| `HoseAnatomy` | Home | An assembly is drawn fitting → hose (the order it is built in), then its five parts are called out |
| `PressureGauge` | Home, About | The needle climbs to the rated 10,000 psi and the QC "passed" stamp lands — the hydrostatic test every assembly gets |
| `OrderFlow` | Home | An order moves enquiry → stock check → machine & crimp → pressure test → despatch |
| `CountUp` | Facts rows | Numbers that prove something count once |
| Load sequence / scroll reveal | All pages | Copy arrives in reading order; each block appears once as it enters view |

Nothing loops. Reveals are hidden only under `html.js` (set by an inline
script before first paint and removed after 3.5s if the app never boots), so
content is never lost without JavaScript. `prefers-reduced-motion` shows
everything immediately.

## Placeholders to replace before launch

| Slot | Current | Replace with |
| --- | --- | --- |
| Email | `enquiry@indiahydraulics.example` (`lib/content.ts`) | Real enquiry address |
| Site URL | `https://indiahydraulics.example` (`app/layout.tsx`) | Real domain |
| Enquiry form submit | `app/contact/ContactForm.tsx` fakes the POST (`// TODO: wire to backend / email service`) | An API route or email service — enquiries are not delivered yet |
| Photography | Own photos in `public/im/` are ~650px wide and shown small | Higher-resolution photos of the shop floor, test bench and products |
| Logo mark | `public/logo-mark.png`, cropped from `public/logo.jpg` | A vector (SVG) logo |

## Founding-year discrepancy

An older archived page listed the founding year as **1991** with founders
**Ramasamy & Moorthy**; the LinkedIn listing says **1996**. The site uses
**1996** (`company.foundedYear`); confirm before launch.

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve production build
npm run lint     # eslint
```

## Project structure

```
app/
  layout.tsx               # fonts, Nav, Footer, WhatsApp shortcut, reveal boot script
  globals.css              # tokens, base, building blocks, motion
  page.tsx                 # Home
  about/page.tsx
  products/page.tsx
  industries/page.tsx
  contact/page.tsx, ContactForm.tsx
components/
  Nav.tsx, Footer.tsx, PageHero.tsx, SectionHead.tsx, CTABand.tsx,
  ISOBadge.tsx, Icon.tsx, WhatsAppFloat.tsx, AnimationObserver.tsx,
  ProductSearch.tsx
  motion/                  # HoseAnatomy, PressureGauge, OrderFlow, CountUp
  home/ about/ products/ industries/ contact/   # page sections
lib/
  content.ts               # company facts, categories, industries, order flow
  products.ts              # catalogue items and HSN codes
  style.ts                 # animation delay helpers
```
