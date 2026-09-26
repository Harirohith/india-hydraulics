// Real content from the client brief. Do not invent different facts.
// Where content is missing, use the placeholders marked TODO below.

export const company = {
  name: "India Hydraulics",
  // Indiamart confirms CEO: Ramasamy. Older archived page said founded 1991
  // by "Ramasamy & Moorthy"; LinkedIn says 1996. Using 1996 per brief.
  foundedYear: 1996,
  foundedLocation: "Tiruchengode, Tamil Nadu",
  industry: "Automation Machinery Manufacturing",
  legalStatus: "Partnership",
  ceo: "Ramasamy",
  certification: "ISO 9001:2015 Certified",
  phoneDisplay: "+91 94431 89164",
  phoneHref: "tel:+919443189164",
  whatsapp: "https://wa.me/919443189164?text=Hi%2C%20I%20have%20an%20enquiry%20about%20your%20hydraulic%20products.",
  whatsappDisplay: "+91 94431 89164",
  // PLACEHOLDER email — client to replace (both fields).
  email: "enquiry@indiahydraulics.example",
  emailHref: "mailto:enquiry@indiahydraulics.example",
  hours: "Mon – Sat · 09:00 – 18:00 IST",
  responseTime: "Within 1 working day",
  // Tagline printed under the logo mark.
  tagline: "Powering Source",
};

/** The email split at "@" so layouts can offer a clean line break (<wbr>). */
export const emailParts = company.email.split("@") as [string, string];

/** Years in business, computed at build time from the founding year. */
export const yearsInBusiness = new Date().getFullYear() - company.foundedYear;

export const standards = ["ISO", "SAE", "DIN", "JIS"] as const;
export const cadTools = ["SolidWorks 3D CAD", "EdgeCAM"] as const;

export const locations = [
  {
    id: "primary",
    label: "Unit 1 — Manufacturing",
    address: [
      "89, Sankari Road, Opp Court,",
      "Seetharampalayam,",
      "Tiruchengode 637211",
      "Tamil Nadu, India",
    ],
    sqft: 6000,
    mapQuery: "89 Sankari Road Seetharampalayam Tiruchengode 637211",
  },
  {
    id: "secondary",
    label: "Unit 2 — Assemblies",
    address: [
      "5, Karuveppampatty,",
      "Tiruchengode,",
      "Tamil Nadu, India",
    ],
    sqft: 2000,
    mapQuery: "5 Karuveppampatty Tiruchengode Tamil Nadu",
  },
] as const;

/**
 * Industries served. `image` is optional — only segments with a suitable
 * photo have one.
 * Borewell_truck.jpg carries a third-party logo top-right: keep
 * `imagePosition` biased left so it stays cropped out.
 */
