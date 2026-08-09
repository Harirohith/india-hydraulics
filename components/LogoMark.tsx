import * as React from "react";

/**
 * PLACEHOLDER LOGO — replace with client's actual logo file.
 *
 * Wordmark in the heading typeface with a minimal line-drawn hydraulic
 * cylinder / piston glyph to the left. The glyph is a side-view cylinder
 * with internal piston rod — a precise, geometric mark, not decorative.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Cylinder body */}
      <rect x="2" y="7" width="20" height="10" stroke="currentColor" strokeWidth="1.5" />
      {/* End caps */}
      <line x1="2" y1="7" x2="2" y2="17" stroke="currentColor" strokeWidth="1.5" />
      <line x1="22" y1="7" x2="22" y2="17" stroke="currentColor" strokeWidth="1.5" />
      {/* Piston rod (centered) */}
      <rect x="10" y="11" width="4" height="2" fill="currentColor" />
      {/* Hydraulic line connections (left/right ports) */}
      <line x1="2" y1="12" x2="0" y2="12" stroke="currentColor" strokeWidth="1.5" />
      <line x1="22" y1="12" x2="24" y2="12" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
