import React, { forwardRef, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/util/utils';
import Close from '@/shared/assets/Close.svg?react';
import Search from '@/shared/assets/Search.svg?react';

const searchBarVariants = cva(
  'flex items-center relative w-full text-gray-90 bg-white transition-all focus-within:ring-2 focus-within:ring-primary-30 focus-within:border-primary-40',
  {
    variants: {
      variant: {
        default: 'border border-gray-30',
        filled: 'bg-gray-10 border border-transparent hover:bg-gray-20',
      },
      size: {
        sm: 'h-8 text-sm rounded-md',
        md: 'h-10 text-base rounded-lg',
        lg: 'h-12 text-lg rounded-lg',
        fixed: 'h-[48px] text-base rounded-lg', // 피그마 디자인 기준 고정 높이
      },
      width: {
        auto: 'w-full',
        fixed: 'w-[384px]', // 피그마 디자인 기준 고정 너비
      },
      isError: {
        true: 'border-error-50 focus-within:ring-error-30 focus-within:border-error-50',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      isError: false,
    },
  }
);

export interface SearchBarProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'width'>,
    VariantProps<typeof searchBarVariants> {
  onClear?: () => void;
  showClearButton?: boolean;
  label?: string;
  errorMessage?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
  placeholder?: string;
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      className,
      variant,
      size,
      width,
      isError,
      onClear,
      showClearButton = true,
      label,
      errorMessage,
      rightIcon,
      containerClassName,
      placeholder,
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState(props.value || '');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);

      // props.onChange가 있으면 호출
      if (props.onChange) {
        props.onChange(e);
      }
    };

    const handleClear = () => {
      setInputValue('');
      if (onClear) {
        onClear();
      }
    };

    return (
      <div className="flex w-full flex-col gap-1">
        {label && (
          <label
            htmlFor={props.id}
            className="text-gray-80 text-sm font-medium"
          >
            {label}
          </label>
        )}

        <div
          className={cn(
            searchBarVariants({ variant, size, width, isError }),
            containerClassName
          )}
        >
          <input
            ref={ref}
            className={cn(
              'h-full w-full bg-transparent px-3 py-2 placeholder:text-gray-50 focus:outline-none',
              className
            )}
            type="text"
            placeholder={placeholder}
            value={inputValue}
            onChange={handleChange}
            {...props}
          />

          {inputValue && showClearButton ? (
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-60 hover:text-gray-90 mr-2 flex-shrink-0 rounded-full p-1"
              aria-label="Clear search"
            >
              <Close
                width={size === 'sm' ? 14 : size === 'md' ? 18 : 22}
                height={size === 'sm' ? 14 : size === 'md' ? 18 : 22}
              />
            </button>
          ) : (
            rightIcon || (
              <Search
                className="text-gray-60 mr-3 flex-shrink-0"
                width={size === 'sm' ? 16 : size === 'md' ? 20 : 24}
                height={size === 'sm' ? 16 : size === 'md' ? 20 : 24}
              />
            )
          )}
        </div>

        {errorMessage && isError && (
          <p className="text-error-60 mt-1 text-sm">{errorMessage}</p>
        )}
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';
