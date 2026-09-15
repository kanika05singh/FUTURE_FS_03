import { useEffect, useState } from "react";
import { MapPin, Phone, Mail, Clock, Navigation, MessageCircle, Copy, Check } from "lucide-react";
import { businessData } from "../data/businessData";
import { getOpenStatus } from "../utils/openStatus";
import Reveal from "./ui/Reveal";

const STATUS_REFRESH_MS = 60_000;

export default function Location() {
  const [status, setStatus] = useState(() => getOpenStatus(businessData.openingHours));
  const [copied, setCopied] = useState(false);

  const whatsappUrl = `https://wa.me/${businessData.whatsapp}?text=${encodeURIComponent(
    businessData.whatsappMessage
  )}`;

  // Keep the "Open now" / "Closed" badge accurate without a page refresh.
  useEffect(() => {
    const id = setInterval(() => setStatus(getOpenStatus(businessData.openingHours)), STATUS_REFRESH_MS);
    return () => clearInterval(id);
  }, []);

  async function handleCopyAddress() {
    try {
      await navigator.clipboard.writeText(businessData.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be blocked by the browser — fail silently,
      // the address is still visible and selectable on the page.
    }
  }

  return (
    <section id="location" className="bg-paper py-24 sm:py-28">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <Reveal className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Find us in Koramangala.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ash">
              Street parking is limited after 8pm — valet is available at the front entrance.
            </p>
          </div>

          <span
            className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
              status.isOpen ? "bg-teal/10 text-teal" : "bg-ash/10 text-ash"
            }`}
          >
            <span className={`h-2 w-2 rounded-full ${status.isOpen ? "bg-teal animate-pulse" : "bg-ash"}`} />
            {status.label} · {status.detail}
          </span>
        </Reveal>

        <Reveal delay={100} className="mt-10 grid grid-cols-1 gap-8 overflow-hidden rounded-3xl ring-1 ring-line lg:grid-cols-2">
          <iframe
            title={`Map showing the location of ${businessData.name}`}
            src={businessData.mapEmbedSrc}
            className="h-72 w-full border-0 lg:h-full lg:min-h-[420px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          <div className="flex flex-col justify-center gap-6 p-6 sm:p-10">
            <div className="flex gap-4">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-chili" />
              <div className="flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-ink">Address</p>
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="inline-flex items-center gap-1 text-xs font-medium text-ash transition-colors hover:text-chili"
                    aria-label="Copy address to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-teal" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <p className="mt-1 text-sm text-ash">{businessData.address}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-chili" />
              <div>
                <p className="text-sm font-semibold text-ink">Phone</p>
                <a href={businessData.phoneHref} className="mt-1 block text-sm text-ash hover:text-chili">
                  {businessData.phone}
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-chili" />
              <div>
                <p className="text-sm font-semibold text-ink">Email</p>
                <a href={`mailto:${businessData.email}`} className="mt-1 block text-sm text-ash hover:text-chili">
                  {businessData.email}
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-chili" />
              <div>
                <p className="text-sm font-semibold text-ink">Opening Hours</p>
                <dl className="mt-1 space-y-0.5">
                  {businessData.openingHours.map((entry) => (
                    <div key={entry.days} className="flex gap-2 text-sm text-ash">
                      <dt className="min-w-[9.5rem]">{entry.days}</dt>
                      <dd>{entry.hours}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="mt-2 flex flex-wrap gap-3 border-t border-line pt-6">
              <a
                href={businessData.mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-all duration-300 hover:-translate-y-0.5 hover:bg-charcoal"
              >
                <Navigation className="h-4 w-4" />
                Get Directions
              </a>
              <a
                href={businessData.phoneHref}
                className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-2.5 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink"
              >
                <Phone className="h-4 w-4" />
                Call Now
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1fb757]"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
