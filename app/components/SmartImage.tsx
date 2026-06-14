import Image from "next/image";

type Brand = "magaza" | "exclusive";

interface SmartImageProps {
  /** Real photo URL. When omitted, a themed placeholder is rendered. */
  src?: string;
  alt: string;
  brand?: Brand;
  /** Optional caption shown faintly on the placeholder. */
  label?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

// Renders next/image (fill, object-cover) when a src is supplied, otherwise a
// premium gradient "glow" placeholder with an elegant chandelier line drawing.
export default function SmartImage({
  src,
  alt,
  brand = "magaza",
  label,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: SmartImageProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${className}`}
      />
    );
  }

  const isMagaza = brand === "magaza";
  const base = isMagaza ? "#F1ECE4" : "#141210";
  const glow = isMagaza
    ? "radial-gradient(ellipse 65% 55% at 50% 38%, rgba(225,27,34,0.10), rgba(255,255,255,0) 70%)"
    : "radial-gradient(ellipse 65% 55% at 50% 38%, rgba(212,175,110,0.20), rgba(20,18,16,0) 70%)";
  const warm = isMagaza
    ? "radial-gradient(circle at 50% 30%, rgba(255,247,235,0.7), transparent 55%)"
    : "radial-gradient(circle at 50% 30%, rgba(227,200,146,0.10), transparent 55%)";
  const stroke = isMagaza ? "#C9322F" : "#D4AF6E";
  const labelColor = isMagaza ? "text-[#8A8178]" : "text-[#978E82]";
  const labelFont = isMagaza ? "font-jost" : "font-montserrat";

  return (
    <div
      role="img"
      aria-label={alt}
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ backgroundColor: base }}
    >
      <div aria-hidden className="absolute inset-0" style={{ background: warm }} />
      <div aria-hidden className="absolute inset-0" style={{ background: glow }} />

      {/* elegant chandelier line drawing */}
      <svg
        aria-hidden
        viewBox="0 0 120 140"
        className="absolute left-1/2 top-[34%] h-[44%] -translate-x-1/2 -translate-y-1/2 opacity-[0.22]"
        fill="none"
        stroke={stroke}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* suspension rod + canopy */}
        <line x1="60" y1="2" x2="60" y2="20" />
        <path d="M52 20 H68" />
        {/* central body */}
        <path d="M60 20 C 54 30, 54 42, 60 50 C 66 42, 66 30, 60 20 Z" />
        {/* arms */}
        <path d="M60 36 C 40 40, 26 50, 22 66" />
        <path d="M60 36 C 80 40, 94 50, 98 66" />
        <path d="M60 44 C 48 52, 42 62, 42 74" />
        <path d="M60 44 C 72 52, 78 62, 78 74" />
        {/* candle bulbs */}
        <circle cx="22" cy="70" r="3.4" />
        <line x1="22" y1="73.4" x2="22" y2="80" />
        <circle cx="98" cy="70" r="3.4" />
        <line x1="98" y1="73.4" x2="98" y2="80" />
        <circle cx="42" cy="78" r="3.4" />
        <line x1="42" y1="81.4" x2="42" y2="88" />
        <circle cx="78" cy="78" r="3.4" />
        <line x1="78" y1="81.4" x2="78" y2="88" />
        {/* lower drop */}
        <line x1="60" y1="50" x2="60" y2="60" />
        <circle cx="60" cy="64" r="4" />
      </svg>

      {/* diagonal sheen */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          background: isMagaza
            ? "linear-gradient(115deg, transparent 42%, rgba(255,255,255,0.35) 50%, transparent 58%)"
            : "linear-gradient(115deg, transparent 42%, rgba(255,255,255,0.04) 50%, transparent 58%)",
        }}
      />

      {label && (
        <span
          className={`absolute bottom-3 left-3 text-[9px] uppercase tracking-[0.2em] opacity-60 ${labelFont} ${labelColor}`}
        >
          {label}
        </span>
      )}
    </div>
  );
}
