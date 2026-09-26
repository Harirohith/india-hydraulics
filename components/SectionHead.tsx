import * as React from "react";

/**
 * Section header, set editorially: title on the left, intro (and an
 * optional action link) on the right from lg. Reveals once on scroll.
 *
 *   <SectionHead kicker="Product range" title="Nine families, one supplier."
 *     intro="…" action={<Link className="link-arrow" …>All products <span className="arrow">→</span></Link>} />
 */
export function SectionHead({
  kicker,
  title,
  intro,
  action,
  tone = "light",
  as: Tag = "h2",
  id,
  className = "",
}: {
  kicker?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  action?: React.ReactNode;
  tone?: "light" | "dark";
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <header
      data-reveal
      className={`mb-12 grid gap-6 md:mb-16 lg:grid-cols-12 lg:items-end lg:gap-12 ${className}`}
    >
      <div className="lg:col-span-7">
        {kicker && <p className={`t-kicker ${dark ? "!text-fog-2" : ""}`}>{kicker}</p>}
        <Tag id={id} className={`t-h2 mt-3 ${dark ? "text-white" : "text-ink"}`}>
          {title}
        </Tag>
      </div>
      {(intro || action) && (
        <div className="lg:col-span-5">
          {intro && <p className={`t-lede ${dark ? "!text-fog-2" : ""}`}>{intro}</p>}
          {action && <div className={intro ? "mt-6" : ""}>{action}</div>}
        </div>
      )}
    </header>
  );
}
