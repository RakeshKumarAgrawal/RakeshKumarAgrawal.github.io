import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";

type PageLoadingSkeletonProps = {
  title?: string;
};

export default function PageLoadingSkeleton({ title = "Loading section" }: PageLoadingSkeletonProps) {
  return (
    <main id="content" className="flex flex-1 flex-col pb-10" aria-busy="true" aria-live="polite">
      <section className="py-10 sm:py-12">
        <Container className="space-y-8 lg:space-y-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">{title}</p>

          <Card className="space-y-4 p-6 sm:p-7">
            <div className="h-3 w-28 animate-pulse rounded bg-white/10" />
            <div className="h-9 w-4/5 animate-pulse rounded bg-white/10" />
            <div className="h-5 w-full animate-pulse rounded bg-white/10" />
            <div className="h-5 w-2/3 animate-pulse rounded bg-white/10" />
          </Card>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="space-y-3 p-5">
                <div className="h-3 w-24 animate-pulse rounded bg-white/10" />
                <div className="h-6 w-4/5 animate-pulse rounded bg-white/10" />
                <div className="h-4 w-full animate-pulse rounded bg-white/10" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-white/10" />
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
