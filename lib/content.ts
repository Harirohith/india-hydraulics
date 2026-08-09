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
  emailHref: "mailto:enquiry@indiahydraulics.example",
  // PLACEHOLDER email — client to replace.
};

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

export const industries = [
  "Construction machinery",
  "Cement",
  "Water well drilling rigs",
  "Injection moulding",
  "Paper industry",
  "Machine tools",
  "Surface & underground mining",
  "Defence",
  "Oil & gas",
  "Automobile",
] as const;

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
