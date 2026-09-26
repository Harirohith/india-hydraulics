import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Icon } from "@/components/Icon";
import { EnquiryAside } from "@/components/contact/EnquiryAside";
import { FormFallback } from "@/components/contact/FormFallback";
import { Locations } from "@/components/contact/Locations";
import { company } from "@/lib/content";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: `Request a quote from India Hydraulics: send a drawing, a part number or a sample. Call or WhatsApp ${company.phoneDisplay}, ${company.hours}. Units at Sankari Road and Karuveppampatty, Tiruchengode, Tamil Nadu.`,
};

/**
 * Contact — the visitor has decided to act, so the page is short:
 * 1. the fastest routes (call, WhatsApp) in the opener;
 * 2. the enquiry form, with direct lines and what happens next beside it
 *    (#enquiry — every "Request a quote" button lands here);
 * 3. where the two units are (#locations).
 */
export default function ContactPage() {
  return (
    <>
      <PageHero
        crumb="Contact"
        kicker="Contact"
        title="Send a drawing, a part number or a sample."
        intro={"Use the form below and we reply within one working day. If the requirement is urgent, call or WhatsApp us — Monday to Saturday, 09:00\u00a0to\u00a018:00\u00a0IST."}
      >
        <a href={company.phoneHref} className="btn btn-primary max-sm:w-full">
          Call {company.phoneDisplay}
        </a>
        <a
          href={company.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-whatsapp max-sm:w-full"
          aria-label="WhatsApp (opens in a new tab)"
        >
          <Icon name="whatsapp" />
          WhatsApp
        </a>
      </PageHero>

      <section
        id="enquiry"
        aria-labelledby="enquiry-title"
        className="bg-paper-2 pb-16 pt-5 sm:pt-10 md:pb-20 md:pt-14 lg:pb-24 lg:pt-16"
      >
        <div className="container-edge grid gap-16 lg:grid-cols-12 lg:gap-12">
          {/* The enquiry sheet: title bar, then the form (rendered in the browser — it reads ?product=) */}
          <div className="min-w-0 border border-rule bg-paper lg:col-span-7">
            <header className="border-b border-rule px-5 pb-7 pt-8 sm:px-8 md:px-10 md:pt-10">
              <h2 id="enquiry-title" className="font-display text-[2.5rem] font-semibold leading-none text-ink md:text-[3rem]">
                Request a quote
              </h2>
              <p className="mt-4 max-w-[54ch] text-ink-2">
                Your name, email and a short description are all we need. A part number or drawing helps us quote
                exactly.
              </p>
            </header>
            <Suspense fallback={<FormFallback />}>
              <ContactForm labelledBy="enquiry-title" />
            </Suspense>
          </div>

          {/* Beside the form: sticky on screens tall enough to hold it whole */}
          <EnquiryAside className="lg:col-span-5 lg:mt-10 lg:self-start lg:pl-4 xl:pl-6 [@media(min-width:1280px)_and_(min-height:860px)]:sticky [@media(min-width:1280px)_and_(min-height:860px)]:top-[calc(var(--nav-h)+1.5rem)]" />
        </div>
      </section>

      <Locations />
    </>
  );
}
