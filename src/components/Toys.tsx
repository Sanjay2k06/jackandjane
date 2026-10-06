// Simple hand-drawn style toy shapes (no external images).
type P = { className?: string };
const s = { stroke: "var(--color-foreground)", strokeWidth: 2.5, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

export const Star = ({ className }: P) => (
  <svg viewBox="0 0 60 60" className={className} aria-hidden>
    <path d="M30 5l7 16 17 2-13 11 4 17-15-9-15 9 4-17L6 23l17-2z" fill="var(--color-butter)" {...s} />
  </svg>
);
export const Cloud = ({ className }: P) => (
  <svg viewBox="0 0 120 70" className={className} aria-hidden>
    <path d="M25 60h70a20 20 0 000-40 28 28 0 00-52-4A22 22 0 0025 60z" fill="var(--color-card)" {...s} />
  </svg>
);
export const Balloon = ({ className, color = "var(--color-peach)" }: P & { color?: string }) => (
  <svg viewBox="0 0 60 110" className={className} aria-hidden>
    <ellipse cx="30" cy="32" rx="24" ry="28" fill={color} {...s} />
    <path d="M27 60l3 5 3-5z" fill={color} {...s} />
    <path d="M30 65c-6 12 6 20 0 40" fill="none" {...s} strokeWidth={1.8} />
    <path d="M18 22c3-6 8-9 13-9" fill="none" stroke="var(--color-card)" strokeWidth={3} strokeLinecap="round" />
  </svg>
);
export const Block = ({ className, letter, color }: P & { letter: string; color: string }) => (
  <svg viewBox="0 0 80 80" className={className} aria-hidden>
    <rect x="6" y="6" width="68" height="68" rx="8" fill={color} {...s} />
    <rect x="15" y="15" width="50" height="50" rx="5" fill="none" {...s} strokeWidth={1.5} strokeDasharray="4 5" />
    <text x="40" y="54" textAnchor="middle" fontFamily="Fraunces, serif" fontWeight="700" fontSize="36" fill="var(--color-foreground)">{letter}</text>
  </svg>
);
export const Puzzle = ({ className, color = "var(--color-sage)" }: P & { color?: string }) => (
  <svg viewBox="0 0 80 80" className={className} aria-hidden>
    <path d="M10 22h16a8 8 0 1116 0h16v16a8 8 0 110 16v16H42a8 8 0 10-16 0H10V54a8 8 0 100-16z" fill={color} {...s} />
  </svg>
);
export const Plane = ({ className }: P) => (
  <svg viewBox="0 0 90 60" className={className} aria-hidden>
    <path d="M5 30L85 6 60 54 44 38z" fill="var(--color-card)" {...s} />
    <path d="M44 38L85 6M44 38l-4 16 10-10" fill="none" {...s} />
  </svg>
);
