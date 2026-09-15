import { useEffect, useState } from "react";
import { Menu, X, Flame } from "lucide-react";
import { businessData } from "../data/businessData";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");
  const [progress, setProgress] = useState(0);

  // Toggle a solid background once the hero has been scrolled past, and
  // track how far down the page the reader has scrolled for the progress bar.
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(100, (window.scrollY / docHeight) * 100) : 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Scroll-spy: highlight whichever nav link's section is currently
  // crossing the "reading line" near the top of the viewport.
  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.querySelector(link.href)).filter(Boolean);
    if (sections.length === 0 || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHref(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-charcoal shadow-lg shadow-black/20" : "bg-transparent"
      }`}
    >
      {/* Reading-progress bar — fills left to right as you scroll the page */}
      <div className="absolute inset-x-0 top-0 h-[3px] bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-saffron to-chili transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <nav className="mx-auto flex max-w-content items-center justify-between px-5 py-4 sm:px-8">
        <a
          href="#home"
          className="group flex items-center gap-2 font-display text-lg font-semibold text-paper"
          onClick={() => setMenuOpen(false)}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-chili transition-transform duration-300 group-hover:rotate-12">
            <Flame className="h-5 w-5 text-white" strokeWidth={2} />
          </span>
          {businessData.shortName}
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeHref === link.href;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative inline-block px-3 py-2 text-sm font-medium transition-colors ${
                    isActive ? "text-saffron" : "text-paper/80 hover:text-saffron"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-saffron transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href="#contact"
          className="hidden rounded-md bg-chili px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-chili-dark hover:shadow-lg hover:shadow-chili/30 lg:inline-block"
        >
          Reserve a Table
        </a>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-md text-paper lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Menu
            className={`absolute h-6 w-6 transition-all duration-200 ${
              menuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
            }`}
          />
          <X
            className={`absolute h-6 w-6 transition-all duration-200 ${
              menuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu panel */}
      <div
        className={`overflow-hidden bg-charcoal transition-[max-height] duration-300 ease-in-out lg:hidden ${
          menuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-5 pb-6 pt-2">
          {NAV_LINKS.map((link, i) => {
            const isActive = activeHref === link.href;
            return (
              <li
                key={link.href}
                className={menuOpen ? "animate-fade-up opacity-0" : "opacity-0"}
                style={{ animationDelay: `${i * 45}ms` }}
              >
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block rounded-md px-3 py-3 text-base font-medium transition-colors ${
                    isActive ? "bg-white/5 text-saffron" : "text-paper/90 hover:bg-white/5 hover:text-saffron"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
          <li className={menuOpen ? "animate-fade-up opacity-0" : "opacity-0"} style={{ animationDelay: "270ms" }}>
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-2 block rounded-md bg-chili px-3 py-3 text-center text-base font-semibold text-white"
            >
              Reserve a Table
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
