import * as React from "react";

/**
 * Cross-section of a hydraulic hose assembly — schematic, technical-drawing
 * style.
 *
 * Set `flow` to render a moving fluid line through the inner bore
 * (animated stroke-dashoffset, 3s linear loop). Honors prefers-reduced-motion
 * via the global .flow-line rule.
 */
export function HoseCrossSection({
  className,
  flow = false,
}: {
  className?: string;
  flow?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 400 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <g stroke="currentColor" fill="none">
        {/* Outer jacket (top half) */}
        <line x1="20" y1="60" x2="380" y2="60" strokeWidth="2" />
        {/* Inner tube */}
        <line x1="40" y1="90" x2="360" y2="90" strokeWidth="1.5" />
        <line x1="40" y1="110" x2="360" y2="110" strokeWidth="1.5" />
        {/* Inner bore — dashed reference (faint) */}
        <line
          x1="40"
          y1="100"
          x2="360"
          y2="100"
          strokeDasharray="3 3"
          strokeWidth="0.6"
          opacity="0.5"
        />
        {/* Flow line — only when flow=true. Travels left → right through the bore. */}
        {flow && (
          <line
            x1="40"
            y1="100"
            x2="360"
            y2="100"
            strokeWidth="1.5"
            stroke="var(--brand)"
            className="flow-line"
            style={
              { "--flow-len": "320", "--flow-dur": "2.4s" } as React.CSSProperties
            }
          />
        )}
        {/* Reinforcement braid (cross-hatch) */}
        <g opacity="0.7" strokeWidth="0.6" className={flow ? "breathe" : undefined}>
          {Array.from({ length: 18 }).map((_, i) => (
            <line
              key={i}
              x1={20 + i * 20}
              y1="60"
              x2={20 + i * 20 + 10}
              y2="90"
            />
          ))}
          {Array.from({ length: 18 }).map((_, i) => (
            <line
              key={`b-${i}`}
              x1={30 + i * 20}
              y1="60"
              x2={20 + i * 20}
              y2="90"
            />
          ))}
        </g>
        {/* End fitting */}
        <rect x="0" y="40" width="20" height="120" strokeWidth="1.5" />
        <rect x="380" y="40" width="20" height="120" strokeWidth="1.5" />
        {/* Labels */}
        <g
          fontFamily="monospace"
          fontSize="8"
          letterSpacing="1.5"
          fill="currentColor"
          stroke="none"
        >
          <text x="200" y="20" textAnchor="middle">
            SECTION A — A
          </text>
          <text x="200" y="190" textAnchor="middle" opacity="0.6">
            HOSE ASSEMBLY · ISO 1436 / SAE 100R2
          </text>
        </g>
        {/* Callouts */}
        <g
          fontFamily="monospace"
          fontSize="7"
          letterSpacing="1"
          fill="currentColor"
          stroke="none"
          opacity="0.75"
        >
          <line x1="100" y1="55" x2="100" y2="30" strokeWidth="0.5" />
          <text x="100" y="22" textAnchor="middle">
            OUTER JACKET
          </text>
          <line x1="200" y1="100" x2="280" y2="100" strokeWidth="0.5" />
          <text x="280" y="98">
            {flow ? "FLOW →" : "INNER TUBE"}
          </text>
          <line x1="300" y1="75" x2="350" y2="60" strokeWidth="0.5" />
          <text x="350" y="58">
            BRAID
          </text>
        </g>
      </g>
    </svg>
  );
}
