import Image from "next/image";
import Link from "next/link";
import { SectionHead } from "@/components/SectionHead";
import { categoryVisuals, productCategories } from "@/lib/content";

/*
 * Local corrections to the shared category photos (lib/content categoryVisuals):
 *  hoses          — the photo has a light margin down its left edge: trim it.
 *  uhp            — rock-breaker.png has a white strip along the bottom: anchor top.
 *  air-water-gas  — earth-movers.png sits on a lavender studio backdrop: level it
 *                   to white so it disappears into the grey well like the others.
 *  (every cut-out) — optimised "white" backgrounds come out a cool off-white that
 *                   shows as a faint rectangle in the warm well; a mild level fixes it.
 *  general        — hose-guard.png sits on a grey gradient that cannot blend:
 *                   show it full-bleed as a photograph instead of a cut-out.
 */
const adjust: Record<string, { position?: string; trim?: boolean; levels?: boolean; fit?: "cover" }> = {
  hoses: { trim: true },
  uhp: { position: "50% 0%" },
  "air-water-gas": { levels: true },
  general: { fit: "cover" },
};

/** Keyboard focus ring for a grid cell, drawn above the photo. */
function FocusFrame() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 hidden border-2 border-brand group-focus-visible:block"
    />
  );
}

/**
 * What we supply: all nine product families as a catalogue grid. Each cell
 * is a way into that family's specifications on the products page.
 * Mobile: a compact index (thumbnail, code, name). sm+: photo cells.
 */
export function ProductRange() {
  return (
    <section aria-labelledby="range-title" className="section bg-paper">
      <div className="container-edge">
        <SectionHead
          id="range-title"
          kicker="Product range"
          title="Nine product families, stocked or made to order."
          intro="Standard hoses, fittings and seals ship from stock. Assemblies and special parts are built to your drawing, to ISO, SAE, DIN and JIS standards."
          action={
            <Link href="/products" className="link-arrow">
              All products and specifications <span className="arrow" aria-hidden="true">→</span>
            </Link>
          }
        />

        {/* Focus: a drawn frame (FocusFrame) replaces the outline, which the positioned photo well would cover. */}
        <ul data-reveal className="rule-grid sm:grid-cols-2 lg:grid-cols-3">
          {productCategories.map((c) => {
            const v = categoryVisuals[c.id];
            const a = adjust[c.id] ?? {};
            const contain = (a.fit ?? v?.fit) === "contain";
            return (
              <li key={c.id} className="bg-paper">
                <Link
                  href={`/products#${c.id}`}
                  className="panel-link group relative flex h-full hover:bg-paper-2 focus-visible:outline-none sm:flex-col"
                >
                  <FocusFrame />
                  <div
                    className={`relative w-[6.5rem] shrink-0 overflow-hidden sm:aspect-[16/10] sm:w-full ${
                      contain ? "photo-well" : "bg-paper-3"
                    }`}
                  >
                    {v && (
                      <div className={`absolute ${a.trim ? "-inset-[3%]" : "inset-0"}`}>
                        <Image
                          src={v.src}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 104px"
                          className={`zoom ${
                            contain ? "object-contain p-2.5 sm:p-8" : "photo-bw object-cover"
                          } ${
                            a.levels
                              ? "[filter:grayscale(1)_contrast(1.6)_brightness(1.25)]"
                              : contain
                                ? "[filter:contrast(1.08)_brightness(1.05)]"
                                : ""
                          }`}
                          style={{ objectPosition: a.position ?? v.position ?? "50% 50%" }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col px-4 py-4 sm:p-6 lg:p-7">
                    <p className="t-label">{c.code}</p>
                    <h3 className="t-h3 mt-2 text-ink sm:mt-3">{c.label}</h3>
                    <p className="mt-3 hidden text-ink-2 sm:block">{c.description}</p>
                    <span className="mt-auto pt-3 text-[0.95rem] font-medium text-ink sm:pt-6">
                      Specifications{" "}
                      <span
                        aria-hidden="true"
                        className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}

          {/* Fills the tenth slot of the two-column grid; on one column it closes the list. */}
          <li className="bg-paper lg:hidden">
            <Link
              href="/products#catalogue"
              className="panel-link group relative flex h-full flex-col justify-between gap-6 p-5 hover:bg-paper-2 focus-visible:outline-none sm:p-6"
            >
              <FocusFrame />
              <div>
                <p className="t-label">Catalogue</p>
                <p className="t-h3 mt-2 text-ink sm:mt-3">Search every catalogue item</p>
              </div>
              <span className="text-[0.95rem] font-medium text-ink">
                Open the full catalogue{" "}
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
