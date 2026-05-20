import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "../../lib/utils";

const NAV_LINKS = [
  { name: "Projects", href: "/projects" },
  { name: "Writing", href: "/blog" },
  { name: "Research", href: "/research" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar({ currentPath = "/" }: { currentPath?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // When mobile menu opens: focus the close button, listen for Escape,
  // mark the rest of the document inert so keyboard tabbing stays trapped.
  // When it closes: restore focus to the hamburger trigger.
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const main = document.querySelector("main");
    main?.setAttribute("inert", "");

    closeBtnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      main?.removeAttribute("inert");
      triggerRef.current?.focus();
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled
            ? "bg-[#08080a]/90 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group" aria-label="Ratish Gupta — home">
            <div className="size-7 border border-white/20 flex items-center justify-center group-hover:border-white/40 transition-colors">
              <span aria-hidden="true" className="text-primary font-serif text-sm leading-none">R</span>
            </div>
            <span className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase hidden md:block">
              Ratish Gupta
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => {
              const active = currentPath === link.href || currentPath.startsWith(link.href + "/");
              return (
                <a
                  key={link.name}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "text-[10px] font-mono uppercase tracking-[0.2em] transition-colors duration-300",
                    active ? "text-primary" : "text-muted-foreground hover:text-primary"
                  )}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Mobile Toggle */}
          <button
            ref={triggerRef}
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            className="md:hidden text-muted-foreground hover:text-primary transition-colors p-1"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={20} aria-hidden="true" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-0 z-[60] bg-[#08080a] flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between px-6 h-16">
              <div className="flex items-center gap-3">
                <div className="size-7 border border-white/20 flex items-center justify-center">
                  <span aria-hidden="true" className="text-primary font-serif text-sm leading-none">R</span>
                </div>
              </div>
              <button
                ref={closeBtnRef}
                aria-label="Close menu"
                className="text-muted-foreground hover:text-primary transition-colors p-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <div className="flex flex-col justify-center flex-1 px-12 gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                >
                  <a
                    href={link.href}
                    className="text-3xl font-serif text-primary tracking-tight"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                </motion.div>
              ))}
            </div>

            <div className="px-12 pb-12">
              <a
                href="mailto:guptar76@mcmaster.ca"
                className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase hover:text-primary transition-colors"
              >
                guptar76@mcmaster.ca
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
