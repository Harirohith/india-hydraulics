import * as React from "react";
import Link from "next/link";
import { company } from "@/lib/content";

/**
 * The last step of every page's story: turn interest into an enquiry.
 * A flat indigo band — the one place the brand colour fills a surface.
 * Place it as the final section of a page (the footer follows).
 */
export function CTABand({
  title = "Send us your drawing, sample or part number.",
  body = "Tell us the duty — pressure, media, temperature, end fittings. We confirm the specification with you and reply within one working day.",
  primaryLabel = "Request a quote",
  primaryHref = "/contact#enquiry",
}: {
  title?: React.ReactNode;
  body?: React.ReactNode;
  primaryLabel?: string;
  primaryHref?: string;
}) {
  return (
    <section className="bg-brand text-white" aria-labelledby="cta-band-title">
      <div className="container-edge section-sm grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div data-reveal className="lg:col-span-7">
          <h2 id="cta-band-title" className="t-h2 text-white">
            {title}
          </h2>
          <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-white/80">{body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={primaryHref} className="btn btn-light btn-lg">
              {primaryLabel} <span className="arrow" aria-hidden="true">→</span>
            </Link>
            <a href={company.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light btn-lg">
              Message on WhatsApp
            </a>
          </div>
        </div>
        <dl data-reveal className="self-end border-t border-white/30 lg:col-span-5">
          {[
            { k: "Phone", v: <a href={company.phoneHref} className="hover:underline">{company.phoneDisplay}</a> },
            {
              k: "WhatsApp",
              v: (
                <a href={company.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {company.whatsappDisplay}
                </a>
              ),
            },
            { k: "Email", v: <a href={company.emailHref} className="break-all hover:underline">{company.email}</a> },
            { k: "Hours", v: company.hours },
          ].map((row) => (
            <div key={row.k} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-white/20 py-3.5">
              <dt className="text-white/65">{row.k}</dt>
              <dd className="font-medium text-white">{row.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
