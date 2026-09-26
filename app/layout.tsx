import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { AnimationObserver } from "@/components/AnimationObserver";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import "./globals.css";

// Display: condensed grotesk with the voice of stamped nameplates and
// catalogue headings.
const display = Barlow_Condensed({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

// Body: IBM Plex Sans — engineered, very legible at small sizes.
const body = IBM_Plex_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

// Data: part codes, spec keys, standards, readouts.
const mono = IBM_Plex_Mono({
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
  icons: { icon: "/logo-mark.png", apple: "/logo-mark.png" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#111214",
};

// Runs before first paint: marks the page as JS-capable so scroll reveals
// can start hidden. If the app never boots (script blocked, very slow
// network), the class is removed after 3.5s and everything stays visible.
const bootScript = `document.documentElement.classList.add('js');setTimeout(function(){if(!window.__ihReveal)document.documentElement.classList.remove('js')},3500);`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="bg-paper text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:bg-brand focus:px-4 focus:py-2 focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <AnimationObserver />
      </body>
    </html>
  );
}
