import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";

type OriginalContributionsHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  supportingText: string;
};

export default function OriginalContributionsHero({
  eyebrow,
  title,
  description,
  supportingText,
}: OriginalContributionsHeroProps) {
  return (
    <Card className="space-y-6 p-6 sm:p-7">
      <SectionTitle eyebrow={eyebrow} title={title} description={description} />
      <p className="max-w-4xl text-sm leading-7 text-muted sm:text-base">
        {supportingText}
      </p>
    </Card>
  );
}
