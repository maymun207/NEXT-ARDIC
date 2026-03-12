interface MetricCardProps {
  value: string;
  label: string;
}

export default function MetricCard({ value, label }: MetricCardProps) {
  return (
    <div className="text-center">
      <div className="font-heading text-4xl font-bold text-secondary sm:text-5xl">
        {value}
      </div>
      <div className="mt-2 text-sm font-medium text-neutral-600 sm:text-base">
        {label}
      </div>
    </div>
  );
}
