import { Suspense } from "react";
import Image from "next/image";
import { company, locations } from "@/lib/content";
import { ContactForm } from "./ContactForm";

export const metadata = {
  title: "Contact",
  description:
    "Contact India Hydraulics. Phone +91 94431 89164. Manufacturing unit at 89 Sankari Road, Tiruchengode 637211. Assemblies unit at Karuveppampatty.",
};

function MapEmbed({ src, label }: { src: string; label: string }) {
  return (
    <div className="border border-line-1 bg-surface-0">
      <iframe
        title={`Map — ${label}`}
        src={src}
        className="block h-72 w-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <div className="border-t border-line-1 px-4 py-2 text-sm text-ink-3">
        {label}
      </div>
    </div>
  );
}

// Embed URLs derived from verified place coordinates
const mapEmbeds: Record<string, string> = {
  primary:   "https://maps.google.com/maps?q=11.395301,77.886245&z=17&output=embed",
  secondary: "https://maps.google.com/maps?q=11.3972139,77.8763012&z=17&output=embed",
};

export default function ContactPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden py-20 md:py-32 flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/stock/engine-room.jpg"
            alt=""
            aria-hidden="true"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gray-950/80" />
        </div>
        <div className="container-edge relative z-10">
          <span className="inline-block bg-white/10 border border-white/25 text-white px-3 py-1 text-sm font-medium mb-5">
            Contact us
          </span>
          <h1 className="max-w-3xl font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight3 text-white leading-[1.1]">
            Send a spec, a drawing, or a phone call.
          </h1>
          <p className="mt-5 max-w-[54ch] text-base md:text-lg leading-relaxed text-white/75">
            We respond to every enquiry. For urgent build requirements, call directly.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href={`tel:${company.phoneHref.replace("tel:", "")}`} className="btn-primary press">
              Call {company.phoneDisplay}
            </a>
            <a
              href="https://wa.me/919443189164?text=Hi%2C%20I%20have%20an%20enquiry%20about%20your%20hydraulic%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="press inline-flex items-center gap-2 border border-white/30 text-white text-base font-medium px-7 py-3.5 hover:border-white hover:bg-white/5 transition-colors"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 32 32"><path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.132 6.742 3.052 9.376L1.054 31.35l6.178-1.963a15.9 15.9 0 008.772 2.617C24.826 32 32 24.824 32 16.004 32 7.176 24.826 0 16.004 0zm9.31 22.616c-.392 1.106-1.934 2.024-3.182 2.292-.854.18-1.968.324-5.72-1.228-4.802-1.986-7.892-6.856-8.132-7.174-.228-.318-1.928-2.566-1.928-4.894 0-2.328 1.218-3.47 1.65-3.944.392-.432.928-.604 1.26-.604.152 0 .29.008.414.014.432.02.648.044.932.724.356.848 1.222 2.916 1.33 3.128.108.212.212.49.068.784-.132.3-.248.432-.46.664-.212.232-.412.41-.624.662-.192.224-.408.464-.172.896.236.432 1.052 1.734 2.26 2.812 1.552 1.386 2.86 1.816 3.264 2.016.404.2.64.168.876-.1.248-.28 1.052-1.222 1.332-1.642.28-.42.56-.348.944-.208.388.14 2.452 1.158 2.872 1.368.42.212.7.316.804.492.1.176.1 1.026-.292 2.132z"/></svg>
              WhatsApp us
            </a>
          </div>
        </div>
      </section>

      {/* ─── FORM + DETAILS ─── */}
      <section className="py-16 md:py-24">
        <div className="container-edge grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="font-display text-2xl font-medium text-ink-1 mb-8">
              Tell us what you need
            </h2>
            <Suspense fallback={
              <div className="border border-line-1 bg-surface-1 h-64 flex items-center justify-center text-sm text-ink-3">
                Loading form…
              </div>
            }>
              <ContactForm />
            </Suspense>
          </div>

          <aside className="md:col-span-5">
            <h2 className="font-display text-2xl font-medium text-ink-1 mb-6">
              Direct contact
            </h2>
            <dl className="space-y-0">
              <div className="spec-row">
                <dt>Phone</dt>
                <dd>
                  <a href={company.phoneHref} className="ram text-ink-1">
                    {company.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div className="spec-row">
                <dt>WhatsApp</dt>
                <dd>
                  <a
                    href="https://wa.me/919443189164"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ram text-ink-1"
                  >
                    +91 94431 89164
                  </a>
                </dd>
              </div>
              <div className="spec-row">
                <dt>Email</dt>
                <dd>
                  <a href={company.emailHref} className="ram text-ink-1">
                    {company.emailHref.replace("mailto:", "")}
                  </a>
                </dd>
              </div>
              <div className="spec-row">
                <dt>Hours</dt>
                <dd>Mon – Sat · 09:00 – 18:00 IST</dd>
              </div>
              <div className="spec-row">
                <dt>Response</dt>
                <dd>Within 1 working day</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      {/* ─── LOCATIONS ─── */}
      <section id="locations" className="bg-surface-1 py-16 md:py-24">
        <div className="container-edge">
          <h2 className="font-display text-3xl font-medium text-ink-1 mb-3">
            Our locations
          </h2>
          <p className="text-base text-ink-2 mb-10">
            Manufacturing (Unit 1) and assemblies (Unit 2). Visitors by appointment.
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {locations.map((loc, i) => (
              <article key={loc.id} className="bg-surface-0 border border-line-1 p-6 md:p-8">
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-xs uppercase tracking-wide font-medium text-brand">
                    Unit {i + 1}
                  </span>
                  <span className="text-sm text-ink-3">
                    {loc.sqft.toLocaleString("en-IN")} ft²
                  </span>
                </div>
                <h3 className="font-display text-xl font-medium text-ink-1">
                  {loc.label}
                </h3>
                <address className="mt-3 not-italic text-base leading-relaxed text-ink-2">
                  {loc.address.map((line) => (
                    <span key={line} className="block">{line}</span>
                  ))}
                </address>
                <div className="mt-6">
                  <Suspense fallback={<div className="h-72 border border-line-1 bg-surface-1" />}>
                    <MapEmbed src={mapEmbeds[loc.id]} label={loc.label} />
                  </Suspense>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
