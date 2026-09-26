import { company } from "@/lib/content";
import { CompanyEmail } from "./Email";

/**
 * Stands in for the enquiry form while its script loads (the form reads the
 * URL, so it renders in the browser). Holds roughly the form's height so the
 * page does not jump. Without JavaScript it offers email and phone instead.
 */
export function FormFallback() {
  return (
    <div className="min-h-[100rem] px-5 py-8 sm:min-h-[73rem] sm:px-8 md:px-10">
      <p className="js-only t-label">Loading the enquiry form…</p>
      <p className="nojs-only max-w-[48ch] text-ink-2">
        The enquiry form needs JavaScript. Email your requirement and drawing to{" "}
        <a href={company.emailHref} className="link">
          <CompanyEmail />
        </a>
        , or call{" "}
        <a href={company.phoneHref} className="link whitespace-nowrap">
          {company.phoneDisplay}
        </a>
        .
      </p>
    </div>
  );
}
