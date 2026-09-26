import { categoryVisuals, productCategories } from "@/lib/content";
import { catalogue } from "@/lib/products";

/*
 * Presentation of the nine product families on the products page.
 * Facts (names, codes, descriptions, specs) come from lib/content.ts; this
 * file only decides how each family is laid out and photographed.
 */

export type Category = (typeof productCategories)[number];
export type FamilyId = Category["id"];
export type Tone = "paper" | "paper-2" | "carbon";

export const quoteHref = (product: string) => `/contact?product=${encodeURIComponent(product)}#enquiry`;

/** "Seals & O-rings" → "seals & O-rings" (only the first letter drops) */
export const lowerFirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

export type FamilyPhoto = {
  src: string;
  /** "cover" fills the frame (scene photo), "contain" floats a cut-out in a photo well */
  fit: "cover" | "contain";
  alt: string;
  /** Tailwind aspect-ratio class for the frame */
  aspect: string;
  position?: string;
  /** Scene photos in black and white, like the rest of the site */
  bw?: boolean;
  /**
   * Extra filter classes for a cut-out: lift an off-white studio backdrop to
   * white so the photo well's multiply blend makes it disappear.
   */
  tone?: string;
  /** Padding classes for a cut-out (default p-8 sm:p-10) */
  pad?: string;
  /** Crop deeper into the photo (scale, transform-origin) */
  zoom?: { scale: number; origin: string };
};

type FamilyStyle = {
  /** Name in the desktop family bar */
  short: string;
  /** Shorter wording for "Ask about …" where the full name would wrap on a phone */
  ask?: string;
  photo: Omit<FamilyPhoto, "src" | "fit"> & { fit?: FamilyPhoto["fit"] };
  /** Catalogue groups that hold this family's listed items */
  related?: string[];
};

const style: Record<FamilyId, FamilyStyle> = {
  hoses: {
    short: "Hoses",
    photo: {
      alt: "Wire-braid hydraulic hoses crimped to fittings on a valve block",
      aspect: "aspect-square",
      bw: true,
      zoom: { scale: 1.06, origin: "50% 50%" }, // trims the print's white border
    },
    related: ["wire-braided-hose"],
  },
  assemblies: {
    short: "Assemblies",
    photo: {
      alt: "Crimped hose assemblies running along an excavator boom",
      aspect: "aspect-[4/5]",
      bw: true,
    },
    related: ["hose-assemblies"],
  },
  fittings: {
    short: "Fittings",
    photo: { alt: "Machined crimp fittings in four sizes", aspect: "aspect-[5/4]", tone: "brightness-[1.05]" },
    related: ["fittings-equipments", "adapter", "straight-adapter"],
  },
  seals: {
    short: "Seals",
    photo: {
      alt: "Hydraulic seals, O-rings and backup rings in several sizes",
      aspect: "aspect-[16/10]",
      tone: "brightness-[1.05]",
      pad: "p-3 sm:p-4", // the print carries wide white margins of its own
      zoom: { scale: 1.3, origin: "50% 50%" },
    },
    related: ["hose-o-ring"],
  },
  couplings: {
    short: "Couplings",
    photo: {
      alt: "Hydraulic couplings and adapters with bonded seals",
      aspect: "aspect-[16/10]",
      // The print crops parts at its right edge: set it flush with the frame so
      // the cut reads as a bleed, not a flaw.
      pad: "py-3 pl-3 pr-0 sm:py-4 sm:pl-4",
      position: "100% 50%",
      zoom: { scale: 1.3, origin: "100% 50%" },
    },
  },
  "air-water-gas": {
    short: "Air, water & gas",
    photo: {
      alt: "Two hose assemblies with crimped end fittings",
      aspect: "aspect-[16/10]",
      tone: "grayscale brightness-[1.35] contrast-[1.05]", // lavender backdrop → white
    },
  },
  "stainless-corrugated": {
    short: "Stainless",
    ask: "stainless corrugated hoses",
    photo: {
      alt: "Corrugated metal hose bending past steel tubes on an engine",
      aspect: "aspect-[16/10]",
      bw: true,
      // The page opens on the lower half of this photograph; this sheet crops in
      // on the corrugated hose bend in its top-left corner.
      position: "0% 0%",
      zoom: { scale: 2.2, origin: "0% 0%" },
    },
  },
  uhp: {
    short: "Ultra-high pressure",
    photo: {
      alt: "Hydraulic rock breaker at work in a quarry",
      aspect: "aspect-[4/5]",
      bw: true,
      // Crop in from the top-left: keeps the breaker, drops the maker's logo on the
      // boom (top right) and the white strip along the bottom edge.
      position: "0% 0%",
      zoom: { scale: 1.12, origin: "22% 0%" },
    },
  },
  general: {
    short: "General purpose",
    ask: "general purpose hoses",
    // Studio shot on a grey gradient: shown full-frame so the backdrop reads as a photo.
    photo: { alt: "Spiral hose guard", aspect: "aspect-[4/3]", fit: "cover" },
  },
};

