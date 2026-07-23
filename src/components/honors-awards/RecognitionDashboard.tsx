import type { RecognitionMetric } from "@/components/honors-awards/types";
import RecognitionStats from "@/components/honors-awards/RecognitionStats";

type RecognitionDashboardProps = {
  metrics: RecognitionMetric[];
};

export default function RecognitionDashboard({ metrics }: RecognitionDashboardProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <RecognitionStats key={metric.id} metric={metric} />
      ))}
    </div>
  );
}
