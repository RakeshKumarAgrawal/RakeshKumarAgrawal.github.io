import Card from "@/components/ui/Card";

type PublicationDetailSectionProps = {
  title: string;
  children: React.ReactNode;
};

export default function PublicationDetailSection({ title, children }: PublicationDetailSectionProps) {
  return (
    <Card className="min-w-0 space-y-4 p-5">
      <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-muted">{title}</h2>
      <div className="text-sm leading-7 text-muted">{children}</div>
    </Card>
  );
}
