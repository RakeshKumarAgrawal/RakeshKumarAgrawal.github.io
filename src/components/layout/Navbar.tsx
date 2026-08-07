"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, ChevronDown, Menu, MoreHorizontal, Search, X } from "lucide-react";

import Container from "@/components/ui/Container";
import { navigation, type NavigationGroup } from "@/data/navigation";
import { topmateProfile } from "@/data/profileLinks";
import { cn } from "@/lib/cn";

import ThemeToggle from "./ThemeToggle";

const primaryNavigationLabels = new Set([
  "Home",
  "Executive Dashboard",
  "About",
  "Research",
  "Publications",
  "Books",
  "Frameworks",
  "Original Contributions",
  "Professional Service",
]);

const desktopNavigation = navigation.filter((item) => primaryNavigationLabels.has(item.label));
const secondaryNavigation = navigation.filter(
  (item) => !primaryNavigationLabels.has(item.label) && item.label !== "Book a Meeting",
);

export default function Navbar() {
  const pathname = usePathname();
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

  const isRouteActive = (href: string) => {
    if (href === "/#home") {
      return pathname === "/";
    }

    const normalizedHref = href.replace(/\/$/, "");
    return pathname === normalizedHref || pathname.startsWith(`${normalizedHref}/`);
  };

  const isItemActive = (item: NavigationGroup) =>
    !item.external && (isRouteActive(item.href) || item.children?.some((child) => isRouteActive(child.href)) === true);

  const toMenuHint = (href: string) => {
    if (href.startsWith("/#")) {
      return href.replace("/#", "");
    }

    return href.replace("/", "");
  };

  const renderGroup = (item: NavigationGroup) => {
    const isOpen = activeMenu === item.label;
    const isActive = isItemActive(item);

    if (!item.children?.length) {
      if (item.external) {
        return (
          <a
            href={item.href}
            target={topmateProfile.target}
            rel={topmateProfile.rel}
            aria-label={item.ariaLabel ?? item.label}
            className="relative inline-flex h-9 items-center rounded-full px-2.5 text-xs font-medium text-muted transition duration-200 hover:bg-white/5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 2xl:h-10 2xl:px-3 2xl:text-sm"
            onClick={handleDesktopNavigate}
          >
            {item.label}
          </a>
        );
      }

      return (
        <Link
          href={item.href}
          aria-current={isActive ? "page" : undefined}
          className={cn(
            "relative inline-flex h-9 items-center rounded-full px-2.5 text-xs font-medium transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 2xl:h-10 2xl:px-3 2xl:text-sm",
            isActive ? "text-foreground" : "text-muted hover:bg-white/5 hover:text-foreground",
          )}
          onClick={handleDesktopNavigate}
        >
          {item.label}
          {isActive ? <span className="absolute inset-x-2.5 bottom-0 h-0.5 rounded-full bg-primary" aria-hidden="true" /> : null}
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
            "relative inline-flex h-9 items-center gap-1 rounded-full px-2.5 text-xs font-medium transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 2xl:h-10 2xl:px-3 2xl:text-sm",
            isOpen || isActive ? "bg-white/10 text-foreground" : "text-muted hover:bg-white/5 hover:text-foreground",
          )}
          aria-current={isActive ? "page" : undefined}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          onClick={() => toggleGroup(item.label)}
        >
          {item.label}
          <ChevronDown className={cn("h-4 w-4 transition duration-200", isOpen && "rotate-180")} aria-hidden="true" />
          {isActive ? <span className="absolute inset-x-2.5 bottom-0 h-0.5 rounded-full bg-primary" aria-hidden="true" /> : null}
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
                    role="menuitem"
                    className="group flex items-center justify-between rounded-2xl border border-border/60 bg-surface/60 px-4 py-3 text-left transition hover:border-primary/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70"
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
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/75">
      <Container className="flex h-[73px] max-w-[96rem] items-center justify-between gap-2 py-3 xl:gap-3 2xl:max-w-[116rem]" onMouseLeave={() => setActiveMenu(null)}>
        <Link href="/#home" className="flex shrink-0 items-center gap-3 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-sm font-semibold text-primary">
            RK
          </span>
          <span className="hidden flex-col 2xl:flex">
            <span className="text-sm font-semibold text-foreground">Rakesh Kumar Agrawal</span>
            <span className="text-xs text-muted">Enterprise AI · Platform · Cloud</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden min-w-0 flex-1 justify-center xl:flex">
          <ul className="flex min-w-0 items-center justify-center gap-0 rounded-full border border-border/70 bg-surface/60 p-1 backdrop-blur 2xl:gap-[14px]">
            {desktopNavigation.map((item) => (
              <li key={`${item.label}-${item.href}`}>{renderGroup(item)}</li>
            ))}
            <li
              className="relative"
              onMouseEnter={() => setActiveMenu("More")}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button
                type="button"
                className={cn(
                  "inline-flex h-9 items-center gap-1 rounded-full px-2.5 text-xs font-medium transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 2xl:h-10 2xl:px-3 2xl:text-sm",
                  activeMenu === "More" ? "bg-white/10 text-foreground" : "text-muted hover:bg-white/5 hover:text-foreground",
                )}
                aria-expanded={activeMenu === "More"}
                aria-haspopup="menu"
                onClick={() => toggleGroup("More")}
              >
                <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
                <span>More</span>
              </button>

              <AnimatePresence>
                {activeMenu === "More" ? (
                  <motion.div
                    className="absolute right-0 top-full mt-3 w-72 overflow-hidden rounded-3xl border border-border/80 bg-background/95 p-3 shadow-[0_24px_80px_rgba(2,6,23,0.45)] backdrop-blur-xl"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.18 }}
                    role="menu"
                  >
                    <div className="grid gap-2">
                      {secondaryNavigation.map((item) => (
                        <Link
                          key={`${item.label}-${item.href}`}
                          href={item.href}
                          role="menuitem"
                          aria-current={isItemActive(item) ? "page" : undefined}
                          onClick={handleDesktopNavigate}
                          className={cn(
                            "flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70",
                            isItemActive(item)
                              ? "border-primary/40 bg-primary/10 text-foreground"
                              : "border-border/60 bg-surface/60 text-muted hover:border-primary/40 hover:bg-white/10 hover:text-foreground",
                          )}
                        >
                          <span>{item.label}</span>
                          <span className="text-xs text-muted">Open</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </li>
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 2xl:gap-2">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-white/5 text-foreground transition hover:border-primary/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 xl:hidden"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
          </button>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("global-search:open"))}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-white/5 text-foreground transition hover:border-primary/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 2xl:w-auto 2xl:gap-2 2xl:px-3"
            aria-label="Open global search"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            <span className="hidden text-xs font-semibold uppercase tracking-[0.16em] 2xl:inline">Search</span>
            <span className="hidden rounded-md border border-border/80 bg-white/5 px-1.5 py-0.5 text-[0.58rem] tracking-[0.14em] text-muted 2xl:inline">
              Ctrl+K
            </span>
          </button>
          <a
            href={topmateProfile.href}
            target={topmateProfile.target}
            rel={topmateProfile.rel}
            aria-label={topmateProfile.ariaLabel}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-white/5 text-foreground transition hover:border-primary/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 xl:w-auto xl:px-3 xl:text-xs 2xl:px-4 2xl:text-sm"
          >
            <CalendarDays className="h-4 w-4 xl:hidden" aria-hidden="true" />
            <span className="hidden xl:inline 2xl:hidden">Meeting</span>
            <span className="hidden 2xl:inline">Book a Meeting</span>
          </a>
          <ThemeToggle />
        </div>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div className="fixed inset-0 z-50 xl:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button type="button" className="absolute inset-0 bg-background/80 backdrop-blur-sm" aria-label="Close navigation overlay" onClick={closeMenu} />
            <motion.div
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              className="absolute left-0 top-0 flex h-[100dvh] w-full flex-col border-r border-border bg-background p-5 shadow-[0_20px_80px_rgba(2,6,23,0.6)] sm:max-w-md sm:p-6"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
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
                              className="flex items-center justify-between rounded-2xl border border-border/70 bg-surface/60 px-4 py-4 text-base font-medium text-foreground transition hover:border-primary/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70"
                            >
                              <span>{item.label}</span>
                              <span className="text-sm text-muted">open</span>
                            </a>
                          ) : (
                            <Link
                              href={item.href}
                              onClick={closeMenu}
                              aria-current={isItemActive(item) ? "page" : undefined}
                              className={cn(
                                "flex items-center justify-between rounded-2xl border px-4 py-4 text-base font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70",
                                isItemActive(item)
                                  ? "border-primary/40 bg-primary/10 text-foreground"
                                  : "border-border/70 bg-surface/60 text-foreground hover:border-primary/40 hover:bg-white/10",
                              )}
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