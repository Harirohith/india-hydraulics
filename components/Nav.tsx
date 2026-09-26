"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { company } from "@/lib/content";

// Order follows a buyer's questions: what do you make → who is it for →
// can I trust you → how do I order.
const links = [
  { href: "/products", label: "Products" },
  { href: "/industries", label: "Industries" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu on navigation; lock page scroll while it is open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Utility line — the facts and numbers buyers look for first */}
      <div className="hidden bg-carbon text-[13px] text-fog-2 md:block">
        <div className="container-edge flex h-9 items-center justify-between gap-6">
          <p className="whitespace-nowrap">
            ISO 9001:2015 certified <span className="px-2 text-carbon-3">|</span> Hydraulic hoses &amp;
            fittings since {company.foundedYear}
            <span className="hidden xl:inline">
              <span className="px-2 text-carbon-3">|</span>
              {company.foundedLocation}
            </span>
          </p>
          <ul className="flex items-center divide-x divide-carbon-3 whitespace-nowrap">
            <li className="pr-4">
              <a href={company.phoneHref} className="transition-colors hover:text-white">
                Call {company.phoneDisplay}
              </a>
            </li>
            <li className="px-4">
              <a
                href={company.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                WhatsApp
              </a>
            </li>
            <li className="hidden pl-4 xl:block">
              <a href={company.emailHref} className="transition-colors hover:text-white">
                {company.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-rule bg-paper">
        <div className="container-edge flex h-[var(--nav-h)] items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3" aria-label={`${company.name} — home`}>
            <Image src="/logo-mark.png" alt="" width={46} height={46} priority />
            <span className="leading-none">
              <span className="block font-display text-[1.6rem] font-bold uppercase tracking-[0.02em] text-ink">
                India Hydraulics
              </span>
              <span className="mt-1 block text-[12px] text-ink-3">{company.tagline}</span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden h-full lg:block">
            <ul className="flex h-full items-stretch gap-9">
              {links.map((l) => {
                const active = isActive(pathname, l.href);
                return (
                  <li key={l.href} className="relative flex items-center">
                    <Link
                      href={l.href}
                      aria-current={active ? "page" : undefined}
                      className={`text-[0.975rem] font-medium transition-colors ${
                        active ? "text-ink" : "text-ink-2 hover:text-ink"
                      }`}
                    >
                      {l.label}
                    </Link>
                    {active && <span aria-hidden="true" className="absolute inset-x-0 -bottom-px h-[3px] bg-brand" />}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <a href={company.phoneHref} className="text-[0.975rem] font-medium text-ink hover:text-brand">
              {company.phoneDisplay}
            </a>
            <Link href="/contact#enquiry" className="btn btn-primary btn-sm">
              Request a quote <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="btn btn-outline btn-sm min-w-[5.5rem] lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>

        {open && (
          <nav
            id="mobile-menu"
            aria-label="Mobile"
            className="h-[calc(100dvh-var(--nav-h))] overflow-y-auto border-t border-rule bg-paper lg:hidden"
          >
            <ul className="container-edge pt-2">
              {[{ href: "/", label: "Home" }, ...links].map((l, i) => {
                const active = l.href === "/" ? pathname === "/" : isActive(pathname, l.href);
                return (
                  <li key={l.href} className="load-rise border-b border-rule" style={{ ["--d" as string]: i * 40 }}>
                    <Link
                      href={l.href}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center justify-between py-4 font-display text-[2rem] font-semibold leading-none ${
                        active ? "text-brand" : "text-ink"
                      }`}
                    >
                      {l.label}
                      <span aria-hidden="true" className="text-xl text-ink-3">→</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="container-edge grid gap-3 pb-10 pt-8">
              <Link href="/contact#enquiry" className="btn btn-primary btn-lg w-full">
                Request a quote <span className="arrow" aria-hidden="true">→</span>
              </Link>
              <div className="grid grid-cols-2 gap-3">
                <a href={company.phoneHref} className="btn btn-outline">
                  Call now
                </a>
                <a href={company.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                  WhatsApp
                </a>
              </div>
              <p className="pt-2 text-center text-sm text-ink-3">
                {company.phoneDisplay} · {company.hours}
              </p>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
