import Card from "@/components/ui/Card";
import type { RecognitionRecord } from "@/components/honors-awards/types";

type CareerImpactProps = {
  recognitions: RecognitionRecord[];
};

type ImpactDefinition = {
  id: string;
  title: string;
  description: string;
  matcher: RegExp;
};

const impactDefinitions: ImpactDefinition[] = [
  {
    id: "professional-leadership",
    title: "Professional Leadership",
    description: "Leadership depth reflected through fellowships, memberships, and enterprise delivery ownership.",
    matcher: /leadership|fellow|senior member|membership/i,
  },
  {
    id: "enterprise-transformation",
    title: "Enterprise Transformation",
    description: "Recognition linked to organization-level delivery, impact execution, and transformation outcomes.",
    matcher: /enterprise|employer|transformation|critical/i,
  },
  {
    id: "research-contributions",
    title: "Research Contributions",
    description: "Evidence of research and academic rigor visible across recognized milestones and technical tracks.",
    matcher: /research|academic|paper|physics/i,
  },
  {
    id: "technical-excellence",
    title: "Technical Excellence",
    description: "Sustained excellence in technical capability, standards, and engineering quality.",
    matcher: /technical excellence|badge|engineering|technical/i,
  },
  {
    id: "innovation",
    title: "Innovation",
    description: "Recognition of innovative problem solving and enterprise innovation contributions.",
    matcher: /innovation/i,
  },
  {
    id: "community-service",
    title: "Community Service",
    description: "Community engagement and professional service contributions recognized over time.",
    matcher: /community|service|appreciation|volunteer/i,
  },
  {
    id: "professional-growth",
    title: "Professional Growth",
    description: "Long-term growth indicators across milestones, learning, and recognition progression.",
    matcher: /growth|milestone|career|professional/i,
  },
];

export default function CareerImpact({ recognitions }: CareerImpactProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {impactDefinitions.map((impact) => {
        const matches = recognitions.filter((recognition) => {
          const text = `${recognition.title} ${recognition.organization} ${recognition.category} ${recognition.description} ${recognition.tags.join(" ")}`;
          return impact.matcher.test(text);
        });

        return (
          <Card key={impact.id} className="space-y-4 p-5 transition duration-300 hover:border-primary/40 hover:bg-white/[0.07]">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">{impact.title}</h3>
              <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-primary">
                {matches.length}
              </span>
            </div>
            <p className="text-sm leading-7 text-muted">{impact.description}</p>
            <ul className="space-y-2 text-sm text-muted">
              {matches.slice(0, 3).map((match) => (
                <li key={`${impact.id}-${match.id}`} className="rounded-xl border border-border/70 bg-white/5 px-3 py-2">
                  {match.title}
                </li>
              ))}
              {!matches.length ? <li className="rounded-xl border border-border/70 bg-white/5 px-3 py-2">No matching recognitions for current filters.</li> : null}
            </ul>
          </Card>
        );
      })}
    </div>
  );
}
