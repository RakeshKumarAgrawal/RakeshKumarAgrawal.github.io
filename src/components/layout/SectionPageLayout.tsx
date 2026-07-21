import type { ReactNode } from "react";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ResearchBreadcrumbs, {
  type BreadcrumbItem,
} from "@/components/research/ResearchBreadcrumbs";
import Container from "@/components/ui/Container";

type SectionPageLayoutProps = {
  breadcrumbs: BreadcrumbItem[];
  children: ReactNode;
};

export default function SectionPageLayout({ breadcrumbs, children }: SectionPageLayoutProps) {
  return (
    <>
      <Navbar />
      <main id="content" className="flex flex-1 flex-col pb-10">
        <section className="py-10 sm:py-12">
          <Container className="space-y-8 lg:space-y-10">
            <ResearchBreadcrumbs items={breadcrumbs} />
            {children}
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
