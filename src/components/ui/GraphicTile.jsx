import { Flame, Beef, Fish, Martini, Cake } from "lucide-react";

// One consistent illustrated system stands in for photography across the
// site (Services + Gallery), keyed by menu category. Swap this out for real
// <img> photography later without touching any layout code — every place
// that renders a <GraphicTile art="grill" /> just needs an `image` field
// added to its data entry instead.
const PALETTES = {
  starters: { from: "#F0A202", to: "#C4331F", pattern: "dots", Icon: Flame },
  grill: { from: "#E6402A", to: "#16140F", pattern: "rays", Icon: Beef },
  seafood: { from: "#1F6F78", to: "#16140F", pattern: "waves", Icon: Fish },
  bar: { from: "#2C2620", to: "#E6402A", pattern: "grid", Icon: Martini },
  dessert: { from: "#5C2A3A", to: "#E6402A", pattern: "blobs", Icon: Cake },
};

const ICONS = { flame: Flame, beef: Beef, fish: Fish, martini: Martini, cake: Cake };

function Pattern({ type, id }) {
  switch (type) {
    case "dots":
      return (
        <>
          <pattern id={id} width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.6" fill="white" />
          </pattern>
          <rect width="100%" height="100%" fill={`url(#${id})`} />
        </>
      );
    case "grid":
      return (
        <>
          <pattern id={id} width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0H0V24" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill={`url(#${id})`} />
        </>
      );
    case "rays":
      return (
        <g stroke="white" strokeWidth="2">
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={i} x1="-20" y1={i * 40 - 60} x2="420" y2={i * 40 - 220} />
          ))}
        </g>
      );
    case "waves":
      return (
        <g fill="none" stroke="white" strokeWidth="2.5">
          {Array.from({ length: 7 }).map((_, i) => (
            <path
              key={i}
              d={`M-20 ${40 + i * 40} Q 60 ${10 + i * 40} 140 ${40 + i * 40} T 300 ${40 + i * 40} T 460 ${40 + i * 40}`}
            />
          ))}
        </g>
      );
    case "blobs":
      return (
        <g fill="white">
          <circle cx="60" cy="60" r="70" opacity="0.5" />
          <circle cx="260" cy="180" r="90" opacity="0.35" />
          <circle cx="200" cy="40" r="40" opacity="0.4" />
        </g>
      );
    default:
      return null;
  }
}

/**
 * GraphicTile
 * A bold gradient + pattern + centered icon composition, used anywhere the
 * design needs a "photo" — service cards, gallery grid, etc.
 */
export default function GraphicTile({ art = "grill", icon, label, className = "", iconClassName = "" }) {
  const palette = PALETTES[art] ?? PALETTES.grill;
  const IconComponent = icon ? ICONS[icon] ?? palette.Icon : palette.Icon;
  const patternId = `pattern-${art}`;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${palette.from}, ${palette.to})` }}
      role="img"
      aria-label={label ?? `${art} illustration`}
    >
      <svg className="absolute inset-0 h-full w-full opacity-25" preserveAspectRatio="none">
        <Pattern type={palette.pattern} id={patternId} />
      </svg>
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm ring-1 ring-white/30">
          <IconComponent className={`h-7 w-7 text-white ${iconClassName}`} strokeWidth={1.75} />
        </div>
      </div>
      {label && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <p className="font-display text-sm font-semibold text-white">{label}</p>
        </div>
      )}
    </div>
  );
}
