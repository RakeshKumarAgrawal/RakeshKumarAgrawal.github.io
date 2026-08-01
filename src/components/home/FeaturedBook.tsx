import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

const amazonUrl = "https://a.co/d/005afKP6";

export default function FeaturedBook() {
  return (
    <section className="py-6 sm:py-8" aria-labelledby="featured-book-title">
      <Container>
        <Reveal>
          <Card className="overflow-hidden p-5 sm:p-6">
            <div className="grid gap-6 sm:grid-cols-[9rem_1fr] sm:items-center">
              <div className="relative mx-auto aspect-[2/3] w-36 overflow-hidden rounded-2xl border border-border/70 bg-surface sm:mx-0">
                <Image
                  src="/images/books/book-cover.jpg"
                  alt="Cover of Constitutional Agentic AI"
                  fill
                  sizes="144px"
                  className="object-cover"
                />
              </div>

              <div className="space-y-4">
                <Badge className="border-primary/20 bg-primary/10 text-primary">Published Book</Badge>
                <div className="space-y-2">
                  <h2 id="featured-book-title" className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    Constitutional Agentic AI
                  </h2>
                  <p className="max-w-3xl text-sm leading-7 text-muted sm:text-base">
                    A practical guide to trustworthy autonomous AI through constitutional governance, safety constraints, and enterprise-scale assurance.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button href={amazonUrl} target="_blank" rel="noreferrer" rightIcon={<ExternalLink className="h-4 w-4" />}>
                    View on Amazon
                  </Button>
                  <Button href="/books" variant="secondary" rightIcon={<ArrowRight className="h-4 w-4" />}>
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </Reveal>
      </Container>
    </section>
  );
}