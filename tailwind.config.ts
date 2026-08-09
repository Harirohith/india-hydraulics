import type { Config } from "tailwindcss";

/**
 * Light theme with white + blue. Industrial B2B for India Hydraulics.
 *   brand  = saturated cobalt blue (--brand, primary CTAs, links, active states)
 *   accent = teal blue (--accent, reserved for small highlights, data, badges)
 *
 * Surfaces are soft white / pale blue-gray engineering paper.
 * Modular scales: 4px spacing base, 1.25 type ratio from 16px body.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Surfaces — soft white / pale blue-gray
        surface: {
          0: "var(--surface-0)",  // soft white, page base
          1: "var(--surface-1)",  // pale blue-gray, section alternation
          2: "var(--surface-2)",  // pure white, cards / raised cells
          3: "var(--surface-3)",  // blue tint, elevated / hover state
        },
        // Lines — hairlines & borders
        line: {
          1: "var(--hairline)",   // light steel dividers
          2: "var(--border)",     // steel visible borders
        },
        // Text — charcoal to slate hierarchy
        ink: {
          1: "var(--text-1)",     // primary, charcoal
          2: "var(--text-2)",     // secondary, slate
          3: "var(--text-3)",     // tertiary
          4: "var(--text-4)",     // disabled / quaternary, steel
        },
        // Brand — saturated cobalt blue, primary accent
        brand: {
          DEFAULT: "var(--brand)",
          hover:   "var(--brand-hover)",
          dim:     "var(--brand-dim)",
          ink:     "var(--brand-ink)",
        },
        // Accent — teal blue, reserved for small highlights, badges, data points
        accent: {
          DEFAULT: "var(--accent)",
          hover:   "var(--accent-hover)",
          dim:     "var(--accent-dim)",
          ink:     "var(--accent-ink)",
        },
        // Status — light-theme tuned (AA contrast on white)
        danger:  "var(--danger)",
        success: "var(--success)",
      },
      fontFamily: {
        // Geometric grotesk with engineering character.
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans:    ["var(--font-body)",    "ui-sans-serif", "system-ui", "sans-serif"],
        mono:    ["var(--font-mono)",    "ui-monospace", "SFMono-Regular", "monospace"],
      },
      // Modular type scale — base 16px, ratio 1.25 (Major Third)
      // micro 0.64rem → caption 0.8rem → body 1rem → lead 1.25rem
      // → h6 1.563rem → h5 1.953rem → h4 2.441rem → h3 3.052rem
      // → h2 3.815rem → h1 4.768rem → display 5.96rem
      fontSize: {
        "micro":   ["0.64rem",   { lineHeight: "0.9rem" }],
        "caption": ["0.8rem",    { lineHeight: "1.05rem" }],
        "body":    ["1rem",      { lineHeight: "1.6rem" }],
        "lead":    ["1.25rem",   { lineHeight: "1.75rem" }],
        "h6": ["1.563rem",      { lineHeight: "1.95rem", letterSpacing: "-0.01em" }],
        "h5": ["1.953rem",      { lineHeight: "2.25rem", letterSpacing: "-0.015em" }],
        "h4": ["2.441rem",      { lineHeight: "2.7rem",  letterSpacing: "-0.02em" }],
        "h3": ["3.052rem",      { lineHeight: "3.2rem",  letterSpacing: "-0.025em" }],
        "h2": ["3.815rem",      { lineHeight: "3.9rem",  letterSpacing: "-0.03em" }],
        "h1": ["4.768rem",      { lineHeight: "4.8rem",  letterSpacing: "-0.035em" }],
        "display": ["5.96rem",   { lineHeight: "5.7rem",  letterSpacing: "-0.04em" }],
      },
      // Modular spacing scale — base 4px
      // 1 (4) → 2 (8) → 3 (12) → 4 (16) → 6 (24) → 8 (32) → 12 (48) → 16 (64) → 24 (96) → 32 (128)
      // Tailwind defaults to a 0.25rem step which already covers this;
      // we add the named steps for the spec grid + 1px/0.5px hairlines.
      spacing: {
        "0.5":  "0.125rem",  // 2px
        "1":    "0.25rem",   // 4px
        "1.5":  "0.375rem",  // 6px
        "2":    "0.5rem",    // 8px
        "2.5":  "0.625rem",  // 10px
        "3":    "0.75rem",   // 12px
        "3.5":  "0.875rem",  // 14px
        "4":    "1rem",      // 16px
        "5":    "1.25rem",   // 20px
        "6":    "1.5rem",    // 24px
        "8":    "2rem",      // 32px
        "10":   "2.5rem",    // 40px
        "12":   "3rem",      // 48px
        "16":   "4rem",      // 64px
        "20":   "5rem",      // 80px
        "24":   "6rem",      // 96px
        "32":   "8rem",      // 128px
        "40":   "10rem",     // 160px
        "48":   "12rem",     // 192px
        "56":   "14rem",     // 224px
        "64":   "16rem",     // 256px
        "rule": "1px",
        "hair": "0.5px",
      },
      borderRadius: {
        // SHAPE LOCK: this project is all-sharp except for a single pill on small chips.
        // No rounded card corners. Engineering aesthetic.
        none: "0",
        sm:   "1px",
        DEFAULT: "0",
        md:   "0",
        lg:   "0",
        xl:   "0",
        pill: "9999px",
      },
      // Motion — mechanical. Short. ease-out. No bounce.
      transitionTimingFunction: {
        "mech-out":   "cubic-bezier(0.16, 1, 0.3, 1)",       // primary — decisive ease-out
        "mech-in":    "cubic-bezier(0.7, 0, 0.84, 0)",      // strong ease-in
        "mech-flat":  "cubic-bezier(0.4, 0, 0.2, 1)",       // for color/opacity
        "ram-extend": "cubic-bezier(0.23, 1, 0.32, 1)",      // for the "hydraulic ram extending" line motif
      },
      transitionDuration: {
        "150": "150ms",
        "180": "180ms",
        "220": "220ms",
        "260": "260ms",
      },
      letterSpacing: {
        "label":  "0.18em",
        "mono":   "0.02em",
        "tight2": "-0.02em",
        "tight3": "-0.03em",
        "tight4": "-0.04em",
      },
      // Blueprint grid background — light theme: faint blue lines.
      backgroundImage: {
        "blueprint-grid":
          "linear-gradient(to right, rgba(37,99,235,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(37,99,235,0.05) 1px, transparent 1px)",
        "hairline-fade":
          "linear-gradient(to right, transparent, rgba(37,99,235,0.35), transparent)",
        "hairline-accent":
          "linear-gradient(to right, transparent, rgba(8,145,178,0.35), transparent)",
      },
      backgroundSize: {
        "grid-32": "32px 32px",
        "grid-64": "64px 64px",
      },
    },
  },
  plugins: [],
};

export default config;
