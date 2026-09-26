import Link from "next/link";
import Image from "next/image";
import { company, emailParts, locations, productCategories } from "@/lib/content";
import { ISOBadge } from "./ISOBadge";

const companyLinks = [
  { href: "/about", label: "About the company" },
  { href: "/about#quality", label: "Quality & testing" },
  { href: "/about#facilities", label: "Facilities" },
  { href: "/industries", label: "Industries served" },
  { href: "/contact", label: "Contact & locations" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-carbon text-fog">
      <div className="container-edge pb-10 pt-16 md:pt-20">
        {/* Name plate */}
        <div className="flex flex-col gap-8 border-b border-carbon-3 pb-12 md:flex-row md:items-end md:justify-between">
          <Link href="/" className="flex items-center gap-4" aria-label={`${company.name} — home`}>
            <span className="grid h-14 w-14 place-items-center bg-white">
              <Image src="/logo-mark.png" alt="" width={50} height={50} />
            </span>
            <span className="leading-none">
              <span className="block font-display text-4xl font-bold uppercase tracking-[0.02em] text-white md:text-5xl">
                India Hydraulics
              </span>
              <span className="mt-2 block text-sm text-fog-2">{company.tagline}</span>
            </span>
          </Link>
          <ISOBadge size="lg" tone="dark" />
        </div>

        <div className="grid gap-12 pt-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="max-w-[40ch] leading-relaxed text-fog-2">
              Hydraulic hoses, crimped hose assemblies, CNC-machined fittings, adapters and seals — built and
              pressure-tested in Tiruchengode, Tamil Nadu, for customers across India and overseas.
            </p>
          </div>

          <div className="lg:col-span-2">
            <h2 className="font-display text-xl font-semibold text-white">Products</h2>
            <ul className="mt-4 space-y-2.5 text-[0.95rem] text-fog-2">
              {productCategories.slice(0, 5).map((c) => (
                <li key={c.id}>
                  <Link href={`/products#${c.id}`} className="transition-colors hover:text-white">
                    {c.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/products#catalogue" className="text-white underline underline-offset-4 hover:no-underline">
                  Full catalogue
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="font-display text-xl font-semibold text-white">Company</h2>
            <ul className="mt-4 space-y-2.5 text-[0.95rem] text-fog-2">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-4">
            <h2 className="font-display text-xl font-semibold text-white">Contact</h2>
            <dl className="mt-4 grid grid-cols-[6.5rem_1fr] gap-x-4 gap-y-2.5 text-[0.95rem]">
              <dt className="text-fog-2">Phone</dt>
              <dd>
                <a href={company.phoneHref} className="text-white hover:underline">
                  {company.phoneDisplay}
                </a>
              </dd>
              <dt className="text-fog-2">WhatsApp</dt>
              <dd>
                <a href={company.whatsapp} target="_blank" rel="noopener noreferrer" className="text-white hover:underline">
                  {company.whatsappDisplay}
                </a>
              </dd>
              <dt className="text-fog-2">Email</dt>
              <dd className="min-w-0 break-words">
                <a href={company.emailHref} className="text-white hover:underline">
                  {emailParts[0]}@<wbr />
                  {emailParts[1]}
                </a>
              </dd>
              <dt className="text-fog-2">Hours</dt>
              <dd className="text-white">{company.hours}</dd>
            </dl>
          </div>
        </div>

        <div className="mt-12 grid gap-8 border-t border-carbon-3 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {locations.map((loc) => (
            <address key={loc.id} className="not-italic text-[0.95rem] leading-relaxed text-fog-2">
              <span className="mb-1 block font-medium text-white">{loc.label}</span>
              {loc.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-carbon-3 pt-6 text-sm text-fog-2 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {company.name}, {company.foundedLocation}
          </p>
          <p className="font-mono text-xs tracking-[0.08em]">BUILT TO ISO · SAE · DIN · JIS</p>
        </div>
      </div>
    </footer>
  );
}
