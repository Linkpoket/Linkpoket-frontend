import React, { forwardRef, useEffect, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import Close from '@/assets/common-ui-assets/Close.svg?react';
import SearchIcon from '@/assets/common-ui-assets/Search.svg?react';

const searchVariants = cva(
  'flex items-center relative w-full text-gray-90 bg-white transition-all focus-within:ring-2',
  {
    variants: {
      variant: {
        default: 'border border-gray-30 bg-gray-5',
        filled: 'bg-gray-10 border border-transparent hover:bg-gray-20',
      },
      size: {
        sm: 'h-8 text-sm rounded-md',
        md: 'h-10 text-[15px] rounded-lg',
        lg: 'h-12 text-lg rounded-lg',
        fixed: 'h-[48px] text-[15px] rounded-lg',
      },
      width: {
        auto: 'w-full',
        fixed: 'w-[384px]',
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

export interface SearchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'width'>,
    VariantProps<typeof searchVariants> {
  onClear?: () => void;
  showClearButton?: boolean;
  label?: string;
  errorMessage?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
  placeholder?: string;
  focusColor?: string;
}

export const Search = forwardRef<HTMLInputElement, SearchProps>(
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
      focusColor,
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState(props.value || '');

    useEffect(() => {
      setInputValue(props.value || '');
    }, [props.value]);

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

    const customFocusStyles = focusColor
      ? ({
          '--focus-ring-color': `${focusColor}40`,
          '--focus-border-color': focusColor,
        } as React.CSSProperties)
      : {};

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
            searchVariants({ variant, size, width, isError }),
            focusColor &&
              'focus-within:border-[var(--focus-border-color)] focus-within:ring-[var(--focus-ring-color)]',
            containerClassName
          )}
          style={customFocusStyles}
        >
          <input
            ref={ref}
            className={cn(
              'font-regular h-full w-full bg-transparent px-3 py-2 placeholder:text-gray-50 focus:outline-none',
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
              className="text-gray-60 hover:text-gray-90 mr-1 flex-shrink-0 rounded-full p-1"
              aria-label="Clear search"
            >
              <Close
                className="text-gray-60"
                width={size === 'sm' ? 14 : size === 'md' ? 18 : 22}
                height={size === 'sm' ? 14 : size === 'md' ? 18 : 22}
              />
            </button>
          ) : (
            rightIcon || (
              <SearchIcon
                className="text-gray-60 mr-3 flex-shrink-0"
                width={size === 'sm' ? 16 : size === 'md' ? 20 : 22}
                height={size === 'sm' ? 16 : size === 'md' ? 20 : 22}
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

Search.displayName = 'Search';
