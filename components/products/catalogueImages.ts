/*
 * How each catalogue photo sits in its 4:3 cell. The marketplace photos are a
 * mix of cut-outs on white and pictures with their own grey, coloured or scene
 * backgrounds:
 *   contain — a cut-out on white floats in the photo well (multiply blend
 *             drops the white); `tone` lifts an off-white backdrop to white
 *   cover   — a photo with its own backdrop fills the cell edge to edge
 * `zoom` crops further than object-position can (baked-in captions, a
 * maker's logo, white edge strips).
 */

export type CellImage = {
  fit: "cover" | "contain";
  position?: string;
  zoom?: { scale: number; origin: string };
  tone?: string;
};

const TREATMENT: Record<string, CellImage> = {
  "/products/assy-hose-assembly.png": { fit: "cover" },
  // "HYDRAULIC HOSE" caption sits bottom-left; show the right-hand end.
  "/products/valve-bank-hose-assembly.png": { fit: "cover", position: "88% 50%" },
  "/products/cement-hose-assembly.png": { fit: "cover" },
  "/products/boom-hose-assembly.png": { fit: "cover", position: "50% 45%" },
  // Maker's logo top-right and a white strip along the bottom edge.
  "/products/rock-breaker.png": { fit: "cover", position: "0% 0%", zoom: { scale: 1.16, origin: "0% 0%" } },
  "/products/earth-movers.png": { fit: "contain", tone: "grayscale brightness-[1.35] contrast-[1.05]" },
  "/products/single-fitting.png": { fit: "contain", tone: "brightness-[1.05]" },
  "/products/sae-flange-fitting.png": { fit: "cover" },
  "/products/bsp-stem-fitting.png": { fit: "cover" },
  "/products/bsp-fitting.png": { fit: "cover" },
  "/products/cap-fitting.png": { fit: "cover" },
  "/products/banjo-fitting.png": { fit: "cover" },
  "/products/orfs-fitting.png": { fit: "cover" },
  "/products/connectors.jpg": { fit: "cover" },
  "/products/straight-adapter-unf-o-ring-port.png": { fit: "contain", tone: "brightness-[1.14]" },
  // Faint grey rule along the top edge of the print.
  "/products/straight-adapter-bsp-unf.png": { fit: "contain", tone: "brightness-[1.1]" },
  // Caption across the top of a green card: crop it off and drop the green.
  "/products/hose-o-ring.png": {
    fit: "cover",
    position: "50% 100%",
    zoom: { scale: 1.3, origin: "50% 100%" },
    tone: "grayscale",
  },
  "/products/hose-guard-20mm-safety.png": { fit: "cover" },
};

export const cellImage = (src: string): CellImage => TREATMENT[src] ?? { fit: "contain" };
