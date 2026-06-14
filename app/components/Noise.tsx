// Inline SVG grain overlay using feTurbulence. Decorative only.
// `id` must be unique per instance to avoid filter collisions in the DOM.

interface NoiseProps {
  opacity?: number;
  baseFrequency?: number;
  numOctaves?: number;
  id: string;
  className?: string;
}

export default function Noise({
  opacity = 0.04,
  baseFrequency = 0.65,
  numOctaves = 3,
  id,
  className = "",
}: NoiseProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-[1] mix-blend-overlay ${className}`}
      style={{ opacity }}
    >
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <filter id={id}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency={baseFrequency}
            numOctaves={numOctaves}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${id})`} />
      </svg>
    </div>
  );
}
