// Arıkan Aydınlatma logo mark — faithful recreation of the brand badge:
// a solid red disc, a thin white inner ring, and the white "ARIKAN AYDINLATMA"
// wordmark stacked on two lines. Scales crisply at any size.

interface MarkProps {
  className?: string;
  size?: number;
  /** Brand red; defaults to the site accent. */
  color?: string;
}

export function MagazaMark({
  className = "",
  size = 40,
  color = "#E11B22",
}: MarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label="Arıkan Aydınlatma logosu"
      className={className}
    >
      <circle cx="50" cy="50" r="50" fill={color} />
      <circle
        cx="50"
        cy="50"
        r="44"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2.2"
      />
      <text
        x="50"
        y="46.5"
        textAnchor="middle"
        fontFamily="'Inter', sans-serif"
        fontSize="15.5"
        fontWeight="600"
        letterSpacing="0.5"
        fill="#FFFFFF"
      >
        ARIKAN
      </text>
      <text
        x="50"
        y="64"
        textAnchor="middle"
        fontFamily="'Inter', sans-serif"
        fontSize="13.2"
        fontWeight="500"
        letterSpacing="0.3"
        fill="#FFFFFF"
      >
        AYDINLATMA
      </text>
    </svg>
  );
}
