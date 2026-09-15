import { Flame, Instagram, Facebook, Linkedin, ArrowUp } from "lucide-react";
import { businessData } from "../data/businessData";

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Location", href: "#location" },
  { label: "Contact", href: "#contact" },
];

const MENU_CATEGORIES = ["Starters", "Wood-Fired Grill", "Coastal Seafood", "Craft Cocktails", "Desserts"];

const SOCIAL = [
  { label: "Instagram", href: businessData.socialLinks.instagram, Icon: Instagram },
  { label: "Facebook", href: businessData.socialLinks.facebook, Icon: Facebook },
  { label: "LinkedIn", href: businessData.socialLinks.linkedin, Icon: Linkedin },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-paper/70">
      <div className="mx-auto max-w-content px-5 py-16 sm:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="#home" className="flex items-center gap-2 font-display text-lg font-semibold text-paper">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-chili">
                <Flame className="h-5 w-5 text-white" strokeWidth={2} />
              </span>
              {businessData.shortName}
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              A wood-fired grill and bar in {businessData.location} — cooking everything the honest
              way, over charcoal.
            </p>
            <div className="mt-5 flex gap-3">
              {SOCIAL.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-chili hover:text-chili"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-paper">Quick Links</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:text-chili">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-paper">Menu</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {MENU_CATEGORIES.map((category) => (
                <li key={category}>
                  <a href="#services" className="transition-colors hover:text-chili">
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-paper">Visit</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>{businessData.address}</li>
              <li>
                <a href={businessData.phoneHref} className="transition-colors hover:text-chili">
                  {businessData.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${businessData.email}`} className="transition-colors hover:text-chili">
                  {businessData.email}
                </a>
              </li>
            </ul>
            <ul className="mt-4 space-y-1 border-t border-white/10 pt-4 text-xs text-paper/50">
              {businessData.openingHours.map((entry) => (
                <li key={entry.days} className="flex justify-between gap-4">
                  <span>{entry.days}</span>
                  <span>{entry.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {businessData.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p>{businessData.address}</p>
            <a
              href="#home"
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/15 px-3 py-1.5 text-paper/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-chili hover:text-chili"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
