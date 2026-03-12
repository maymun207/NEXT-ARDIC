interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "outline";
}

const variantStyles = {
  default: "bg-neutral-900 border border-neutral-800 text-neutral-400",
  accent: "bg-accent/5 border border-accent/20 text-accent",
  outline: "bg-white/5 border border-white/10 text-neutral-300",
};

export default function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-lg px-3 py-1 text-[10px] uppercase tracking-widest font-mono font-medium ${variantStyles[variant]}`}
    >
      {children}
    </span>
  );
}
