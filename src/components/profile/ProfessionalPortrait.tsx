import Image from "next/image";

import { cn } from "@/lib/cn";
import { profileImage } from "@/data/profileImage";

type PortraitSize = "hero" | "section" | "compact";

type ProfessionalPortraitProps = {
  size?: PortraitSize;
  className?: string;
  priority?: boolean;
  loading?: "eager" | "lazy";
  ariaLabel?: string;
};

const sizeClassMap: Record<PortraitSize, string> = {
  hero: "h-52 w-52 sm:h-64 sm:w-64 lg:h-[22rem] lg:w-[22rem]",
  section: "h-44 w-44 sm:h-52 sm:w-52",
  compact: "h-24 w-24 sm:h-28 sm:w-28",
};

const sizeAttrMap: Record<PortraitSize, string> = {
  hero: "(max-width: 640px) 208px, (max-width: 1024px) 260px, 352px",
  section: "(max-width: 640px) 176px, 208px",
  compact: "(max-width: 640px) 96px, 112px",
};

export default function ProfessionalPortrait({
  size = "section",
  className,
  priority = false,
  loading = "lazy",
  ariaLabel,
}: ProfessionalPortraitProps) {
  return (
    <figure
      className={cn(
        "group relative overflow-hidden rounded-full border border-border/70 bg-surface/80 shadow-[0_20px_60px_rgba(2,6,23,0.35)]",
        "before:pointer-events-none before:absolute before:inset-0 before:z-[1] before:rounded-full before:bg-gradient-to-br before:from-primary/20 before:via-transparent before:to-accent/15",
        "transition duration-500 hover:shadow-[0_24px_72px_rgba(2,6,23,0.42)]",
        sizeClassMap[size],
        className,
      )}
      aria-label={ariaLabel}
    >
      <Image
        src={profileImage.src}
        alt={profileImage.alt}
        fill
        loading={loading}
        priority={priority}
        sizes={sizeAttrMap[size]}
        className="object-cover object-center transition duration-700 ease-out group-hover:scale-[1.03]"
        placeholder="blur"
        blurDataURL={profileImage.blurDataURL}
      />
    </figure>
  );
}
