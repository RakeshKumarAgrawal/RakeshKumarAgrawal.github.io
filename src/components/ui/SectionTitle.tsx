import { cn } from "@/lib/cn";

type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
};

export default function SectionTitle({ eyebrow, title, description, action, align = "left", className }: SectionTitleProps) {
  return (
    <div className={cn("flex flex-col gap-4", align === "center" && "items-center text-center", className)}>
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted">{eyebrow}</p> : null}
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className={cn("space-y-3", align === "center" && "mx-auto max-w-3xl")}>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{title}</h2>
          {description ? <p className="max-w-3xl text-base leading-7 text-muted sm:text-lg">{description}</p> : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </div>
  );
}