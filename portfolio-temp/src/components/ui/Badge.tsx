import { cn } from "@/lib/cn";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border/80 bg-white/5 px-3 py-1 text-xs font-medium tracking-[0.2em] text-muted uppercase backdrop-blur",
        className,
      )}
    >
      {children}
    </span>
  );
}