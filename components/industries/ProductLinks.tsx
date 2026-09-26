import Link from "next/link";

export type ProductLink = { readonly label: string; readonly href: string };

/**
 * "Products used": the product families an industry buys, as a list of text
 * links into the catalogue (hrefs come from industryDetails).
 *
 * Lighter than .link-arrow on purpose: these are dense cross-reference lists
 * (up to 30 on the page), so the underline is a hairline that turns indigo on
 * hover. Label and arrow flow inline, so a long label wraps with its arrow
 * attached. py-2 on a 28px line gives a 44px tap target (kept on every touch
 * screen; tightened only for a mouse on wide screens); the flex <li> stops
 * extra line-box space collecting under each link.
 */
export function ProductLinks({
  products,
  className = "",
}: {
  products: readonly ProductLink[];
  className?: string;
}) {
  return (
    <ul className={className}>
      {products.map((p) => (
        <li key={p.href} className="flex">
          <Link
            href={p.href}
            className="group/pl py-2 font-medium text-ink transition-colors duration-200 hover:text-brand lg:[@media(pointer:fine)]:py-0.5"
          >
            <span className="underline decoration-rule-2 decoration-1 underline-offset-[0.3em] transition-colors duration-200 group-hover/pl:decoration-current">
              {p.label}
            </span>
            {/* No-break space + plain inline arrow: it never wraps away from the last word
                (Chrome allows a break before an inline-block). Nudged with `left`, not a transform. */}
            {" "}
            <span
              aria-hidden="true"
              className="relative left-0 pl-1 text-ink-3 transition-[left,color] duration-200 ease-out group-hover/pl:left-1 group-hover/pl:text-current"
            >
              →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
