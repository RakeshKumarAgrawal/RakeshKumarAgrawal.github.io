import { cn } from "@/lib/cn";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className }: CardProps) {
  return (
    <div className={cn("rounded-3xl border border-border/70 bg-surface/80 p-6 shadow-[0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-xl", className)}>
      {children}
    </div>
  );
}