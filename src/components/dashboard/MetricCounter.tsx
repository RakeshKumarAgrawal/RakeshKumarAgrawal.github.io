"use client";

import { useEffect, useRef, useState } from "react";

type MetricCounterProps = {
  value: number;
  durationMs?: number;
};

export default function MetricCounter({ value, durationMs = 900 }: MetricCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [started, setStarted] = useState(false);
  const anchorRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const node = anchorRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) {
      return;
    }

    const start = performance.now();
    let frame = 0;

    const tick = (time: number) => {
      const progress = Math.min((time - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [durationMs, started, value]);

  return (
    <span ref={anchorRef} aria-live="polite">
      {displayValue}
    </span>
  );
}
