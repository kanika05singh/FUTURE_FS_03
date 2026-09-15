import { businessData } from "../data/businessData";
import { useInView } from "../hooks/useInView";
import { useCountUp } from "../hooks/useCountUp";
import GraphicTile from "./ui/GraphicTile";
import Reveal from "./ui/Reveal";

const VALUES = ["Fire First", "Sourced Local", "Everyone's Welcome"];

function Stat({ stat, start, delay }) {
  const value = useCountUp(stat.value, start, { decimals: stat.decimals ?? 0 });
  const display = stat.decimals ? value.toFixed(stat.decimals) : Math.round(value);

  return (
    <div
      className={`border-l-2 border-line pl-4 transition-opacity duration-500 ${
        start ? "opacity-100" : "opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <p className="font-display text-3xl font-semibold text-ink sm:text-4xl">
        {display}
        {stat.suffix}
      </p>
      <p className="mt-1 text-sm text-ash">{stat.label}</p>
    </div>
  );
}

export default function About() {
  const { ref, isInView } = useInView({ threshold: 0.3 });

  return (
    <section id="about" className="bg-paper py-24 sm:py-28">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Graphic panel */}
          <Reveal className="group relative">
            <GraphicTile
              art="grill"
              className="aspect-[4/5] w-full rounded-3xl shadow-lg transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-hover:shadow-2xl"
              iconClassName="h-10 w-10 transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute -bottom-6 -right-4 rounded-2xl bg-ink px-6 py-4 text-paper shadow-xl transition-transform duration-500 group-hover:-translate-y-1 sm:-right-8">
              <p className="font-display text-2xl font-semibold">{businessData.founded}</p>
              <p className="text-xs text-paper/60">Est. in Koramangala</p>
            </div>
          </Reveal>

          {/* Story */}
          <div>
            <Reveal delay={80}>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Twenty tables. One open flame.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ash">{businessData.description}</p>
              <p className="mt-4 text-base leading-relaxed text-ash">{businessData.mission}</p>
            </Reveal>

            <Reveal delay={160} className="mt-6 flex flex-wrap gap-2">
              {VALUES.map((value) => (
                <span
                  key={value}
                  className="rounded-full border border-line px-4 py-1.5 text-sm font-medium text-ink transition-colors hover:border-chili hover:text-chili"
                >
                  {value}
                </span>
              ))}
            </Reveal>

            {/* Stats */}
            <div ref={ref} className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {businessData.stats.map((stat, index) => (
                <Stat key={stat.label} stat={stat} start={isInView} delay={index * 90} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
