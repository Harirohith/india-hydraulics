import Link from "next/link";
import { orderFlow } from "@/lib/content";
import { SectionHead } from "@/components/SectionHead";
import { CTABand } from "@/components/CTABand";
import { HoseAnatomy } from "@/components/motion/HoseAnatomy";
import { OrderFlow } from "@/components/motion/OrderFlow";
import { HomeHero } from "@/components/home/HomeHero";
import { ProductRange } from "@/components/home/ProductRange";
import { QualityBand } from "@/components/home/QualityBand";
import { Works } from "@/components/home/Works";
import { IndustryIndex } from "@/components/home/IndustryIndex";

/*
 * The home page answers a buyer's questions in order:
 *   who are you → what do you supply → how is it made → can I trust it →
 *   what happens when I order → where is it made → is it for my industry →
 *   send the enquiry.
 */
export default function HomePage() {
  return (
    <>
      <HomeHero />

      <ProductRange />

      <section aria-labelledby="anatomy-title" className="section bg-paper-2">
        <div className="container-edge">
          <SectionHead
            id="anatomy-title"
            kicker="Built to spec"
            title="A crimped hose assembly, part by part."
            intro="Every assembly starts from the duty: pressure, media, temperature and end fittings. Each of the five parts is chosen, machined or crimped to match it."
            action={
              <Link href="/products#assemblies" className="link-arrow">
                Hose assembly specifications <span className="arrow" aria-hidden="true">→</span>
              </Link>
            }
          />
          <HoseAnatomy />
        </div>
      </section>

      <QualityBand />

      <section aria-labelledby="flow-title" className="section bg-paper">
        <div className="container-edge">
          <SectionHead
            id="flow-title"
            kicker="How an order moves"
            title="What happens after you send an enquiry."
            intro="We reply within one working day. Standard parts ship from stock; special parts are planned into production and pass every station below."
            action={
              <Link href="/contact#enquiry" className="link-arrow">
                Start an enquiry <span className="arrow" aria-hidden="true">→</span>
              </Link>
            }
          />
          <OrderFlow steps={orderFlow} />
        </div>
      </section>

      <Works />

      <IndustryIndex />

      <CTABand />
    </>
  );
}
