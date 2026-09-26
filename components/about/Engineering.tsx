import Link from "next/link";
import { cadTools, productCategories } from "@/lib/content";

/**
 * About → Engineering. In-house design, CAM and machining, set as a spec
 * sheet — the tools and forms are the evidence, no pictograms.
 */
function spec(categoryId: string, key: string) {
  return productCategories.find((c) => c.id === categoryId)?.specs.find(([k]) => k === key)?.[1];
}

export function Engineering() {
  const [cad, cam] = cadTools;
  const rows = [
    { k: "Design", v: cad },
    { k: "CAM programming", v: cam },
    { k: "Machining", v: "CNC turning, in-house" },
    { k: "Fitting ends", v: spec("fittings", "Threads") },
    { k: "Materials", v: spec("fittings", "Materials") },
    { k: "Crimping", v: "In-house, to OEM specification" },
    { k: "Testing", v: spec("assemblies", "Test") },
    { k: "Works from", v: "Drawing · sample · part number" },
  ].filter((r): r is { k: string; v: string } => Boolean(r.v));

  return (
    <section id="engineering" aria-labelledby="engineering-title" className="section bg-paper-2">
      <div className="container-edge grid gap-12 lg:grid-cols-12">
        <div data-reveal className="lg:col-span-5">
          <p className="t-kicker">Engineering</p>
          <h2 id="engineering-title" className="t-h2 mt-3 text-ink">
            Drawn, programmed and machined in-house.
          </h2>
          <p className="t-lede mt-6">
            Design is done in {cad}; CNC programs are prepared in {cam}. Fittings and adapters are then turned on
            our own machines — no outsourced hardware.
          </p>
          <p className="mt-5 max-w-[46ch] text-ink-2">
            Send a drawing, a sample or a part number. We confirm the duty — pressure, media, temperature and end
            fittings — with you before production.
          </p>
          <Link href="/contact#enquiry" className="link-arrow mt-8">
            Send a drawing for review <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </div>

        <dl data-reveal className="spec-table self-start lg:col-span-6 lg:col-start-7">
          {rows.map((r) => (
            <div key={r.k} className="spec-row">
              <dt>{r.k}</dt>
              <dd>{r.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
