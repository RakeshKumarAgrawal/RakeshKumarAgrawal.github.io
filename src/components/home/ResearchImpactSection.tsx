import DashboardMetricGridClient from "@/components/dashboard/DashboardMetricGridClient";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import {
  dashboardHomeSection,
  dashboardMetrics,
  dashboardTrendWindowLabel,
} from "@/data/dashboardMetrics";

export default function ResearchImpactSection() {
  return (
    <section id="research-impact" className="py-6 sm:py-8" aria-label="Research impact">
      <Container className="space-y-10 lg:space-y-12">
        <Reveal>
          <Card className="space-y-6 p-6 sm:p-7">
            <SectionTitle
              eyebrow={dashboardHomeSection.eyebrow}
              title={dashboardHomeSection.title}
              description={dashboardHomeSection.description}
            />
          </Card>
        </Reveal>

        <Reveal delay={0.04}>
          <DashboardMetricGridClient
            metrics={dashboardMetrics}
            trendWindowLabel={dashboardTrendWindowLabel}
            enableFilters={false}
          />
        </Reveal>
      </Container>
    </section>
  );
}
