"use client";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
  requiredLabel?: string;
  placeholder?: string;
  options?: string[];
  rows?: number;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

export default function FormField({
  label,
  name,
  type = "text",
  required = false,
  error,
  requiredLabel = "Required",
  placeholder,
  options,
  rows,
  value,
  onChange,
}: FormFieldProps) {
  const inputClasses = `w-full rounded-xl bg-white/5 border px-4 py-3 text-white transition-all duration-300 focus:border-accent/60 focus:bg-white/10 focus:ring-1 focus:ring-accent/40 outline-none ${error ? "border-red-900/50 bg-red-900/10" : "border-white/10"
    }`;

  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-xs font-bold tracking-widest uppercase text-neutral-400">
        {label}
        {required && (
          <span className="ml-1 text-accent/60" title={requiredLabel}>
            *
          </span>
        )}
      </label>
      {options ? (
        <select
          id={name}
          name={name}
          required={required}
          className={inputClasses}
          value={value}
          onChange={onChange}
        >
          <option value="">{placeholder || label}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : rows ? (
        <textarea
          id={name}
          name={name}
          required={required}
          rows={rows}
          className={inputClasses}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          className={inputClasses}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