export type Family = Category & {
  short: string;
  /** What "Ask about …" names (the enquiry form still receives the full name) */
  ask: string;
  /** The family's pressure rating, when its specification states one in psi */
  rating: string | null;
  photo: FamilyPhoto | null;
  /** First related catalogue group and the number of listed items across all related groups */
  related: { slug: string; count: number } | null;
};

const bySlug = new Map(catalogue.map((g) => [g.slug, g]));

function build(cat: Category): Family {
  const s = style[cat.id];
  const v = categoryVisuals[cat.id];
  const groups = (s.related ?? [])
    .map((slug) => bySlug.get(slug))
    .filter((g): g is (typeof catalogue)[number] => g !== undefined);
  const count = groups.reduce((n, g) => n + g.products.length, 0);
  const pressure = cat.specs.find(([k]) => k === "Working pressure")?.[1];
  const psi = pressure ? (/([\d,]+)\s*psi/i.exec(pressure)?.[1] ?? null) : null;
  return {
    ...cat,
    short: s.short,
    ask: s.ask ?? lowerFirst(cat.label),
    rating: psi,
    photo: v ? { ...s.photo, src: v.src, fit: s.photo.fit ?? v.fit, position: s.photo.position ?? v.position } : null,
    related: groups.length > 0 && count > 0 ? { slug: groups[0].slug, count } : null,
  };
}

export const families: Family[] = productCategories.map(build);
const byId = new Map(families.map((f) => [f.id, f]));

/*
 * The catalogue's rhythm: three full spreads for the core families, two
 * rows of half-page sheets, one dark spread for the 10,000 psi family, and a
 * compact strip to close. Any family not placed here is appended as a spread.
 */
export type FamilyRow =
  | { kind: "spread"; family: Family; photoSide: "left" | "right"; tone: Tone }
  | { kind: "pair"; families: [Family, Family]; tone: Tone }
  | { kind: "strip"; family: Family; tone: Tone };

type RowPlan =
  | { kind: "spread"; id: FamilyId; photoSide: "left" | "right"; tone: Tone }
  | { kind: "pair"; ids: [FamilyId, FamilyId]; tone: Tone }
  | { kind: "strip"; id: FamilyId; tone: Tone };

const plan: RowPlan[] = [
  { kind: "spread", id: "hoses", photoSide: "left", tone: "paper" },
  { kind: "spread", id: "assemblies", photoSide: "right", tone: "paper-2" },
  { kind: "spread", id: "fittings", photoSide: "left", tone: "paper" },
  { kind: "pair", ids: ["seals", "couplings"], tone: "paper-2" },
  { kind: "pair", ids: ["air-water-gas", "stainless-corrugated"], tone: "paper" },
  { kind: "spread", id: "uhp", photoSide: "right", tone: "carbon" },
  { kind: "strip", id: "general", tone: "paper-2" },
];

function resolveRows(): FamilyRow[] {
  const rows: FamilyRow[] = [];
  const placed = new Set<string>();
  for (const r of plan) {
    if (r.kind === "pair") {
      const a = byId.get(r.ids[0]);
      const b = byId.get(r.ids[1]);
      if (!a || !b) continue;
      rows.push({ kind: "pair", families: [a, b], tone: r.tone });
      placed.add(a.id).add(b.id);
    } else {
      const f = byId.get(r.id);
      if (!f) continue;
      rows.push(
        r.kind === "spread"
          ? { kind: "spread", family: f, photoSide: r.photoSide, tone: r.tone }
          : { kind: "strip", family: f, tone: r.tone },
      );
      placed.add(f.id);
    }
  }
  families
    .filter((f) => !placed.has(f.id))
    .forEach((f, i) =>
      rows.push({ kind: "spread", family: f, photoSide: i % 2 ? "right" : "left", tone: i % 2 ? "paper" : "paper-2" }),
    );
  return rows;
}

export const familyRows = resolveRows();
