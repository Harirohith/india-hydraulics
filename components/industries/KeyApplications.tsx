import Image from "next/image";
import { industryDetails } from "@/lib/content";
import { ProductLinks } from "./ProductLinks";

type Industry = (typeof industryDetails)[number];

/** A segment from the shared data that has a photo. */
function segment(id: Industry["id"]) {
  const industry = industryDetails.find((i) => i.id === id);
  const image = industry?.image;
  if (!industry || !image) throw new Error(`Key application "${id}" needs a photo in industryDetails`);
  return { industry, image };
}

type Application = ReturnType<typeof segment> & {
  fig: string;
  caption: string;
  alt: string;
  /** One line: what the machine asks of a hydraulic line */
  line: string;
  bw: boolean;
};

const construction: Application = {
  ...segment("construction"),
  fig: "Fig. 1",
  caption: "Excavator boom, arm and bucket",
  alt: "Tracked excavator with its arm and bucket lowered into gravel, hydraulic lines running along the boom",
  line: "Boom, arm and bucket lines flex under load on every cycle. We crimp the assemblies to OEM spec and pressure-test each one before despatch.",
  bw: true,
};

const waterWell: Application = {
  ...segment("water-well"),
  fig: "Fig. 2",
  caption: "Truck-mounted water well rig",
  alt: "Truck-mounted water well drilling rig with its mast lowered",
  line: "Rotary head, feed and jack circuits on truck-mounted rigs, built with spiral-wire hose rated to 10,000 psi.",
  bw: true,
};

const machineTools: Application = {
  ...segment("machine-tools"),
  fig: "Fig. 3",
  caption: "Our CNC shop, Tiruchengode",
  alt: "CNC turning centres on the India Hydraulics shop floor in Tiruchengode",
  line: "Fittings and fluid lines for CNC machines and lathes — the same kind of machine our own fittings are turned on.",
  // The company's own photo: shown in colour, never wider than its 650px source.
  bw: false,
};

function Figure({
  app,
  frame,
  position,
  sizes,
  quality,
  className = "",
}: {
  app: Application;
  /** Aspect-ratio classes for the photo frame */
  frame: string;
  /** object-position classes (x stays ≤ 30% on the rig photo: third-party logo top right) */
  position: string;
  sizes: string;
  quality?: number;
  className?: string;
}) {
  return (
    <figure className={className}>
      {/* B&W photos print onto the grey well (multiply), so a white sky still shows the frame edge */}
      <div className={`relative overflow-hidden bg-paper-3 ${frame}`}>
        <Image
          src={app.image}
          alt={app.alt}
          fill
          sizes={sizes}
          quality={quality}
          className={`object-cover ${position} ${app.bw ? "photo-bw mix-blend-multiply" : ""}`}
        />
      </div>
      <figcaption className="mt-3 flex items-baseline gap-3 text-sm text-ink-3">
        <span className="font-mono text-xs font-semibold text-brand">{app.fig}</span>
        {app.caption}
      </figcaption>
    </figure>
  );
}

function Caption({ app, className = "" }: { app: Application; className?: string }) {
  return (
    <div className={`border-t border-ink pt-5 ${className}`}>
      <h3 className="t-h3 text-ink">{app.industry.label}</h3>
      <p className="mt-3 max-w-[46ch] text-ink-2">{app.line}</p>
      <p className="t-label mt-6">Products used</p>
      <ProductLinks products={app.industry.products} className="mt-1" />
    </div>
  );
}

/**
 * Three segments we can show in photographs. Construction leads, set beside
 * the section title; drilling and machine tools follow side by side.
 */
export function KeyApplications() {
  return (
    <section aria-labelledby="applications-title" className="section bg-paper">
      <div className="container-edge">
        <div
          data-reveal-group
          className="grid gap-y-6 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:gap-y-10"
        >
          <header className="mb-6 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:mb-0">
            <p className="t-kicker">Key applications</p>
            <h2 id="applications-title" className="t-h2 mt-3 text-ink">
              Three machines, three duties.
            </h2>
            <p className="t-lede mt-6">
              An excavator boom flexes all day, a borewell rig runs at high pressure, a CNC lathe needs precise
              fittings. Each duty needs a different build.
            </p>
          </header>

          {/* Same photo as the page hero, which shows the boom as a band; here, the whole machine.
              quality differs so the two <Image>s get distinct URLs (keeps the hero's LCP priority check). */}
          <Figure
            app={construction}
            frame="aspect-[4/5] sm:aspect-[4/3] lg:aspect-square"
            position="object-[50%_50%] sm:object-[50%_58%] lg:object-[50%_62%]"
            sizes="(min-width: 1320px) 704px, (min-width: 1024px) 55vw, 100vw"
            quality={70}
            className="lg:col-span-7 lg:col-start-1 lg:row-span-2 lg:row-start-1"
          />

          <Caption app={construction} className="lg:col-span-5 lg:col-start-8 lg:row-start-2 lg:self-end" />
        </div>

        <div
          data-reveal-group
          className="mt-20 grid gap-y-16 sm:grid-cols-2 sm:gap-x-8 lg:mt-28 lg:gap-x-12"
        >
          {[
            { app: waterWell, position: "object-[4%_50%]" },
            { app: machineTools, position: "object-[60%_50%]" },
          ].map(({ app, position }) => (
            <article key={app.industry.id}>
              <Figure
                app={app}
                frame="aspect-[4/3]"
                position={position}
                sizes="(min-width: 1320px) 600px, (min-width: 640px) 46vw, 100vw"
              />
              <Caption app={app} className="mt-6" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
