import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import type { RecognitionRecord } from "@/components/honors-awards/types";

type FeaturedRecognitionProps = {
  recognitions: RecognitionRecord[];
};

export default function FeaturedRecognition({ recognitions }: FeaturedRecognitionProps) {
  if (!recognitions.length) {
    return (
      <Card className="p-5">
        <p className="text-sm text-muted">No featured recognitions match the current filters.</p>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {recognitions.map((recognition) => (
        <Card key={recognition.id} className="space-y-3 p-5 transition duration-300 hover:border-primary/40 hover:bg-white/[0.07]">
          <div className="flex items-center justify-between gap-3">
            <Badge className="border-primary/20 bg-primary/10 text-[0.65rem] tracking-[0.24em] text-primary">Featured Recognition</Badge>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{recognition.issueDate.slice(0, 4)}</p>
          </div>

          <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">{recognition.title}</h3>
          <p className="text-sm text-muted">{recognition.organization}</p>
          <p className="text-sm leading-7 text-muted">{recognition.description}</p>

          <div className="flex flex-wrap gap-2">
            {recognition.tags.map((tag) => (
              <Badge key={`${recognition.id}-${tag}`}>{tag}</Badge>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
