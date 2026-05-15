interface FormFieldProps {
  label: string
  value: string
  onChange?: (val: string) => void
  type?: string
  placeholder?: string
  readOnly?: boolean
  disabled?: boolean
  className?: string
}

export default function FormField({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  readOnly = false,
  disabled = false,
  className = '',
}: FormFieldProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-sm font-semibold text-foreground">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
        className="
          w-full px-3 py-2.5 rounded-md
          bg-input text-foreground
          border border-transparent
          focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
          placeholder:text-muted-foreground
          disabled:opacity-50 disabled:cursor-not-allowed
          read-only:cursor-default
          text-sm leading-relaxed transition-colors
        "
      />
    </div>
  )
}
