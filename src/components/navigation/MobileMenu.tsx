"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { navLinks } from "./nav-links";
import { cn } from "@/lib/utils";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_IN = [0.7, 0, 0.84, 0] as const;

const menuVariants: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.6, ease: EASE_OUT },
  },
  exit: {
    clipPath: "inset(0 0 100% 0)",
    transition: { duration: 0.45, ease: EASE_IN },
  },
};

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { y: 32, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-40 flex flex-col justify-between bg-cocoa px-6 pb-10 pt-28 text-velvet lg:hidden"
        >
          <motion.ul
            variants={listVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-1 flex-col justify-center gap-2"
          >
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <motion.li key={link.href} variants={itemVariants}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="group flex items-center gap-3 py-2 transition-transform duration-150 active:scale-[0.97]"
                  >
                    <span
                      className={cn(
                        "h-2 w-2 shrink-0 rounded-full transition-colors duration-300",
                        active ? "bg-cinnamon" : "bg-transparent"
                      )}
                    />
                    <span
                      className={cn(
                        "text-display break-words text-[clamp(2rem,10vw,3.75rem)] leading-[1.05] transition-colors duration-300",
                        active
                          ? "text-velvet"
                          : "text-velvet/40 group-hover:text-velvet/70 group-active:text-velvet/75"
                      )}
                    >
                      {link.label}
                    </span>
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>

          <motion.div variants={itemVariants} animate="visible" initial="hidden" className="flex flex-col gap-6">
            <Link
              href="/contact"
              onClick={onClose}
              className="text-eyebrow w-full rounded-full bg-cinnamon px-6 py-4 text-center text-white"
            >
              Request a Quote
            </Link>
            <p className="text-eyebrow text-velvet/40">
              info@jayakacinnamon.lk &nbsp;·&nbsp; +94 77 793 1504
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
