"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks } from "./nav-links";
import { MobileMenu } from "./MobileMenu";
import { Logo } from "@/components/ui/Logo";

const NAV_HEIGHT_MOBILE = 76;
const NAV_HEIGHT_DESKTOP = 88;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const heroElRef = useRef<HTMLElement | null>(null);

  // The hero (when present — home page only) owns its own full-bleed
  // cinematic visual; the navbar should stay fully transparent for the
  // entire time any part of it is still on screen, not just the first
  // 48px of scroll. Re-queried on route change since the hero element
  // only exists on the home page.
  useEffect(() => {
    heroElRef.current = document.getElementById("hero-section");
  }, [pathname]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const heroEl = heroElRef.current;
    if (heroEl) {
      const navHeight = window.innerWidth >= 768 ? NAV_HEIGHT_DESKTOP : NAV_HEIGHT_MOBILE;
      setScrolled(heroEl.getBoundingClientRect().bottom <= navHeight);
    } else {
      setScrolled(latest > 48);
    }
  });

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-cocoa/10 bg-velvet/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav className="container-edit flex h-[76px] items-center justify-between md:h-[88px]">
          <Link
            href="/"
            className="shrink-0"
            onClick={() => setMenuOpen(false)}
            aria-label="Jayaka Cinnamon — home"
          >
            <Logo
              priority
              className={cn(
                "h-16 w-[260px] transition-[filter] duration-500 sm:h-[72px] sm:w-[290px]",
                !scrolled && "drop-shadow-[0_1px_10px_rgba(248,246,242,0.85)]"
              )}
            />
          </Link>

          <ul
            className="hidden items-center gap-2 lg:flex"
            onMouseLeave={() => setHovered(null)}
          >
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    onMouseEnter={() => setHovered(link.href)}
                    onFocus={() => setHovered(link.href)}
                    onBlur={() => setHovered(null)}
                    className={cn(
                      "text-eyebrow relative z-10 block rounded-full px-4 py-2.5 text-cocoa/70 transition-colors hover:text-cocoa",
                      active && "text-cocoa",
                      !scrolled && "[text-shadow:0_1px_10px_rgba(248,246,242,0.85)]"
                    )}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute -bottom-1 left-4 right-4 h-[2px] bg-cinnamon"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                  </Link>

                  <AnimatePresence>
                    {hovered === link.href && (
                      <motion.span
                        layoutId="nav-hover"
                        className="absolute inset-0 rounded-full bg-cinnamon/10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className={cn(
                "text-eyebrow hidden rounded-full border border-cinnamon/40 px-5 py-2.5 text-cocoa transition-colors hover:border-cinnamon hover:bg-cinnamon hover:text-white md:inline-block",
                !scrolled && "bg-white/20 backdrop-blur-sm"
              )}
            >
              Request a Quote
            </Link>

            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-full border border-cocoa/15 text-cocoa transition-colors lg:hidden",
                !scrolled && "border-cocoa/25 bg-white/20 backdrop-blur-sm"
              )}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
