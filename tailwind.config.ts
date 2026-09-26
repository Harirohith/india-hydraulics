import type { Config } from "tailwindcss";

/**
 * India Hydraulics — "catalogue" design system.
 *
 * Ink on paper: near-black type, warm off-white paper, steel-grey rules,
 * carbon-black bands — and ONE brand colour, the indigo of the logo, used
 * flat (buttons, links, the active line). No gradients, no glows.
 *
 * Every colour is an RGB channel triple in app/globals.css, so opacity
 * modifiers work (border-ink/20, bg-carbon/80 …).
 */
const rgb = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: rgb("paper"),     // #FFFFFF page
          2:       rgb("paper-2"),   // #F5F4F0 warm alternate sections
          3:       rgb("paper-3"),   // #EAE8E2 product tiles, wells
        },
        ink: {
          DEFAULT: rgb("ink"),       // #121316 headings / primary text
          2:       rgb("ink-2"),     // #3D4047 body
          3:       rgb("ink-3"),     // #5E6168 labels, captions (AA on paper-3)
        },
        rule: {
          DEFAULT: rgb("rule"),      // #DEDBD3 hairlines
          2:       rgb("rule-2"),    // #BDB9AF stronger lines, input borders
        },
        carbon: {
          DEFAULT: rgb("carbon"),    // #111214 dark bands, footer
          2:       rgb("carbon-2"),  // #1B1C20 panels on carbon
          3:       rgb("carbon-3"),  // #2C2E33 rules on carbon
        },
        fog: {
          DEFAULT: rgb("fog"),       // #F2F1ED text on carbon
          2:       rgb("fog-2"),     // #A7A9AE muted text on carbon (8:1)
        },
        brand: {
          DEFAULT: rgb("brand"),     // #2D1C80 logo indigo
          hover:   rgb("brand-hover"),
          tint:    rgb("brand-tint"),
        },
        signal:   rgb("signal"),     // #D92D20 gauge needle, errors
        success:  rgb("success"),
        whatsapp: rgb("whatsapp"),
      },
      fontFamily: {
        display: ["var(--font-display)", "Arial Narrow", "sans-serif"],
        sans:    ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono:    ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        // Machined edges: square by default, 2px at most on controls.
        none: "0",
        sm: "1px",
        DEFAULT: "2px",
        md: "2px",
        lg: "2px",
        xl: "2px",
        "2xl": "2px",
        "3xl": "2px",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
      letterSpacing: {
        label: "0.08em",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        "250": "250ms",
        "400": "400ms",
        "600": "600ms",
      },
    },
  },
  plugins: [],
};

export default config;
