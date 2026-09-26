import Link from "next/link";
import { company } from "@/lib/content";

/** Closing note under the index: an unlisted industry is still a hydraulic duty. */
export function NotListed() {
  return (
    <aside
      data-reveal
      aria-labelledby="not-listed-title"
      className="mt-20 grid gap-8 border-t border-ink pt-10 md:mt-28 lg:grid-cols-12 lg:gap-x-12 lg:pt-14"
    >
      <div className="lg:col-span-6">
        <p className="t-kicker">Not listed?</p>
        <h2 id="not-listed-title" className="t-h2 mt-3 text-ink">
          Every order starts from the duty, not the catalogue.
        </h2>
      </div>
      <div className="lg:col-span-5 lg:col-start-8">
        <p className="t-lede">
          What decides a build is the duty — working pressure, media, temperature and end fittings — not the name
          of the industry. If your work is hydraulic, call or send the drawing, and we will tell you honestly
          whether we can build it.
        </p>
        {/* gap-5 keeps the shared .link-arrow hit areas (±0.5rem) from overlapping */}
        <ul className="mt-8 flex flex-col items-start gap-5">
          <li>
            <a href={company.phoneHref} className="link-arrow">
              Call {company.phoneDisplay}
            </a>
          </li>
          <li>
            <a href={company.whatsapp} target="_blank" rel="noopener noreferrer" className="link-arrow">
              Message on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <Link href="/contact#enquiry" className="link-arrow">
              Send the drawing <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
