import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import Status from '@/assets/common-ui-assets/Status.svg?react';

const inputVariants = cva(
  'w-full px-4 py-3 bg-white border rounded-lg transition-all focus:outline-none focus:ring-2',
  {
    variants: {
      variant: {
        default:
          'border-gray-30 focus:ring-primary-30 focus:border-primary-40 placeholder:text-gray-50',
        error:
          'border-error-50 focus:ring-error-30 focus:border-error-50 text-status-danger',
        disabled: 'bg-gray-5 text-gray-50 border-gray-20 cursor-not-allowed',
        completed: 'border-primary-50 text-gray-90 placeholder:text-gray-50',
      },
      inputSize: {
        default: 'text-sm',
        medium: 'text-[16px]',
      },
      isModal: {
        true: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'default',
      isModal: false,
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: React.ReactNode;
  labelClassName?: string;
  errorMessage?: string;
  containerClassName?: string;
  inputSize?: 'default' | 'medium';
  isModal?: boolean;
  maxLength?: number;
  showCharCount?: boolean;
  charCountClassName?: string;
  focusColor?: string;
}

export const Input = ({
  className,
  variant,
  inputSize = 'default',
  isModal = false,
  label,
  labelClassName,
  errorMessage,
  containerClassName,
  disabled,
  maxLength,
  showCharCount = false,
  charCountClassName,
  value,
  onChange,
  focusColor,
  ...props
}: InputProps) => {
  const inputVariant = disabled ? 'disabled' : variant;

  const errorStyles =
    variant === 'error'
      ? 'border-status-danger focus:ring-status-danger focus:border-status-danger'
      : '';

  const customFocusStyles = focusColor
    ? ({
        '--focus-ring-color': `${focusColor}40`,
        '--focus-border-color': focusColor,
      } as React.CSSProperties)
    : {};

  const currentLength = typeof value === 'string' ? value.length : 0;
  const isNearLimit = maxLength && currentLength >= maxLength * 0.8;
  const isAtLimit = maxLength && currentLength >= maxLength;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (maxLength && e.target.value.length > maxLength) {
      return;
    }
    onChange?.(e);
  };

  return (
    <div
      className={cn(
        'flex w-full flex-col space-y-2 sm:w-auto',
        containerClassName
      )}
    >
      {label && (
        <label
          htmlFor={props.id}
          className={cn('text-gray-70 text-sm font-medium', labelClassName)}
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          className={cn(
            inputVariants({ variant: inputVariant, inputSize, isModal }),
            errorStyles,
            focusColor &&
              'focus:border-[var(--focus-border-color)] focus:ring-[var(--focus-ring-color)]',
            className
          )}
          style={customFocusStyles}
          disabled={disabled}
          maxLength={maxLength}
          value={value}
          onChange={handleChange}
          {...props}
        />

        {/* 글자수 표시 */}
        {(showCharCount || maxLength) && (
          <div
            className={cn(
              'pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs',
              isAtLimit
                ? 'text-status-danger'
                : isNearLimit
                  ? 'text-yellow-600'
                  : 'text-gray-50',
              charCountClassName
            )}
          >
            {maxLength ? `${currentLength}/${maxLength}` : currentLength}
          </div>
        )}
      </div>

      {errorMessage && variant === 'error' && (
        <div className="mt-1 flex">
          <Status className="mr-1" />
          <p className="text-status-danger text-sm">{errorMessage}</p>
        </div>
      )}

      {/* 글자수 초과 경고 메시지 */}
      {maxLength && isAtLimit && (
        <p className="text-status-danger text-xs">
          최대 {maxLength}자까지 입력 가능합니다.
        </p>
      )}
    </div>
  );
};

Input.displayName = 'Input';
