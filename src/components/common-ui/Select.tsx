import { useState, useRef, useEffect } from 'react';

type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'onChange'
> & {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: boolean;
  variant?: 'default' | 'error';
  errorMessage?: string;
  maxHeight?: string;
};

export const Select = ({
  options,
  value,
  onChange,
  placeholder = '선택해 주세요',
  error = false,
  variant = 'default',
  errorMessage,
  maxHeight = '300px',
  ...props
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const selectedOption = options.find((option) => option.value === value);
  const selectRef = useRef<HTMLDivElement>(null);

  // variant와 error 값을 결합하여 최종 에러 상태 결정
  const isError = error || variant === 'error';

  // 외부 클릭 감지하여 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={selectRef} className="relative">
      <button
        type="button"
        className={`flex w-full items-center justify-between rounded-lg border p-3 transition-all focus:outline-none ${isError ? 'border-red-500' : 'border-gray-30'} ${isFocused ? 'ring-primary-30 border-primary-40 ring-2' : ''} `}
        onClick={() => {
          setIsOpen(!isOpen);
          setIsFocused(true);
        }}
        onFocus={() => setIsFocused(true)}
        {...props}
      >
        <span className={value ? 'text-gray-900' : 'text-gray-500'}>
          {selectedOption?.label || placeholder}
        </span>
        <svg
          className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute z-10 mt-1 w-full overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg"
          style={{ maxHeight }}
        >
          {options.map((option, index) => {
            const isFirst = index === 0;
            const isLast = index === options.length - 1;

            return (
              <div
                key={option.value}
                className={`hover:bg-gray-10 mx-4 cursor-pointer rounded-lg p-4 ${isFirst ? 'mt-4' : ''} ${isLast ? 'mb-4' : ''} `}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </div>
            );
          })}
        </div>
      )}

      {isError && errorMessage && (
        <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};
