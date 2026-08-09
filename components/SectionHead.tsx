import * as React from "react";

/**
 * Section heading. Eyebrow (section number) is intentionally restrained:
 * per the taste skill, max 1 eyebrow per 3 sections. Use sparingly.
 */
export function SectionHead({
  num,
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  /** Section number e.g. "01 / 05" — rendered as monospace coord label */
  num?: string;
  /** Optional eyebrow label above title. Should be uppercase mono. */
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <header
      className={`mb-12 md:mb-16 max-w-3xl ${
        align === "center" ? "mx-auto text-center" : ""
      }`}
    >
      {(num || eyebrow) && (
        <div className="mb-5 flex items-center gap-3 text-brand">
          {num && (
            <span className="font-mono text-micro tracking-label uppercase text-ink-3">
              {num}
            </span>
          )}
          {num && eyebrow && (
            <span className="block h-px w-8 bg-brand-dim" aria-hidden="true" />
          )}
          {eyebrow && (
            <span className="font-mono text-micro tracking-label uppercase text-brand">
              {eyebrow}
            </span>
          )}
        </div>
      )}
      <h2 className="font-display text-h3 md:text-h2 font-medium tracking-tight2 text-ink-1">
        {title}
      </h2>
      {intro && (
        <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-ink-2">
          {intro}
        </p>
      )}
    </header>
  );
}
