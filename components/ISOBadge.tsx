/**
 * ISO 9001:2015 mark — set like a certificate stamp, no icon.
 *  size  sm = one-line mark, lg = two-line block
 *  tone  light (on paper) / dark (on carbon)
 */
export function ISOBadge({
  size = "sm",
  tone = "light",
}: {
  size?: "sm" | "lg";
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  const frame = dark ? "border-fog/40 text-fog" : "border-ink text-ink";

  if (size === "lg") {
    return (
      <div className={`inline-flex items-stretch border ${frame}`}>
        <span className="flex items-center px-4 font-display text-3xl font-semibold leading-none">ISO</span>
        <span className={`flex flex-col justify-center border-l px-4 py-2.5 ${dark ? "border-fog/40" : "border-ink"}`}>
          <span className="font-mono text-sm font-semibold tracking-wide">9001:2015</span>
          <span className={`text-xs ${dark ? "text-fog-2" : "text-ink-3"}`}>Certified quality management</span>
        </span>
      </div>
    );
  }

  return (
    <span className={`inline-flex items-center border px-2.5 py-1 font-mono text-xs font-semibold tracking-wide ${frame}`}>
      ISO 9001:2015 certified
    </span>
  );
}
