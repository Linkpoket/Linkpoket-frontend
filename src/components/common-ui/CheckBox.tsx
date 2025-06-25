interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label?: string;
  variant?: 'default' | 'checkOnly';
}

export const Checkbox = ({
  label,
  variant = 'default',
  ...props
}: CheckboxProps) => {
  return (
    <label className="flex cursor-pointer items-center space-x-2">
      <div className="relative h-4 w-4">
        <input type="checkbox" className="peer sr-only" {...props} />
        <div
          className={`h-4 w-4 rounded ${
            variant === 'default'
              ? 'peer-checked:border-primary-50 peer-checked:bg-primary-50 border border-gray-300 bg-white'
              : 'border-transparent bg-transparent'
          }`}
        ></div>
        <div
          className={`pointer-events-none absolute inset-0 flex items-center justify-center ${
            variant === 'default'
              ? `text-white opacity-0 peer-checked:opacity-100`
              : 'peer-checked:text-primary-50 text-gray-300'
          }`}
        >
          <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      {label && <span className="text-sm text-gray-800">{label}</span>}
    </label>
  );
};
