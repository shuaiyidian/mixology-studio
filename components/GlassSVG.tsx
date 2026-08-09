// Stylized SVG glassware illustrations. Single-color, currentColor-driven so
// they pick up the surrounding text color. Viewbox is 80x96 across all variants
// for consistent layout in cards.

import type { JSX } from "react";

type GlassType =
  | "rocks"
  | "coupe"
  | "highball"
  | "collins"
  | "flute"
  | "nick-nora"
  | "martini"
  | "hurricane"
  | string;

interface GlassSVGProps {
  glass: GlassType;
  className?: string;
  /** 0-1, how full the glass appears. */
  fill?: number;
  /** Accent color for the liquid. Defaults to currentColor. */
  liquidColor?: string;
  title?: string;
}

function Normalized(g: string): GlassType {
  const k = g.toLowerCase().trim();
  if (k === "rock" || k === "old-fashioned" || k === "lowball") return "rocks";
  if (k === "nick" || k === "nick & nora" || k === "nick and nora" || k === "nicknora")
    return "nick-nora";
  return k as GlassType;
}

function GlassShape({ glass, fill, color }: { glass: GlassType; fill: number; color: string }) {
  // All paths drawn within viewBox 0 0 80 96. Glass outline in currentColor,
  // liquid clipped to glass shape with `fill` controlling how full (0-1).
  const f = Math.max(0.15, Math.min(0.95, fill));
  const liquidY = 80 - 60 * f; // top of liquid line
  const wrap = (children: JSX.Element, clipId: string) => (
    <g clipPath={`url(#${clipId})`}>{children}</g>
  );

  switch (glass) {
    case "rocks": {
      // Wide short tumbler
      return (
        <g>
          <defs>
            <clipPath id="g-rocks">
              <path d="M14 30 H66 V82 Q66 86 62 86 H18 Q14 86 14 82 Z" />
            </clipPath>
          </defs>
          {wrap(
            <rect x="0" y={liquidY} width="80" height="86" fill={color} opacity="0.85" />,
            "g-rocks",
          )}
          <path
            d="M14 30 H66 V82 Q66 86 62 86 H18 Q14 86 14 82 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Ice cube hint */}
          <rect x="24" y={liquidY + 4} width="14" height="14" rx="2" fill="white" opacity="0.5" />
          <rect x="42" y={liquidY + 8} width="12" height="12" rx="2" fill="white" opacity="0.4" />
        </g>
      );
    }
    case "coupe": {
      // Wide shallow V bowl
      return (
        <g>
          <defs>
            <clipPath id="g-coupe">
              <path d="M10 22 Q40 18 70 22 Q66 50 40 60 Q14 50 10 22 Z" />
            </clipPath>
          </defs>
          {wrap(
            <ellipse cx="40" cy={liquidY - 4} rx="30" ry="40" fill={color} opacity="0.85" />,
            "g-coupe",
          )}
          <path
            d="M10 22 Q40 18 70 22 Q66 50 40 60 Q14 50 10 22 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <line x1="40" y1="60" x2="40" y2="86" stroke="currentColor" strokeWidth="2" />
          <line x1="20" y1="86" x2="60" y2="86" stroke="currentColor" strokeWidth="2" />
        </g>
      );
    }
    case "martini": {
      // Inverted triangle
      return (
        <g>
          <defs>
            <clipPath id="g-martini">
              <path d="M10 22 H70 L42 60 Z" />
            </clipPath>
          </defs>
          {wrap(
            <polygon points={`10,${liquidY} 70,${liquidY} 42,${liquidY + (60 - liquidY) * 0.9}`} fill={color} opacity="0.85" />,
            "g-martini",
          )}
          <path d="M10 22 H70 L42 60 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <line x1="42" y1="60" x2="42" y2="86" stroke="currentColor" strokeWidth="2" />
          <line x1="20" y1="86" x2="64" y2="86" stroke="currentColor" strokeWidth="2" />
        </g>
      );
    }
    case "highball":
    case "collins": {
      // Tall straight tumbler
      const collins = glass === "collins";
      return (
        <g>
          <defs>
            <clipPath id="g-hb">
              <rect x="18" y="14" width="44" height={collins ? 74 : 70} rx="2" />
            </clipPath>
          </defs>
          {wrap(
            <rect x="0" y={liquidY - 6} width="80" height="80" fill={color} opacity="0.85" />,
            "g-hb",
          )}
          <rect
            x="18"
            y="14"
            width="44"
            height={collins ? 74 : 70}
            rx="2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          {/* Bubbles */}
          <circle cx="32" cy={liquidY + 8} r="1.2" fill="white" opacity="0.7" />
          <circle cx="44" cy={liquidY + 14} r="1" fill="white" opacity="0.6" />
          <circle cx="50" cy={liquidY + 4} r="1.4" fill="white" opacity="0.7" />
          <circle cx="38" cy={liquidY + 22} r="1" fill="white" opacity="0.5" />
        </g>
      );
    }
    case "flute": {
      // Tall narrow with tapered top
      return (
        <g>
          <defs>
            <clipPath id="g-flute">
              <path d="M28 12 H52 L48 84 H32 Z" />
            </clipPath>
          </defs>
          {wrap(
            <polygon
              points={`28,${liquidY - 4} 52,${liquidY - 4} 48,${liquidY + (84 - liquidY) * 0.95} 32,${liquidY + (84 - liquidY) * 0.95}`}
              fill={color}
              opacity="0.85"
            />,
            "g-flute",
          )}
          <path d="M28 12 H52 L48 84 H32 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <line x1="20" y1="84" x2="60" y2="84" stroke="currentColor" strokeWidth="2" />
          {/* Bubbles rising */}
          <circle cx="38" cy={liquidY + 6} r="0.8" fill="white" opacity="0.7" />
          <circle cx="42" cy={liquidY + 18} r="1" fill="white" opacity="0.6" />
          <circle cx="40" cy={liquidY + 30} r="0.8" fill="white" opacity="0.5" />
        </g>
      );
    }
    case "nick-nora": {
      // Smaller V bowl
      return (
        <g>
          <defs>
            <clipPath id="g-nn">
              <path d="M16 26 Q40 22 64 26 Q60 48 40 56 Q20 48 16 26 Z" />
            </clipPath>
          </defs>
          {wrap(
            <ellipse cx="40" cy={liquidY - 4} rx="24" ry="32" fill={color} opacity="0.85" />,
            "g-nn",
          )}
          <path
            d="M16 26 Q40 22 64 26 Q60 48 40 56 Q20 48 16 26 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <line x1="40" y1="56" x2="40" y2="84" stroke="currentColor" strokeWidth="2" />
          <line x1="22" y1="84" x2="58" y2="84" stroke="currentColor" strokeWidth="2" />
        </g>
      );
    }
    case "hurricane": {
      // Curvy tall glass
      return (
        <g>
          <defs>
            <clipPath id="g-hur">
              <path d="M22 12 Q14 30 22 50 Q14 70 22 84 H58 Q66 70 58 50 Q66 30 58 12 Z" />
            </clipPath>
          </defs>
          {wrap(
            <path
              d={`M0 ${liquidY - 2} H80 V84 H0 Z`}
              fill={color}
              opacity="0.85"
            />,
            "g-hur",
          )}
          <path
            d="M22 12 Q14 30 22 50 Q14 70 22 84 H58 Q66 70 58 50 Q66 30 58 12 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </g>
      );
    }
    default: {
      // Generic tumbler fallback
      return (
        <g>
          <defs>
            <clipPath id="g-default">
              <rect x="20" y="18" width="40" height="68" rx="3" />
            </clipPath>
          </defs>
          {wrap(
            <rect x="0" y={liquidY - 4} width="80" height="80" fill={color} opacity="0.85" />,
            "g-default",
          )}
          <rect x="20" y="18" width="40" height="68" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
        </g>
      );
    }
  }
}

export function GlassSVG({ glass, className, fill = 0.7, liquidColor, title }: GlassSVGProps) {
  const g = Normalized(glass);
  return (
    <svg
      viewBox="0 0 80 96"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={title ?? `玻璃杯：${g}`}
    >
      <title>{title ?? `玻璃杯：${g}`}</title>
      <GlassShape glass={g} fill={fill} color={liquidColor ?? "var(--color-accent)"} />
    </svg>
  );
}
