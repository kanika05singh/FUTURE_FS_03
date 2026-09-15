import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { services, serviceCategories } from "../data/businessData";
import GraphicTile from "./ui/GraphicTile";
import Reveal from "./ui/Reveal";

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("All");

  const visibleServices =
    activeCategory === "All" ? services : services.filter((item) => item.category === activeCategory);

  const categoryCounts = useMemo(() => {
    const counts = { All: services.length };
    serviceCategories.forEach((category) => {
      if (category === "All") return;
      counts[category] = services.filter((item) => item.category === category).length;
    });
    return counts;
  }, []);

  return (
    <section id="services" className="bg-paper-soft py-24 sm:py-28">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <Reveal className="max-w-xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            From the fire, to the table.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ash">
            A working sample of the menu — everything below is grilled, smoked or finished over
            charcoal. Full menu, including vegetarian options, is available at the table.
          </p>
        </Reveal>

        {/* Category filters */}
        <Reveal delay={100} className="mt-10 flex flex-wrap gap-2">
          {serviceCategories.map((category) => {
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={isActive}
                className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "border-ink bg-ink text-paper"
                    : "border-line bg-transparent text-ash hover:-translate-y-0.5 hover:border-ink hover:text-ink"
                }`}
              >
                {category}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-xs font-semibold tabular-nums ${
                    isActive ? "bg-white/15 text-paper" : "bg-line/70 text-ash"
                  }`}
                >
                  {categoryCounts[category]}
                </span>
              </button>
            );
          })}
        </Reveal>

        {/* Cards — remounted (via key) on every category change so the grid
            replays a staggered entrance each time you switch filters. */}
        <div key={activeCategory} className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleServices.map((item, index) => (
            <article
              key={item.id}
              className="group animate-fade-up overflow-hidden rounded-2xl bg-paper opacity-0 shadow-sm ring-1 ring-line transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
            >
              <div className="overflow-hidden">
                <GraphicTile
                  art={item.art}
                  icon={item.icon}
                  className="h-44 w-full transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold text-ink">{item.name}</h3>
                  <span className="whitespace-nowrap font-display text-lg font-semibold text-chili">
                    {item.price}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ash">{item.description}</p>
                <a
                  href="#contact"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ink transition-colors hover:text-chili"
                >
                  Reserve a table
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-ink px-7 py-3.5 text-sm font-semibold text-paper transition-all duration-300 hover:-translate-y-0.5 hover:bg-charcoal hover:shadow-lg"
          >
            Reserve a Table
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
