"use client";

import { useSyncExternalStore } from "react";
import { MoonStar, SunMedium } from "lucide-react";

import { cn } from "@/lib/cn";

type Theme = "dark" | "light";

const storageKey = "rka-portfolio-theme";

function getThemeSnapshot(): Theme {
  if (typeof document !== "undefined") {
    const theme = document.documentElement.dataset.theme;

    if (theme === "dark" || theme === "light") {
      return theme;
    }
  }

  if (typeof window !== "undefined") {
    const savedTheme = window.localStorage.getItem(storageKey);

    if (savedTheme === "dark" || savedTheme === "light") {
      return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  return "dark";
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("themechange", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("themechange", callback);
  };
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribe,
    getThemeSnapshot,
    () => "dark",
  );

  function toggleTheme() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";

    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem(storageKey, nextTheme);
    window.dispatchEvent(new Event("themechange"));
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn("inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-white/5 text-foreground transition duration-300 hover:border-primary/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70")}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? <SunMedium className="h-4 w-4" aria-hidden="true" /> : <MoonStar className="h-4 w-4" aria-hidden="true" />}
    </button>
  );
}