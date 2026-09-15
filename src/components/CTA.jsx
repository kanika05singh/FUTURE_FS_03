import { MessageCircle, ArrowRight } from "lucide-react";
import { businessData } from "../data/businessData";
import EmberMark from "./ui/EmberMark";
import Reveal from "./ui/Reveal";

export default function CTA() {
  const whatsappUrl = `https://wa.me/${businessData.whatsapp}?text=${encodeURIComponent(
    businessData.whatsappMessage
  )}`;

  return (
    <section className="relative overflow-hidden bg-chili py-20 text-white sm:py-24">
      <div className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 animate-float opacity-15">
        <EmberMark className="h-full w-full" color="#16140F" />
      </div>
      <Reveal className="relative mx-auto max-w-content px-5 text-center sm:px-8">
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          Ready to taste it for yourself?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/85">
          Get in touch with {businessData.name} today — we'll hold you a table by the fire.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-ink px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-charcoal hover:shadow-xl hover:shadow-black/20"
          >
            Reserve a Table
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-white/70 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp Us
          </a>
        </div>
      </Reveal>
    </section>
  );
}
