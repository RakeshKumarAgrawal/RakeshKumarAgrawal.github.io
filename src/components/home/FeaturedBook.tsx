import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { formatBookTitle, publishedBooks } from "@/data/books";

export default function FeaturedBook() {
  return (
    <section className="py-6 sm:py-8" aria-labelledby="latest-books-title">
      <Container className="space-y-5">
        <h2 id="latest-books-title" className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Latest Books</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {publishedBooks.map((book, index) => (
            <Reveal key={book.id} delay={index * 0.04}>
              <Card className="grid h-full gap-5 p-5 sm:grid-cols-[7rem_1fr] sm:p-6">
                <div className="relative mx-auto aspect-[2/3] w-28 overflow-hidden rounded-2xl border border-border/70 bg-surface sm:mx-0">
                  <Image src={book.coverImage} alt={`Cover of ${formatBookTitle(book)}`} fill sizes="112px" className="object-cover" />
                </div>
                <div className="flex min-w-0 flex-col space-y-4">
                  <Badge className="w-fit border-primary/20 bg-primary/10 text-primary">Published</Badge>
                  <div className="space-y-2">
                    <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">{formatBookTitle(book)}</h3>
                    <p className="text-sm leading-7 text-muted">{book.description}</p>
                  </div>
                  <div className="mt-auto flex flex-wrap gap-3 pt-1">
                    <Button href={book.amazonUrl} target="_blank" rel="noreferrer" size="sm" rightIcon={<ExternalLink className="h-4 w-4" />}>Amazon</Button>
                    <Button href={`/books#${book.id}`} variant="secondary" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>Details</Button>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}