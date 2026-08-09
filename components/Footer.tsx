import Link from "next/link";
import Image from "next/image";
import { ISOBadge } from "./ISOBadge";

const sections = [
  {
    heading: "Catalogue",
    links: [
      { href: "/products", label: "All products" },
      { href: "/products#hoses", label: "Hoses & assemblies" },
      { href: "/products#fittings", label: "Fittings & adapters" },
      { href: "/products#seals", label: "Seals & O-rings" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/industries", label: "Industries served" },
      { href: "/about#facilities", label: "Facilities" },
      { href: "/about#standards", label: "Standards" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { href: "tel:+919443189164", label: "+91 94431 89164" },
      { href: "/contact", label: "Enquiry form" },
      { href: "/contact#locations", label: "Locations" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-32 border-t border-line-1 bg-surface-1">
      <div className="container-edge py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="flex items-center gap-3">
              <Image src="/logo.jpg" alt="India Hydraulics" width={32} height={32} className="rounded-sm" />
              <span className="font-display text-base font-semibold tracking-tight2 text-ink-1">
                INDIA HYDRAULICS
              </span>
            </div>
            <p className="mt-5 max-w-[36ch] text-base leading-relaxed text-ink-2">
              Hydraulic hoses, hose assemblies, fittings, adapters, seals and
              quick-release couplings. Designed and supplied from Tiruchengode,
              Tamil Nadu.
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-y-3 text-sm text-ink-3">
              <dt>Standards</dt>
              <dd className="text-ink-1">ISO · SAE · DIN · JIS</dd>
              <dt>CAD</dt>
              <dd className="text-ink-1">SolidWorks · EdgeCAM</dd>
              <dt>Founded</dt>
              <dd className="text-ink-1">1996</dd>
            </dl>
            <div className="mt-5">
              <ISOBadge />
            </div>
          </div>

          {sections.map((s) => (
            <div key={s.heading} className="md:col-span-2">
              <h4 className="text-xs uppercase tracking-wide font-medium text-brand">
                {s.heading}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {s.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      className="text-base text-ink-2 transition-colors duration-180 hover:text-ink-1"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-2">
            <h4 className="text-xs uppercase tracking-wide font-medium text-brand">
              Address
            </h4>
            <address className="mt-4 not-italic text-base leading-relaxed text-ink-2">
              89, Sankari Road, Opp Court,
              <br />
              Seetharampalayam,
              <br />
              Tiruchengode 637211
              <br />
              Tamil Nadu, India
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line-1 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-ink-3">
            © {year} India Hydraulics · Tiruchengode
          </p>
          <a
            href="https://wa.me/919443189164"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-ink-2 hover:text-ink-1 transition-colors"
          >
            WhatsApp: +91 94431 89164
          </a>
        </div>
      </div>
    </footer>
  );
}
