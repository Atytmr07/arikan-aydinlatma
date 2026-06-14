"use client";

import { motion } from "framer-motion";

// Builds a smooth horizontal wave path made of alternating cubic curves.
function buildWave(
  y: number,
  amp: number,
  segs: number,
  width: number,
  flip: boolean
): string {
  const seg = width / segs;
  let d = `M 0 ${y.toFixed(1)}`;
  for (let i = 0; i < segs; i++) {
    const x1 = i * seg + seg / 3;
    const x2 = i * seg + (2 * seg) / 3;
    const x = (i + 1) * seg;
    const dir = (i + (flip ? 1 : 0)) % 2 === 0 ? -1 : 1;
    const cy = y + dir * amp;
    d += ` C ${x1.toFixed(1)} ${cy.toFixed(1)}, ${x2.toFixed(1)} ${cy.toFixed(
      1
    )}, ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
}

const goldDefs = (id: string) => (
  <defs>
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="#D4AF6E" stopOpacity="0" />
      <stop offset="22%" stopColor="#D4AF6E" stopOpacity="1" />
      <stop offset="78%" stopColor="#E3C892" stopOpacity="1" />
      <stop offset="100%" stopColor="#D4AF6E" stopOpacity="0" />
    </linearGradient>
  </defs>
);

interface WaveFieldProps {
  className?: string;
  lines?: number;
}

// Full-bleed field of flowing gold wave lines. Used as a hero backdrop.
export function WaveField({ className = "", lines = 9 }: WaveFieldProps) {
  const W = 1200;
  const H = 600;
  const paths = Array.from({ length: lines }).map((_, i) => {
    const y = (H / (lines + 1)) * (i + 1);
    const amp = 16 + (i % 3) * 12;
    return {
      d: buildWave(y, amp, 5, W, i % 2 === 0),
      op: 0.1 + (i % 4) * 0.07,
      i,
    };
  });

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <motion.svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        initial="hidden"
        animate="show"
      >
        {goldDefs("waveFieldGold")}
        <motion.g
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        >
          {paths.map((p) => (
            <motion.path
              key={p.i}
              d={p.d}
              fill="none"
              stroke="url(#waveFieldGold)"
              strokeWidth={1}
              style={{ opacity: p.op }}
              variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1 } }}
              transition={{
                duration: 2.6,
                ease: "easeInOut",
                delay: 0.3 + p.i * 0.12,
              }}
            />
          ))}
        </motion.g>
      </motion.svg>
    </div>
  );
}

interface WaveDividerProps {
  className?: string;
  amplitude?: number;
}

// A single animated wave line used as an elegant section separator.
export function WaveDivider({ className = "", amplitude = 9 }: WaveDividerProps) {
  return (
    <div aria-hidden className={`pointer-events-none w-full ${className}`}>
      <motion.svg
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        className="h-8 w-full"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
      >
        {goldDefs("waveDividerGold")}
        <motion.path
          d={buildWave(20, amplitude, 9, 1200, false)}
          fill="none"
          stroke="url(#waveDividerGold)"
          strokeWidth={1}
          variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1 } }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
        />
      </motion.svg>
    </div>
  );
}
