import { Flame, Leaf, Martini, Users, CalendarCheck, Clock } from "lucide-react";
import { features } from "../data/businessData";
import Reveal from "./ui/Reveal";

const ICONS = {
  flame: Flame,
  leaf: Leaf,
  martini: Martini,
  users: Users,
  "calendar-check": CalendarCheck,
  clock: Clock,
};

export default function WhyChooseUs() {
  return (
    <section className="bg-charcoal py-24 text-paper sm:py-28">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <Reveal className="max-w-xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Why regulars keep a standing table.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-paper/70">
            None of this is new — it's just done properly, every single service.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = ICONS[feature.icon] ?? Flame;
            return (
              <Reveal
                key={feature.title}
                as="div"
                delay={index * 70}
                className="group rounded-2xl border border-white/10 bg-charcoal-soft p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-chili/50 hover:shadow-xl hover:shadow-black/20"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-chili/15 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <Icon className="h-5 w-5 text-chili" strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-paper/65">{feature.description}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
