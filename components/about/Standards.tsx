import Link from "next/link";
import { SectionHead } from "@/components/SectionHead";
import { productCategories, standards } from "@/lib/content";

/**
 * About → Standards. The four standards bodies set large, like the index
 * page of a catalogue, then every specific reference named in the product
 * specifications (lib/content.ts → productCategories[].specs) as a table.
 */
type Family = (typeof standards)[number];
type CategoryId = (typeof productCategories)[number]["id"];

const FAMILIES: Record<Family, { name: string; scope: string }> = {
  ISO: {
    name: "International Organization for Standardization",
    scope: "Hydraulic hoses, tube fittings, O-rings and gas hoses.",
  },
  SAE: {
    name: "SAE International",
    scope: "100R-series hydraulic hoses, tube fittings and O-ring sizes.",
  },
  DIN: {
    name: "Deutsches Institut für Normung",
    scope: "Cutting-ring fittings and hydraulic hoses.",
  },
  JIS: {
    name: "Japanese Industrial Standards",
    scope: "Thread forms on fittings and adapters.",
  },
};

/** Ordered by product family: hoses → fittings → seals. */
const REFERENCES: { code: string; family: Family; covers: string; used: CategoryId[] }[] = [
  { code: "ISO 1436", family: "ISO", covers: "Wire-braid hydraulic hoses and hose assemblies", used: ["hoses"] },
  { code: "SAE 100R1", family: "SAE", covers: "One-wire-braid hydraulic hose", used: ["hoses"] },
  { code: "SAE 100R2", family: "SAE", covers: "Two-wire-braid hydraulic hose", used: ["hoses"] },
  { code: "SAE 100R12", family: "SAE", covers: "Four-spiral-wire hydraulic hose, heavy duty", used: ["hoses", "uhp"] },
  { code: "SAE 100R13", family: "SAE", covers: "Multi-spiral-wire hydraulic hose, extra-high pressure", used: ["hoses", "uhp"] },
  { code: "EN 856", family: "DIN", covers: "Spiral-wire hydraulic hoses: 4SP, 4SH, R12, R13", used: ["uhp"] },
  { code: "SAE 100R6", family: "SAE", covers: "Textile-braid hydraulic hose, low pressure", used: ["air-water-gas"] },
  { code: "ISO 3821", family: "ISO", covers: "Rubber hoses for gas welding and cutting", used: ["air-water-gas"] },
  { code: "ISO 8434", family: "ISO", covers: "Tube connectors: 24° cone, 37° flare and ORFS", used: ["fittings"] },
  { code: "SAE J514", family: "SAE", covers: "Tube fittings: 37° flare (JIC) and O-ring boss", used: ["fittings"] },
  { code: "DIN 2353", family: "DIN", covers: "Cutting-ring compression fittings, 24° cone", used: ["fittings"] },
  { code: "ISO 3601", family: "ISO", covers: "O-rings for fluid power: sizes and tolerances", used: ["seals"] },
  { code: "AS568", family: "SAE", covers: "Inch-series O-ring sizes (dash numbers)", used: ["seals"] },
];

const categoryLabel = (id: CategoryId) => productCategories.find((c) => c.id === id)?.label ?? id;

/** Keep "O-ring(s)" on one line: a break after "O-" reads badly. */
function keepOring(text: string) {
  return text.split(/(O-rings?)/).map((part, i) =>
    i % 2 ? (
      <span key={i} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    )
  );
}

/** Codes for one body without the repeated prefix: "1436 · 3601 …". */
function familyCodes(family: Family) {
  return REFERENCES.filter((r) => r.family === family)
    .map((r) => r.code.replace(new RegExp(`^${family} `), ""))
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
}

