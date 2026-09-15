/**
 * EmberMark
 * The site's one recurring abstract graphic — a stylised ember/flame shape,
 * reused (at different sizes, positions and opacities) in the Hero, About
 * and CTA sections so the brand has a single memorable visual signature
 * instead of a different decorative flourish in every section.
 */
export default function EmberMark({ className = "", color = "#E6402A" }) {
  return (
    <svg viewBox="0 0 400 480" fill="none" className={className} aria-hidden="true">
      <path
        d="M200 20c70 84 120 148 120 228a120 120 0 1 1-240 0c0-38 14-66 36-92 2 38 20 60 42 60 24 0 32-22 24-50-16-54-6-108 18-146Z"
        fill={color}
      />
    </svg>
  );
}
