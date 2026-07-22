"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Search, X } from "lucide-react";

import Container from "@/components/ui/Container";
import { navigation, type NavigationGroup } from "@/data/navigation";
import { topmateProfile } from "@/data/profileLinks";
import { cn } from "@/lib/cn";

import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    if (!open && !activeMenu) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setActiveMenu(null);
      }
    };

    if (open) {
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      if (open) {
        document.body.style.overflow = "";
      }
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeMenu, open]);

  const closeMenu = () => {
    setOpen(false);
    setActiveMenu(null);
  };

  const toggleGroup = (label: string) => {
    setActiveMenu((current) => (current === label ? null : label));
  };

  const handleDesktopNavigate = () => {
    setActiveMenu(null);
  };

  const toMenuHint = (href: string) => {
    if (href.startsWith("/#")) {
      return href.replace("/#", "");
    }

    return href.replace("/", "");
  };

  const renderGroup = (item: NavigationGroup) => {
    const isOpen = activeMenu === item.label;

    if (!item.children?.length) {
      if (item.external) {
        return (
          <a
            href={item.href}
            target={topmateProfile.target}
            rel={topmateProfile.rel}
            aria-label={item.ariaLabel ?? item.label}
            className="inline-flex h-10 items-center rounded-full px-4 text-sm font-medium text-muted transition hover:bg-white/5 hover:text-foreground"
            onClick={handleDesktopNavigate}
          >
            {item.label}
          </a>
        );
      }

      return (
        <Link
          href={item.href}
          className="inline-flex h-10 items-center rounded-full px-4 text-sm font-medium text-muted transition hover:bg-white/5 hover:text-foreground"
          onClick={handleDesktopNavigate}
        >
          {item.label}
        </Link>
      );
    }

    return (
      <div
        className="relative"
        onMouseEnter={() => setActiveMenu(item.label)}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <button
          type="button"
          className={cn(
            "inline-flex h-10 items-center gap-1 rounded-full px-4 text-sm font-medium transition",
            isOpen ? "bg-white/10 text-foreground" : "text-muted hover:bg-white/5 hover:text-foreground",
          )}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          onClick={() => toggleGroup(item.label)}
        >
          {item.label}
          <ChevronDown className={cn("h-4 w-4 transition duration-200", isOpen && "rotate-180")} aria-hidden="true" />
        </button>

        <AnimatePresence>
          {isOpen ? (
            <motion.div
              className="absolute left-0 top-full mt-3 w-[30rem] overflow-hidden rounded-3xl border border-border/80 bg-background/95 p-3 shadow-[0_24px_80px_rgba(2,6,23,0.45)] backdrop-blur-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.18 }}
              role="menu"
            >
              <div className="grid gap-2">
                {item.children.map((child) => (
                  <Link
                    key={child.label}
                    href={child.href}
                    onClick={handleDesktopNavigate}
                    className="group flex items-center justify-between rounded-2xl border border-border/60 bg-surface/60 px-4 py-3 text-left transition hover:border-primary/40 hover:bg-white/10"
                  >
                    <span className="text-sm font-medium text-foreground">{child.label}</span>
                    <span className="text-xs text-muted transition group-hover:text-foreground">Open</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <Container className="flex items-center justify-between gap-4 py-4" onMouseLeave={() => setActiveMenu(null)}>
        <Link href="/#home" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-sm font-semibold text-primary">
            RK
          </span>
          <span className="hidden flex-col sm:flex">
            <span className="text-sm font-semibold text-foreground">Rakesh Kumar Agrawal</span>
            <span className="text-xs text-muted">Enterprise AI · Platform · Cloud</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block max-w-[calc(100vw-22rem)] overflow-x-auto">
          <ul className="flex items-center gap-1 rounded-full border border-border/70 bg-surface/60 p-1 backdrop-blur">
            {navigation.map((item) => (
              <li key={`${item.label}-${item.href}`}>{renderGroup(item)}</li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("global-search:open"))}
            className="hidden h-10 items-center gap-2 rounded-full border border-border/80 bg-white/5 px-3 text-xs font-semibold uppercase tracking-[0.16em] text-foreground transition hover:border-primary/40 hover:bg-white/10 lg:inline-flex"
            aria-label="Open global search"
          >
            <Search className="h-3.5 w-3.5" aria-hidden="true" />
            Search
            <span className="rounded-md border border-border/80 bg-white/5 px-1.5 py-0.5 text-[0.58rem] tracking-[0.14em] text-muted">
              Ctrl+K
            </span>
          </button>
          <a
            href={topmateProfile.href}
            target={topmateProfile.target}
            rel={topmateProfile.rel}
            aria-label={topmateProfile.ariaLabel}
            className="hidden h-10 items-center rounded-full border border-border/80 bg-white/5 px-4 text-sm font-medium text-foreground transition hover:border-primary/40 hover:bg-white/10 md:inline-flex"
          >
            Book a Meeting
          </a>
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-white/5 text-foreground transition hover:border-primary/40 hover:bg-white/10 md:hidden"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div className="fixed inset-0 z-50 md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button type="button" className="absolute inset-0 bg-background/80 backdrop-blur-sm" aria-label="Close navigation overlay" onClick={closeMenu} />
            <motion.div
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              className="absolute right-0 top-0 flex h-full w-[88vw] max-w-sm flex-col border-l border-border bg-background p-6 shadow-[0_20px_80px_rgba(2,6,23,0.6)]"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted">Navigation</p>
                <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-white/5 text-foreground" aria-label="Close navigation menu" onClick={closeMenu}>
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <nav aria-label="Mobile primary" className="mt-8 flex-1 overflow-y-auto pr-1">
                <ul className="space-y-2">
                  {navigation.map((item) => {
                    if (!item.children?.length) {
                      return (
                        <li key={`${item.label}-${item.href}`}>
                          {item.external ? (
                            <a
                              href={item.href}
                              target={topmateProfile.target}
                              rel={topmateProfile.rel}
                              aria-label={item.ariaLabel ?? item.label}
                              onClick={closeMenu}
                              className="flex items-center justify-between rounded-2xl border border-border/70 bg-surface/60 px-4 py-4 text-base font-medium text-foreground transition hover:border-primary/40 hover:bg-white/10"
                            >
                              <span>{item.label}</span>
                              <span className="text-sm text-muted">open</span>
                            </a>
                          ) : (
                            <Link
                              href={item.href}
                              onClick={closeMenu}
                              className="flex items-center justify-between rounded-2xl border border-border/70 bg-surface/60 px-4 py-4 text-base font-medium text-foreground transition hover:border-primary/40 hover:bg-white/10"
                            >
                              <span>{item.label}</span>
                              <span className="text-sm text-muted">{toMenuHint(item.href)}</span>
                            </Link>
                          )}
                        </li>
                      );
                    }

                    return (
                      <li key={`${item.label}-${item.href}`}>
                        <details className="rounded-2xl border border-border/70 bg-surface/60">
                          <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-4 text-base font-medium text-foreground">
                            <span>{item.label}</span>
                            <ChevronDown className="h-4 w-4 text-muted" aria-hidden="true" />
                          </summary>
                          <div className="space-y-2 border-t border-border/70 p-3">
                            <Link
                              href={item.href}
                              onClick={closeMenu}
                              className="mb-2 flex items-center justify-between rounded-xl border border-border/60 bg-background/60 px-3 py-3 text-sm font-medium text-foreground"
                            >
                              <span>Open {item.label}</span>
                              <span className="text-xs text-muted">Section</span>
                            </Link>
                            <div className="grid gap-2">
                              {item.children.map((child) => (
                                <Link
                                  key={child.label}
                                  href={child.href}
                                  onClick={closeMenu}
                                  className="rounded-xl border border-border/60 bg-background/50 px-3 py-3 text-sm text-muted transition hover:border-primary/40 hover:bg-white/10 hover:text-foreground"
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </details>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <a
                href={topmateProfile.href}
                target={topmateProfile.target}
                rel={topmateProfile.rel}
                aria-label={topmateProfile.ariaLabel}
                onClick={closeMenu}
                className="mt-auto inline-flex h-12 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-white shadow-lg shadow-primary/20"
              >
                Book a Meeting
              </a>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}