/** One product family per line, so a two-family row never breaks mid-name. */
function FamilyLinks({ ids }: { ids: CategoryId[] }) {
  return (
    <>
      {ids.map((id) => (
        <span key={id} className="block">
          <Link
            href={`/products#${id}`}
            // Hit area extended to ~44px tall without moving the text.
            className="relative text-ink underline decoration-rule-2 underline-offset-4 transition-colors after:absolute after:-inset-y-2.5 after:inset-x-0 after:content-[''] hover:text-brand hover:decoration-brand"
          >
            {categoryLabel(id)}
          </Link>
        </span>
      ))}
    </>
  );
}

export function Standards() {
  return (
    <section id="standards" aria-labelledby="standards-title" className="section bg-paper">
      <div className="container-edge">
        <SectionHead
          id="standards-title"
          kicker="Standards"
          title="Made to ISO, SAE, DIN and JIS standards."
          intro="Hoses, fittings and seals are specified to international standards. Give us the standard from your drawing or the old part, and we confirm the specification with you."
        />

        {/* One reveal for the whole grid: revealing the cells one by one would
            leave the grid's hairline background showing as a grey slab. */}
        <ul data-reveal className="rule-grid sm:grid-cols-2 lg:grid-cols-4">
          {standards.map((s) => {
            const codes = familyCodes(s);
            return (
              // Phone: code on the left, text on the right. From sm: a column, code on top.
              <li
                key={s}
                className="grid grid-cols-[4.5rem_1fr] content-start gap-x-4 bg-paper p-5 sm:flex sm:flex-col sm:p-6 md:p-8"
              >
                <p className="row-span-3 font-display text-[clamp(3.25rem,2rem+3.6vw,5.5rem)] font-semibold leading-[0.8] text-ink">
                  {s}
                </p>
                {/* Two-line box so the rule below lines up across all four cells */}
                <p className="text-sm leading-snug text-ink-3 sm:mt-5 sm:min-h-[2.75em]">{FAMILIES[s].name}</p>
                <p className="mt-3 border-t border-rule pt-3 leading-relaxed text-ink-2 sm:mt-6 sm:pt-4">
                  {keepOring(FAMILIES[s].scope)}
                </p>
                {codes.length > 0 && (
                  <ul
                    aria-label={`${s} references`}
                    className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[0.8125rem] leading-relaxed text-ink sm:mt-auto sm:pt-6"
                  >
                    {codes.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>

        <div data-reveal className="mt-16 grid gap-10 md:mt-24 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <h3 className="t-h3 text-ink">Reference list</h3>
            <p className="mt-4 max-w-[40ch] leading-relaxed text-ink-2">
              The standards named in our product specifications, and the product families they apply to.
              Documentation is available on request.
            </p>
            <Link href="/contact#enquiry" className="link-arrow mt-6">
              Ask for documentation <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="lg:col-span-8">
            <table className="w-full border-collapse">
              <caption className="sr-only">Standards named in India Hydraulics product specifications</caption>
              <thead>
                <tr className="border-y border-ink">
                  <th scope="col" className="t-label py-3 pr-4 text-left">
                    Reference
                  </th>
                  <th scope="col" className="t-label py-3 pr-4 text-left">
                    Covers
                  </th>
                  <th scope="col" className="t-label hidden py-3 text-left md:table-cell">
                    Product family
                  </th>
                </tr>
              </thead>
              <tbody>
                {REFERENCES.map((r) => (
                  <tr key={r.code} className="border-b border-rule align-top">
                    <th
                      scope="row"
                      className="whitespace-nowrap py-4 pr-4 text-left font-mono text-sm font-semibold leading-6 text-ink md:pr-8"
                    >
                      {r.code}
                    </th>
                    <td className="py-4 pr-4 leading-6 text-ink-2">
                      {keepOring(r.covers)}
                      <span className="mt-1.5 block text-sm md:hidden">
                        <FamilyLinks ids={r.used} />
                      </span>
                    </td>
                    <td className="hidden py-4 text-[0.95rem] leading-6 md:table-cell">
                      <FamilyLinks ids={r.used} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
