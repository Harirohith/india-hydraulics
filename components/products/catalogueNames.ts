import type { CatalogueCategory, CatalogueProduct } from "@/lib/products";

/*
 * Display names for the catalogue. lib/products.ts keeps the names exactly as
 * listed on the marketplace ("Bsp Stem Fitting", "Fittings Equipments"); the
 * site sets them in sentence case with trade abbreviations kept in capitals.
 * Search matches both forms.
 */

const GROUP_NAMES: Record<string, string> = {
  "hose-assemblies": "Hose assemblies",
  "fittings-equipments": "Fittings",
  adapter: "Adapters",
  "wire-braided-hose": "Wire braided hoses",
  "straight-adapter": "Straight adapters",
  "hydraulic-press": "Hydraulic press",
  "hose-o-ring": "Hose O-rings",
  "hose-guard": "Hose guards",
  "hose-clip": "Hose clips",
};

const ITEM_NAMES: Record<string, string> = {
  "Assy Hose Assembly": "Hose assembly",
  "Bsp Stem Fitting": "BSP stem fitting",
  "C1T G1 One Wire Braid Hose": "C1T G1 one-wire braid hose",
  "C2AT G2 Two Wire Braid Hose": "C2AT G2 two-wire braid hose",
  "Global G6K Spiral Wire Hose": "Global G6K spiral wire hose",
  "Straight Adapter BSP - UNF": "Straight adapter, BSP to UNF",
  "Straight Adapter UNF To BSP": "Straight adapter, UNF to BSP",
  "Straight Adapter UNF O Ring Port": "Straight adapter, UNF O-ring port",
  "Hose O Ring": "Hose O-ring",
  "Hose Guard 20 Mm Safety": "Hose guard, 20 mm safety",
};

// Thread forms and standards stay in capitals whatever the source casing.
const KEEP_UPPER = new Set(["BSP", "UNF", "ORFS", "SAE", "JIC", "NPT", "DIN", "JIS", "ISO"]);

function sentenceCase(s: string) {
  return s
    .split(/\s+/)
    .map((word, i) => {
      if (KEEP_UPPER.has(word.toUpperCase())) return word.toUpperCase();
      if (/\d/.test(word) || (word.length > 1 && word === word.toUpperCase())) return word; // C1T, G2 …
      return i === 0 ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : word.toLowerCase();
    })
    .join(" ");
}

export const groupName = (g: CatalogueCategory) => GROUP_NAMES[g.slug] ?? sentenceCase(g.name);
export const itemName = (p: CatalogueProduct) => ITEM_NAMES[p.name] ?? sentenceCase(p.name);