export const industryDetails = [
  {
    id: "construction",
    label: "Construction machinery",
    image: "/stock/excavator-hydraulic.jpg",
    imagePosition: "50% 45%",
    desc: "Hydraulic hoses and fittings for excavators, cranes, bulldozers and earth-moving equipment.",
    products: [
      { label: "Hose assemblies", href: "/products#assemblies" },
      { label: "Hydraulic hoses", href: "/products#hoses" },
      { label: "Fittings & adapters", href: "/products#fittings" },
    ],
  },
  {
    id: "cement",
    label: "Cement",
    image: "/products/cement-hose-assembly.png",
    imagePosition: "50% 50%",
    desc: "Heavy-duty assemblies for cement plant conveyors, mixers and slurry pump circuits.",
    products: [
      { label: "Hose assemblies", href: "/products#assemblies" },
      { label: "Couplings & quick-release", href: "/products#couplings" },
      { label: "Seals & O-rings", href: "/products#seals" },
    ],
  },
  {
    id: "water-well",
    label: "Water well drilling rigs",
    image: "/im/Borewell_truck.jpg",
    imagePosition: "28% 55%",
    desc: "High-pressure hose assemblies for borewell and water well rig circuits rated to 10,000 psi.",
    products: [
      { label: "Ultra-high-pressure hoses", href: "/products#uhp" },
      { label: "Hose assemblies", href: "/products#assemblies" },
      { label: "Fittings & adapters", href: "/products#fittings" },
    ],
  },
  {
    id: "injection-moulding",
    label: "Injection moulding",
    image: null,
    imagePosition: undefined,
    desc: "Precision hydraulic lines for injection moulding press circuits and temperature control systems.",
    products: [
      { label: "Hydraulic hoses", href: "/products#hoses" },
      { label: "Seals & O-rings", href: "/products#seals" },
      { label: "Straight adapters", href: "/products#cat-straight-adapter" },
    ],
  },
  {
    id: "paper",
    label: "Paper industry",
    image: null,
    imagePosition: undefined,
    desc: "Chemical-resistant hoses and stainless steel corrugated lines for paper mill hydraulic systems.",
    products: [
      { label: "Stainless steel corrugated hoses", href: "/products#stainless-corrugated" },
      { label: "General purpose hoses", href: "/products#general" },
      { label: "Seals & O-rings", href: "/products#seals" },
    ],
  },
  {
    id: "machine-tools",
    label: "Machine tools",
    image: "/im/lmw_tuning.jpg",
    imagePosition: "50% 50%",
    desc: "Precision fittings and fluid lines for CNC machines, lathes and industrial plant equipment.",
    products: [
      { label: "Fittings & adapters", href: "/products#fittings" },
      { label: "Hydraulic hoses", href: "/products#hoses" },
      { label: "Hose assemblies", href: "/products#assemblies" },
    ],
  },
  {
    id: "mining",
    label: "Surface & underground mining",
    image: "/products/rock-breaker.png",
    imagePosition: "50% 50%",
    desc: "Ultra-high-pressure assemblies for rock breakers, drill rigs and mining equipment hydraulic circuits.",
    products: [
      { label: "Ultra-high-pressure hoses", href: "/products#uhp" },
      { label: "Hose assemblies", href: "/products#assemblies" },
      { label: "Couplings & quick-release", href: "/products#couplings" },
    ],
  },
  {
    id: "defence",
    label: "Defence",
    image: null,
    imagePosition: undefined,
    desc: "High-specification hydraulic lines for defence vehicle systems and military equipment.",
    products: [
      { label: "Hose assemblies", href: "/products#assemblies" },
      { label: "Fittings & adapters", href: "/products#fittings" },
      { label: "Seals & O-rings", href: "/products#seals" },
    ],
  },
  {
    id: "oil-gas",
    label: "Oil & gas",
    image: "/stock/factory-pipes.jpg",
    imagePosition: "50% 50%",
    desc: "Flame-resistant, stainless and high-pressure assemblies for upstream, midstream and downstream oil & gas operations.",
    products: [
      { label: "Ultra-high-pressure hoses", href: "/products#uhp" },
      { label: "Stainless steel corrugated hoses", href: "/products#stainless-corrugated" },
      { label: "Couplings & quick-release", href: "/products#couplings" },
    ],
  },
  {
    id: "automobile",
    label: "Automobile",
    image: null,
    imagePosition: undefined,
    desc: "OEM and aftermarket hydraulic assemblies for automotive manufacturing and repair systems.",
    products: [
      { label: "Hose assemblies", href: "/products#assemblies" },
      { label: "Air, water & gas hoses", href: "/products#air-water-gas" },
      { label: "Fittings & adapters", href: "/products#fittings" },
    ],
  },
] as const;

/** Plain list of segment names (form dropdowns, chips). */
export const industries = industryDetails.map((i) => i.label);

