"use client";

import { useEffect, useState } from "react";

import GlobalSearchModal from "@/components/search/GlobalSearchModal";

export default function GlobalEnhancements() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let idleId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(() => setReady(true), { timeout: 1200 });
    } else {
      timeoutId = setTimeout(() => setReady(true), 250);
    }

    return () => {
      if (idleId !== null && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }

      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  if (!ready) {
    return null;
  }

  return <GlobalSearchModal />;
}
