import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import type { TechnicalSkillCard } from "@/data/executiveDashboard";

type TechnicalSkillsDashboardProps = {
  skills: TechnicalSkillCard[];
};

export default function TechnicalSkillsDashboard({ skills }: TechnicalSkillsDashboardProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {skills.map((skillCard) => (
        <Card key={skillCard.id} className="space-y-4 p-5 transition duration-300 hover:border-primary/40 hover:bg-white/[0.07]">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">{skillCard.skill}</h3>
            <Badge className="border-primary/20 bg-primary/10 text-primary">{skillCard.experienceLevel}</Badge>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Supporting Certifications</p>
            <div className="flex flex-wrap gap-2">
              {skillCard.supportingCertifications.length ? (
                skillCard.supportingCertifications.map((certification) => <Badge key={`${skillCard.id}-${certification}`}>{certification}</Badge>)
              ) : (
                <p className="text-sm text-muted">No direct certification tags currently mapped.</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Related Research</p>
            <div className="flex flex-wrap gap-2">
              {skillCard.relatedResearch.length ? (
                skillCard.relatedResearch.map((research) => <Badge key={`${skillCard.id}-${research}`}>{research}</Badge>)
              ) : (
                <p className="text-sm text-muted">No direct research-domain mapping currently available.</p>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
