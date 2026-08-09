import type { Metadata } from "next";
import { Space_Grotesk, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { AnimationObserver } from "@/components/AnimationObserver";
import "./globals.css";

// Display: geometric grotesk with engineering character (condensed proportions).
// NOT Inter, NOT a serif.
const display = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

// Body: highly legible workhorse sans. Tight tracking.
const body = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

// Mono: for spec values, units, standards codes, section numbers.
const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://indiahydraulics.example"),
  title: {
    default: "India Hydraulics — Hydraulic hoses, assemblies, fittings",
    template: "%s — India Hydraulics",
  },
  description:
    "Engineered hydraulic hoses, hose assemblies, fittings, adapters, seals and quick-release couplings. In-house design, ISO / SAE / DIN / JIS compliance. Supplied from Tiruchengode, Tamil Nadu.",
  openGraph: {
    title: "India Hydraulics",
    description:
      "Hydraulic hoses, hose assemblies, fittings and adapters for construction, mining, oil & gas, defence and industrial machinery.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="bg-surface-0 text-ink-1 antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-[100] focus:bg-accent focus:text-accent-ink focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <AnimationObserver />
      </body>
    </html>
  );
}
