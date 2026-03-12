"use client";

interface SliderProps {
  label: string;
  name: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
}

export default function Slider({
  label,
  name,
  min,
  max,
  step = 1,
  value,
  onChange,
  formatValue,
}: SliderProps) {
  const displayValue = formatValue ? formatValue(value) : String(value);
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label htmlFor={name} className="text-sm font-medium text-neutral-700">
          {label}
        </label>
        <span className="font-heading text-lg font-bold text-primary">
          {displayValue}
        </span>
      </div>
      <input
        id={name}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full cursor-pointer accent-primary"
        style={{
          background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${percentage}%, var(--color-neutral-200) ${percentage}%, var(--color-neutral-200) 100%)`,
        }}
      />
      <div className="mt-1 flex justify-between text-xs text-neutral-400">
        <span>{formatValue ? formatValue(min) : min}</span>
        <span>{formatValue ? formatValue(max) : max}</span>
      </div>
    </div>
  );
}
