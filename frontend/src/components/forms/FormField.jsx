export const FormField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  options = [],
  error,
  rows = 3,
  required = false
}) => {
  const baseClasses =
    'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition'

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          className={`${baseClasses} resize-none`}
        />
      ) : type === 'select' ? (
        <select id={name} name={name} value={value} onChange={onChange} className={baseClasses}>
          <option value="">Select...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          className={baseClasses}
        />
      )}

      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  )
}
