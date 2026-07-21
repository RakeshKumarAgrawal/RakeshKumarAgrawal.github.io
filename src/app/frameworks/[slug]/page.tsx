import type { Metadata } from "next";
import { notFound } from "next/navigation";

import FrameworkArchitecturePlaceholder from "@/components/frameworks/FrameworkArchitecturePlaceholder";
import FrameworkArtifactList from "@/components/frameworks/FrameworkArtifactList";
import FrameworkListSection from "@/components/frameworks/FrameworkListSection";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ResearchBreadcrumbs from "@/components/research/ResearchBreadcrumbs";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import { frameworksLibrary, getFrameworkBySlug } from "@/data/frameworksLibrary";

type FrameworkPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return frameworksLibrary.map((framework) => ({
    slug: framework.slug,
  }));
}

export async function generateMetadata({ params }: FrameworkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const framework = getFrameworkBySlug(slug);

  if (!framework) {
    return {
      title: "Framework",
    };
  }

  return {
    title: framework.title,
    description: framework.overview,
    alternates: {
      canonical: `/frameworks/${framework.slug}`,
    },
  };
}

export default async function FrameworkDetailPage({ params }: FrameworkPageProps) {
  const { slug } = await params;
  const framework = getFrameworkBySlug(slug);

  if (!framework) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main id="content" className="flex flex-1 flex-col pb-10">
        <section className="py-10 sm:py-12">
          <Container className="space-y-8 lg:space-y-10">
            <ResearchBreadcrumbs
              items={[
                { label: "Home", href: "/#home" },
                { label: "Frameworks", href: "/frameworks" },
                { label: framework.title },
              ]}
            />

            <Card className="space-y-5 p-6 sm:p-7">
              <Badge className="border-primary/20 bg-primary/10 text-[0.65rem] tracking-[0.24em] text-primary">
                {framework.status}
              </Badge>

              <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {framework.title}
              </h1>

              <p className="text-base leading-7 text-muted sm:text-lg">{framework.overview}</p>
            </Card>

            <div className="grid gap-4 lg:grid-cols-2">
              <Card className="space-y-4 p-5">
                <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-muted">Overview</h2>
                <p className="text-sm leading-7 text-muted">{framework.overview}</p>
              </Card>

              <Card className="space-y-4 p-5">
                <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-muted">Problem Addressed</h2>
                <p className="text-sm leading-7 text-muted">{framework.problemAddressed}</p>
              </Card>

              <Card className="space-y-4 p-5 lg:col-span-2">
                <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-muted">Architecture</h2>
                <p className="text-sm leading-7 text-muted">{framework.architecture}</p>
              </Card>
            </div>

            <FrameworkArchitecturePlaceholder
              title="Architecture Placeholder"
              nodes={framework.architecturePlaceholders}
            />

            <div className="grid gap-4 lg:grid-cols-2">
              <FrameworkListSection title="Components" items={framework.components} />
              <FrameworkListSection title="Technical Stack" items={framework.technicalStack} />
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              <FrameworkArtifactList
                title="Publications"
                items={framework.publications}
                emptyLabel="No linked publications for this framework."
              />
              <FrameworkArtifactList
                title="Datasets"
                items={framework.datasets}
                emptyLabel="No linked datasets for this framework."
              />
              <FrameworkArtifactList
                title="GitHub"
                items={framework.repositories}
                emptyLabel="No linked repositories for this framework."
              />
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              <FrameworkListSection title="Roadmap" items={framework.roadmap} />
              <FrameworkListSection title="Implementation" items={framework.implementation} />
              <FrameworkListSection title="Future Enhancements" items={framework.futureEnhancements} />
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
