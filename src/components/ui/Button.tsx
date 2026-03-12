import { type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  target?: string;
  rel?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent/10 text-white border border-accent/40 shadow-[0_0_20px_rgba(0,209,255,0.15)] hover:bg-accent/20 hover:border-accent hover:shadow-[0_0_30px_rgba(0,209,255,0.3)] backdrop-blur-md transition-all duration-500",
  secondary:
    "bg-neutral-800/40 text-neutral-300 border border-neutral-700 font-mono hover:bg-neutral-800 hover:text-white transition-all backdrop-blur-sm",
  ghost:
    "bg-transparent text-neutral-400 hover:text-white hover:bg-white/5 transition-colors duration-300 font-mono",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-[10px] tracking-[0.15em] uppercase",
  md: "px-5 py-2.5 text-xs tracking-wider",
  lg: "px-8 py-4 text-sm font-bold tracking-widest uppercase",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-lg transition-all duration-300 focus-visible:ring-1 focus-visible:ring-offset-1 cursor-pointer ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} {...(props as any)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
