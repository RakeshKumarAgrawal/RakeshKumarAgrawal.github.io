import Link from "next/link";

import { cn } from "@/lib/cn";

type SharedButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  ariaLabel?: string;
};

type ButtonAsLink = SharedButtonProps & {
  href: string;
  target?: string;
  rel?: string;
  prefetch?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

type ButtonAsButton = SharedButtonProps & {
  href?: never;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

type ButtonProps = ButtonAsLink | ButtonAsButton;

function isLinkButton(props: ButtonProps): props is ButtonAsLink {
  return "href" in props;
}

const variantStyles = {
  primary: "border border-primary/20 bg-primary text-white shadow-lg shadow-primary/20 hover:border-primary/10 hover:bg-primary/90",
  secondary: "border border-border/80 bg-white/5 text-foreground hover:border-primary/40 hover:bg-white/10",
  ghost: "border border-transparent bg-transparent text-foreground hover:bg-white/5",
} as const;

const sizeStyles = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-sm",
} as const;

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-60";

export default function Button(props: ButtonProps) {
  const {
    children,
    className,
    variant = "primary",
    size = "md",
    leftIcon,
    rightIcon,
    ariaLabel,
  } = props;

  const content = (
    <>
      {leftIcon}
      <span>{children}</span>
      {rightIcon}
    </>
  );

  const classNames = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

  if (isLinkButton(props)) {
    const { href, target, rel, prefetch, onClick } = props;

    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        prefetch={prefetch}
        onClick={onClick}
        className={classNames}
        aria-label={ariaLabel}
      >
        {content}
      </Link>
    );
  }

  const { type = "button", disabled, onClick } = props;

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={classNames} aria-label={ariaLabel}>
      {content}
    </button>
  );
}