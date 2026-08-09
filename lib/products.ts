// Product catalogue — sourced from Indiamart scrape, see scrape/indiamart/data.json
// Each product has one canonical image in /public/products/<slug>.{png|jpg}.
// `id` is the Indiamart display id when known.

export type CatalogueProduct = {
  id?: number;
  name: string;
  image: string | null; // null = no image available (renders a placeholder card)
  altImage?: string;    // optional extra view
  note?: string;
};

export type CatalogueCategory = {
  slug: string;
  code: string;        // engineering code, e.g. "IH / HOS"
  name: string;
  blurb: string;
  products: CatalogueProduct[];
};

export const catalogue: CatalogueCategory[] = [
  {
    slug: "hose-assemblies",
    code: "IH / HOS",
    name: "Hose Assemblies",
    blurb:
      "Crimped assemblies built to spec, hydrostatically tested before despatch.",
    products: [
      { id: 20204022973, name: "Assy Hose Assembly",         image: "/products/assy-hose-assembly.png", altImage: "/products/assy-hose-assembly-alt.png" },
      { id: 20204259297, name: "Valve Bank Hose Assembly",   image: "/products/valve-bank-hose-assembly.png" },
      { id: 20204286712, name: "Cement Hose Assembly",       image: "/products/cement-hose-assembly.png" },
      { id: 20204269948, name: "Boom Hose Assembly",         image: "/products/boom-hose-assembly.png" },
      { id: 20204301891, name: "Rock Breaker",               image: "/products/rock-breaker.png" },
      { id: 20204309562, name: "Earth Movers",               image: "/products/earth-movers.png" },
    ],
  },
  {
    slug: "fittings-equipments",
    code: "IH / FIT",
    name: "Fittings Equipments",
    blurb:
      "Forged and machined fittings — Single, Flange, BSP, ORFS, Banjo, Cap.",
    products: [
      { id: 20204475855, name: "Single Fitting",    image: "/products/single-fitting.png" },
      { id: 20204551748, name: "SAE Flange Fitting", image: "/products/sae-flange-fitting.png" },
      { id: 20204561173, name: "Bsp Stem Fitting",  image: "/products/bsp-stem-fitting.png" },
      { id: 20204448030, name: "Male Fitting",      image: "/products/male-fitting.png" },
      { id: 20204493933, name: "BSP Fitting",       image: "/products/bsp-fitting.png" },
      { id: 20204511191, name: "Cap Fitting",       image: "/products/cap-fitting.png" },
      { id: 20204521233, name: "Banjo Fitting",     image: "/products/banjo-fitting.png" },
      { id: 20204535462, name: "ORFS Fitting",      image: "/products/orfs-fitting.png" },
    ],
  },
  {
    slug: "adapter",
    code: "IH / ADP",
    name: "Adapter",
    blurb: "Connectors and adapters for hydraulic circuits.",
    products: [
      { id: 4363480312, name: "Connectors", image: "/products/connectors.jpg", altImage: "/products/connectors-alt.jpg", note: "₹ 75 / Number" },
    ],
  },
  {
    slug: "wire-braided-hose",
    code: "IH / WBH",
    name: "Wire Braided Hose",
    blurb: "One-braid, two-braid and spiral wire hoses for high-pressure circuits.",
    products: [
      { id: 20204383012, name: "C1T G1 One Wire Braid Hose",  image: "/products/c1t-g1-one-wire-braid-hose.png" },
      { id: 20204398562, name: "C2AT G2 Two Wire Braid Hose", image: "/products/c2at-g2-two-wire-braid-hose.png" },
      { id: 20204412762, name: "Global G6K Spiral Wire Hose", image: "/products/global-g6k-spiral-wire-hose.png" },
    ],
  },
  {
    slug: "straight-adapter",
    code: "IH / STR",
    name: "Straight Adapter",
    blurb: "Straight adapters in BSP, UNF and O-Ring port configurations.",
    products: [
      { id: 20204608462, name: "Straight Adapter BSP - UNF",        image: "/products/straight-adapter-bsp-unf.png" },
      { id: 20204622930, name: "Straight Adapter UNF To BSP",       image: "/products/straight-adapter-unf-to-bsp.png" },
      { id: 20204664691, name: "Straight Adapter UNF O Ring Port",  image: "/products/straight-adapter-unf-o-ring-port.png" },
    ],
  },
  {
    slug: "hydraulic-press",
    code: "IH / HPR",
    name: "Hydraulic Press",
    blurb: "Hydraulic press units built to order.",
    products: [
      { id: 2855513264312, name: "Hydraulic Press", image: null, note: "Image not published. Available on request." },
    ],
  },
  {
    slug: "hose-o-ring",
    code: "IH / O-R",
    name: "Hose O Ring",
    blurb: "Static and dynamic O-rings for hydraulic sealing.",
    products: [
      { id: 20204701391, name: "Hose O Ring", image: "/products/hose-o-ring.png" },
    ],
  },
  {
    slug: "hose-guard",
    code: "IH / HGD",
    name: "Hose Guard",
    blurb: "Spiral and woven hose guards for abrasion protection.",
    products: [
      { id: 20204726573, name: "Hose Guard 20 Mm Safety", image: "/products/hose-guard-20mm-safety.png" },
    ],
  },
  {
    slug: "hose-clip",
    code: "IH / HCL",
    name: "Hose Clip",
    blurb: "Hose clips and clamps for secure assembly mounting.",
    products: [
      { id: 20204687512, name: "Hose Clip", image: "/products/hose-clip.png" },
    ],
  },
];

// HSN codes from the Indiamart listing — for tax/customs reference.
export const hsnCodes: { code: string; description: string }[] = [
  { code: "40091200", description: "Tubes, pipes and hoses of vulcanised rubber — not reinforced, with fittings" },
  { code: "40092200", description: "Tubes, pipes and hoses of vulcanised rubber — reinforced with metal, with fittings" },
  { code: "40094100", description: "Tubes, pipes and hoses of vulcanised rubber — reinforced with other materials, without fittings" },
  { code: "40094200", description: "Tubes, pipes and hoses of vulcanised rubber — reinforced with other materials, with fittings" },
];

// Aggregate stats for the catalogue intro.
export const catalogueStats = {
  totalProducts: catalogue.reduce((n, c) => n + c.products.length, 0),
  totalCategories: catalogue.length,
  withImages: catalogue.reduce(
    (n, c) => n + c.products.filter((p) => p.image).length,
    0
  ),
};
