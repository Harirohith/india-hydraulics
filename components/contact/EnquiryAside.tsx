import * as React from "react";
import { company } from "@/lib/content";
import { CompanyEmail } from "./Email";

/**
 * Beside the enquiry form: the direct lines (for people who would rather
 * talk) and what happens after they press "Send enquiry". Text only — no
 * icon tiles.
 */

const linkCls =
  "underline decoration-rule-2 decoration-1 underline-offset-[0.3em] transition-colors hover:text-brand hover:decoration-brand";

const direct: { label: string; value: React.ReactNode }[] = [
  {
    label: "Phone",
    value: (
      <a href={company.phoneHref} className={linkCls} aria-label={`Call ${company.phoneDisplay}`}>
        {company.phoneDisplay}
      </a>
    ),
  },
  {
    label: "WhatsApp",
    value: (
      <a
        href={company.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className={linkCls}
        aria-label={`WhatsApp ${company.whatsappDisplay} (opens in a new tab)`}
      >
        {company.whatsappDisplay}
      </a>
    ),
  },
  {
    label: "Email",
    value: (
      <a href={company.emailHref} className={linkCls}>
        <CompanyEmail />
      </a>
    ),
  },
  { label: "Hours", value: company.hours },
  { label: "Reply time", value: company.responseTime },
];

const nextSteps = [
  {
    title: "We read your requirement",
    body: "Your message, part number and any drawing.",
  },
  {
    title: "We confirm the specification with you",
    body: "Pressure, media, temperature and end fittings — agreed before we quote.",
  },
  {
    title: "You receive our quotation",
    body: "We reply within one working day.",
  },
];

export function EnquiryAside({ className = "" }: { className?: string }) {
  return (
    <aside aria-label="Direct contact and what happens next" className={className}>
      <section aria-labelledby="direct-contact-title">
        <h2 id="direct-contact-title" className="t-h3 text-ink">
          Direct contact
        </h2>
        <dl className="spec-table mt-6">
          {direct.map((row) => (
            <div
              key={row.label}
              className="spec-row sm:grid-cols-[7.5rem_1fr] lg:grid-cols-1 lg:gap-1 xl:grid-cols-[6.5rem_1fr] xl:gap-5"
            >
              <dt>{row.label}</dt>
              <dd className="min-w-0">{row.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="next-steps-title" className="mt-12 md:mt-14">
        <h2 id="next-steps-title" className="t-h3 text-ink">
          What happens next
        </h2>
        <ol data-reveal-group className="mt-6 border-t border-ink">
          {nextSteps.map((step, i) => (
            <li key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-x-3 border-b border-rule py-4">
              <span aria-hidden="true" className="pt-[0.3rem] font-mono text-sm font-semibold text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-[1.375rem] font-semibold leading-tight text-ink">{step.title}</h3>
                <p className="mt-1 text-[0.975rem] leading-relaxed text-ink-2">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </aside>
  );
}
