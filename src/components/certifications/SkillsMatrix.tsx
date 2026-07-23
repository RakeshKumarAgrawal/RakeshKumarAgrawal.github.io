import Card from "@/components/ui/Card";
import type { CertificationRecord } from "@/components/certifications/types";

type SkillsMatrixProps = {
  certifications: CertificationRecord[];
};

export default function SkillsMatrix({ certifications }: SkillsMatrixProps) {
  const skillCounts = certifications.reduce<Map<string, number>>((accumulator, item) => {
    item.skills.forEach((skill) => {
      accumulator.set(skill, (accumulator.get(skill) ?? 0) + 1);
    });
    return accumulator;
  }, new Map<string, number>());

  const sortedSkills = Array.from(skillCounts.entries()).sort((a, b) => b[1] - a[1]);

  return (
    <Card className="space-y-4 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Skills matrix</p>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {sortedSkills.map(([skill, count]) => (
          <div key={skill} className="rounded-2xl border border-border/70 bg-surface/60 px-4 py-3">
            <p className="text-sm font-medium text-foreground">{skill}</p>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">{count} credential records</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