export const productCategories = [
  {
    id: "hoses",
    label: "Hydraulic hoses",
    code: "IH / H",
    description:
      "Wire-braid and spiral hoses for high-pressure hydraulic circuits. Standard and bespoke assemblies.",
    specs: [
      ["Working pressure", "up to 5,800 psi"],
      ["Standards", "ISO 1436 · SAE 100R1 / R2 / R12 / R13 · DIN"],
      ["Sizes", "1/4″ to 2″ inner diameter"],
      ["Temperature", "−40 °C to +121 °C"],
    ],
  },
  {
    id: "assemblies",
    label: "Hose assemblies",
    code: "IH / A",
    description:
      "Crimped hose assemblies built to spec, tested before despatch.",
    specs: [
      ["Build", "In-house crimping to OEM spec"],
      ["Test", "Hydrostatic test on every assembly"],
      ["End fittings", "BSP · JIC · ORFS · NPT · metric"],
      ["Lead time", "Stock and made-to-order"],
    ],
  },
  {
    id: "fittings",
    label: "Fittings & adapters",
    code: "IH / F",
    description:
      "Elbows, tees, crosses and adapters used in bore wells, earth-moving, cement, mining, oil & gas, construction and automobile systems.",
    specs: [
      ["Materials", "Carbon steel · stainless steel · brass"],
      ["Threads", "BSP · JIC · ORFS · NPT · metric · JIS"],
      ["Standards", "ISO 8434 · SAE J514 · DIN 2353"],
      ["Form", "Forged and machined"],
    ],
  },
  {
    id: "seals",
    label: "Seals & O-rings",
    code: "IH / S",
    description:
      "Static and dynamic seals, O-rings and backup rings for hydraulic circuits.",
    specs: [
      ["Materials", "NBR · FKM / Viton · EPDM · Polyurethane"],
      ["Hardness", "70 to 90 Shore A"],
      ["Standards", "ISO 3601 · AS568"],
      ["Sizes", "Metric and imperial"],
    ],
  },
  {
    id: "couplings",
    label: "Couplings & quick-release",
    code: "IH / C",
    description:
      "Quick-disconnect couplings for tool changes and circuit isolation.",
    specs: [
      ["Types", "Flat-face · poppet · screw-type"],
      ["Sizes", "1/4″ to 2″"],
      ["Working pressure", "up to 5,000 psi"],
      ["Materials", "Carbon steel · stainless steel"],
    ],
  },
  {
    id: "air-water-gas",
    label: "Air, water & gas hoses",
    code: "IH / AWG",
    description:
      "General-purpose hoses for compressed air, water and gas service.",
    specs: [
      ["Working pressure", "up to 1,500 psi"],
      ["Standards", "ISO 3821 · SAE 100R6"],
      ["Sizes", "1/4″ to 1″"],
      ["Use", "Workshop · plant · process"],
    ],
  },
  {
    id: "stainless-corrugated",
    label: "Stainless steel corrugated hoses",
    code: "IH / SS",
    description:
      "Flexible stainless steel hoses for high-temperature and corrosive service.",
    specs: [
      ["Material", "SS 304 · SS 316 · SS 321"],
      ["Working pressure", "up to 600 psi"],
      ["Temperature", "−200 °C to +600 °C"],
      ["Sizes", "1/4″ to 12″"],
    ],
  },
  {
    id: "uhp",
    label: "Ultra-high-pressure hoses",
    code: "IH / UHP",
    description:
      "Wire-spiral hoses for ultra-high-pressure circuits, water jetting and heavy mining.",
    specs: [
      ["Working pressure", "up to 10,000 psi"],
      ["Standards", "SAE 100R12 · SAE 100R13 · EN 856"],
      ["Sizes", "3/8″ to 2″"],
      ["Reinforcement", "4 / 6 wire spiral"],
    ],
  },
  {
    id: "general",
    label: "General purpose & industrial hoses",
    code: "IH / G",
    description:
      "Industrial hoses for chemical, food-grade, petroleum and workshop use.",
    specs: [
      ["Types", "Chemical · petroleum · food-grade · workshop"],
      ["Sizes", "1/4″ to 6″"],
      ["Standards", "FDA · ISI as applicable"],
      ["Use", "Process · transfer · washdown"],
    ],
  },
] as const;

export const mission =
  "We do, we deliver, we adhere to hydraulic engineering principles — What We Do Is What We Say.";

