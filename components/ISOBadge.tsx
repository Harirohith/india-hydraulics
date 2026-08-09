export function ISOBadge({ size = "sm" }: { size?: "sm" | "lg" }) {
  if (size === "lg") {
    return (
      <div className="inline-flex items-center gap-3 border-2 border-brand bg-brand-dim px-5 py-3">
        <div className="flex flex-col items-center leading-none">
          <span className="text-xs font-mono uppercase tracking-widest text-brand opacity-70">Certified</span>
          <span className="text-2xl font-display font-bold text-brand leading-none">ISO</span>
        </div>
        <div className="w-px h-10 bg-brand opacity-30" />
        <div className="flex flex-col leading-none">
          <span className="text-lg font-display font-bold text-brand">9001:2015</span>
          <span className="text-xs font-medium text-ink-2 mt-0.5">Quality Management</span>
        </div>
      </div>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 border border-brand bg-brand-dim px-2.5 py-1 text-sm font-semibold text-brand">
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 16 16" fill="none">
        <path d="M8 1L10 6H15L11 9.5L12.5 15L8 11.5L3.5 15L5 9.5L1 6H6L8 1Z" fill="currentColor" opacity="0.8"/>
      </svg>
      ISO 9001:2015 Certified
    </span>
  );
}
