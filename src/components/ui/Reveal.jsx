import { useInView } from "../../hooks/useInView";

/**
 * Reveal
 * Wraps any block of content and fades/slides it up once it scrolls into
 * view, using the existing useInView hook. This is what gives the whole
 * site a consistent "wakes up as you scroll" feel instead of just the
 * Hero animating in and everything else appearing statically.
 *
 * Usage:
 *   <Reveal><h2>Heading</h2></Reveal>
 *   <Reveal as="li" delay={120} className="...">Item</Reveal>
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  threshold = 0.15,
  rootMargin,
  ...rest
}) {
  const { ref, isInView } = useInView(
    rootMargin ? { threshold, rootMargin } : { threshold }
  );

  return (
    <Tag
      ref={ref}
      className={`${className} ${isInView ? "animate-fade-up" : "opacity-0"}`}
      style={isInView ? { animationDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
