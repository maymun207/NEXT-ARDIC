interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      <h2
        className={`font-heading text-3xl font-bold sm:text-4xl ${light ? "text-white" : "text-neutral-900"}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 max-w-3xl text-lg ${centered ? "mx-auto" : ""} ${light ? "text-neutral-300" : "text-neutral-600"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