export const vision =
  "Specialize in designing and manufacturing hydraulic equipment and delivering next-generation quality and solutions.";

export const capabilities = [
  {
    label: "CNC-machined fittings",
    body: "Every fitting is precision-turned in-house on our own CNC equipment — no outsourced hardware. Banjo, BSP, SAE, ORFS and JIC forms machined to spec.",
  },
  {
    label: "High-pressure assemblies",
    body: "Hydraulic hose assemblies rated to 10,000 psi. Crimped to OEM spec and hydrostatically pressure-tested on every single assembly before despatch.",
  },
  {
    label: "ISO 9001:2015 quality",
    body: "Certified quality management system. Every order is documented, every build is checked, every despatch is traceable.",
  },
  {
    label: "Global supply",
    body: "Hose assemblies and fittings shipped to industries across India and internationally. Construction, mining, oil & gas, defence and more.",
  },
] as const;

export const positioningPoints = [
  "We machine our own fittings on CNC equipment — every banjo, BSP, ORFS and SAE fitting is precision-turned in-house before it's crimped onto a hose.",
  "Assemblies rated to 10,000 psi. Every single assembly is hydrostatically pressure-tested before it leaves the facility.",
  "ISO 9001:2015 certified. Documentation, traceability and corrective-action records at every stage of the build.",
  "Supplying construction, mining, cement, oil & gas, defence and automobile industries across India and globally — from a 30-year-established base in Tiruchengode.",
];

/**
 * Photo for each product category (keyed by productCategories[].id).
 * fit "contain" = cut-out product on white → show on a .product-tile
 * (mix-blend-multiply removes the white). fit "cover" = scene photo.
 */
export const categoryVisuals: Record<
  string,
  { src: string; fit: "contain" | "cover"; position?: string }
> = {
  hoses:                  { src: "/products/assy-hose-assembly-alt.png", fit: "cover", position: "50% 40%" },
  assemblies:             { src: "/products/boom-hose-assembly.png", fit: "cover", position: "50% 35%" },
  fittings:               { src: "/products/single-fitting.png", fit: "contain" },
  seals:                  { src: "/im/orings.jpg", fit: "contain" },
  couplings:              { src: "/im/couplings.jpg", fit: "contain" },
  "air-water-gas":        { src: "/products/earth-movers.png", fit: "contain" },
  "stainless-corrugated": { src: "/stock/hydraulic-tubes.jpg", fit: "cover" },
  uhp:                    { src: "/products/rock-breaker.png", fit: "cover" },
  general:                { src: "/products/hose-guard-20mm-safety.png", fit: "contain" },
};

/**
 * How an order moves through India Hydraulics — from the owner's own
 * description of the day-to-day flow (PO → stock check → plan → build →
 * test → despatch). Used by <OrderFlow>.
 */
export const orderFlow = [
  {
    title: "Enquiry & drawing",
    body: "Send a PO, part number, sample or drawing. We confirm the duty — pressure, media, temperature and end fittings.",
  },
  {
    title: "Stock check & plan",
    body: "Your PO is checked against stock. Standard items ship from stock; specials are planned into production.",
  },
  {
    title: "Machine & crimp",
    body: "Fittings are CNC-machined in-house. Hoses are cut and crimped to OEM specification.",
  },
  {
    title: "Pressure test",
    body: "Every assembly is hydrostatically pressure-tested before it leaves the facility.",
  },
  {
    title: "Document & despatch",
    body: "Inspected, documented and despatched — across India and for export.",
  },
] as const;

/**
 * The three promises from the client's own design reference
 * (public/im/design_idea.png).
 */
export const pillars = [
  {
    title: "Quality process",
    body: "Our quality assurance team and adherence to industry standards keep every project on its delivery schedule.",
  },
  {
    title: "End-to-end service",
    body: "Hose, fittings, adapters and seals from one supplier — from drawing review to a crimped, tested assembly.",
  },
  {
    title: "Delivery on time",
    body: "Hose assemblies and other fluid-conveyance products supplied on time, across India and overseas.",
  },
] as const;
