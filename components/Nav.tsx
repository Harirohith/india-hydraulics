"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/industries", label: "Industries" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line-1 bg-surface-0/90 backdrop-blur supports-[backdrop-filter]:bg-surface-0/80">
      <div className="container-edge flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="group relative flex items-center gap-3 press"
          aria-label="India Hydraulics home"
        >
          <Image
            src="/logo.jpg"
            alt="India Hydraulics"
            width={36}
            height={36}
            className="rounded-sm transition-transform duration-220 group-hover:scale-105"
          />
          <div className="flex flex-col leading-none">
            <span className="font-display text-base font-semibold tracking-tight2 text-ink-1 group-hover:text-brand transition-colors duration-180">
              INDIA HYDRAULICS
            </span>
            <span className="font-mono text-xs tracking-label text-ink-3 group-hover:text-ink-2 transition-colors duration-180">
              EST. 1996 · TIRUCHENGODE
            </span>
          </div>
          {/* Brand-blue accent that slides in on hover, like a hydraulic ram */}
          <span
            aria-hidden="true"
            className="absolute -bottom-2 left-[3.25rem] right-0 h-px bg-brand origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-220"
          />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-6">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={`ram text-sm font-medium transition-colors duration-180 ${
                      active
                        ? "text-brand"
                        : "text-ink-2 hover:text-ink-1"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/contact" className="btn-secondary press">
            Request quote
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span
            className={`block h-0.5 w-6 bg-ink-1 transition-all duration-220 ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-ink-1 transition-opacity duration-220 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-ink-1 transition-all duration-220 ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <nav
          aria-label="Mobile navigation"
          className="md:hidden border-t border-line-1 bg-surface-0"
        >
          <ul className="container-edge py-4 space-y-1">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`block py-3 px-4 text-base font-medium rounded transition-colors ${
                      active
                        ? "text-brand bg-brand-dim/40"
                        : "text-ink-1 hover:bg-surface-1"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-3 px-4">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="btn-primary press w-full justify-center"
              >
                Request a quote
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
