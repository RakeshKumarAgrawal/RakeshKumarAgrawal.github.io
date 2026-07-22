"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import { featuredResearchHero, featuredResearchItems } from "@/data/featuredResearch";
import { cn } from "@/lib/cn";

const getVisibleCount = (width: number) => {
  if (width >= 1280) {
    return 3;
  }

  if (width >= 768) {
    return 2;
  }

  return 1;
};

export default function FeaturedResearchCarousel() {
  const [visibleCount, setVisibleCount] = useState(3);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onResize = () => {
      setVisibleCount(getVisibleCount(window.innerWidth));
    };

    onResize();
    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  const shouldDuplicateForDesktopCycle = featuredResearchItems.length <= visibleCount;
  const carouselItems = shouldDuplicateForDesktopCycle
    ? [...featuredResearchItems, ...featuredResearchItems]
    : featuredResearchItems;

  const maxIndex = shouldDuplicateForDesktopCycle
    ? Math.max(0, featuredResearchItems.length - 1)
    : Math.max(0, carouselItems.length - visibleCount);

  const clampedActiveIndex = Math.min(activeIndex, maxIndex);

  useEffect(() => {
    if (paused || maxIndex === 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => {
        const bounded = Math.min(current, maxIndex);
        return bounded >= maxIndex ? 0 : bounded + 1;
      });
    }, 4800);

    return () => window.clearInterval(timer);
  }, [maxIndex, paused]);

  const itemWidth = 100 / visibleCount;
  const translateX = clampedActiveIndex * itemWidth;

  const pagination = useMemo(() => Array.from({ length: maxIndex + 1 }, (_, index) => index), [maxIndex]);

  const goNext = () => {
    setActiveIndex((current) => {
      const bounded = Math.min(current, maxIndex);
      return bounded >= maxIndex ? 0 : bounded + 1;
    });
  };

  const goPrevious = () => {
    setActiveIndex((current) => {
      const bounded = Math.min(current, maxIndex);
      return bounded <= 0 ? maxIndex : bounded - 1;
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrevious();
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(event.touches[0]?.clientX ?? null);
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) {
      return;
    }

    const endX = event.changedTouches[0]?.clientX ?? touchStartX;
    const delta = touchStartX - endX;

    if (Math.abs(delta) > 40) {
      if (delta > 0) {
        goNext();
      } else {
        goPrevious();
      }
    }

    setTouchStartX(null);
  };

  return (
    <section
      id="featured-research"
      ref={sectionRef}
      className="py-6 sm:py-8"
      aria-label="Featured research carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <Container className="space-y-10 lg:space-y-12">
        <Reveal>
          <SectionTitle
            eyebrow={featuredResearchHero.eyebrow}
            title={featuredResearchHero.title}
            description={featuredResearchHero.description}
          />
        </Reveal>

        <Reveal>
          <div
            className="space-y-5"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div
              className="overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${translateX}%)` }}
                role="list"
                aria-live="polite"
              >
                {carouselItems.map((item, index) => (
                  <article
                    key={`${item.slug}-${index}`}
                    role="listitem"
                    className="shrink-0 px-2"
                    style={{ width: `${itemWidth}%` }}
                  >
                    <Card className="flex h-full flex-col gap-4 p-5 sm:p-6">
                      <div className="relative h-36 overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-primary/30 via-surface to-accent/20">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_60%)]" />
                        <div className="absolute inset-x-0 bottom-0 p-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/80">{item.bannerLabel}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Badge className="border-primary/20 bg-primary/10 text-[0.65rem] tracking-[0.2em] text-primary">
                          {item.category}
                        </Badge>
                        <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">{item.title}</h3>
                      </div>

                      <p className="text-sm leading-7 text-muted">{item.summary}</p>

                      <ul className="grid gap-1.5 text-sm text-muted sm:grid-cols-2">
                        {item.highlights.map((highlight) => (
                          <li key={`${item.slug}-${highlight}`}>
                            <span className="mr-1.5 text-primary" aria-hidden="true">•</span>
                            {highlight}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2">
                        {item.technologies.map((tech) => (
                          <span
                            key={`${item.slug}-${tech}`}
                            className="rounded-full border border-border/70 bg-white/5 px-3 py-1 text-xs font-medium text-muted"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto flex flex-wrap gap-2 pt-1">
                        <Button href={item.actions.details} variant="secondary" size="sm" ariaLabel={`View details for ${item.title}`}>
                          View Details
                        </Button>
                        <Button href={item.actions.publications} variant="secondary" size="sm" ariaLabel={`Related publications for ${item.title}`}>
                          Related Publications
                        </Button>
                        <Button
                          href={item.actions.github}
                          target="_blank"
                          rel="noreferrer"
                          variant="secondary"
                          size="sm"
                          rightIcon={<ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />}
                          ariaLabel={`GitHub repository for ${item.title}`}
                        >
                          GitHub Repository
                        </Button>
                      </div>
                    </Card>
                  </article>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goPrevious}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-white/5 text-foreground transition hover:border-primary/40 hover:bg-white/10"
                  aria-label="Previous featured research slide"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-white/5 text-foreground transition hover:border-primary/40 hover:bg-white/10"
                  aria-label="Next featured research slide"
                >
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <div className="flex items-center gap-2" aria-label="Featured research pagination">
                {pagination.map((page) => (
                  <button
                    key={`featured-research-page-${page}`}
                    type="button"
                    onClick={() => setActiveIndex(page)}
                    className={cn(
                      "h-2.5 w-2.5 rounded-full transition",
                      clampedActiveIndex === page ? "bg-primary" : "bg-border hover:bg-primary/60",
                    )}
                    aria-label={`Go to slide ${page + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
