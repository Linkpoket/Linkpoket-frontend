import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/util/utils';
import Status from '@/shared/assets/Status.svg?react';

const inputVariants = cva(
  'w-full px-4 py-3 bg-white border rounded-lg transition-all focus:outline-none focus:ring-2',
  {
    variants: {
      variant: {
        default: 'border-gray-30 focus:ring-primary-30 focus:border-primary-40',
        error:
          'border-error-50 focus:ring-error-30 focus:border-error-50 text-status-danger',
        disabled: 'bg-gray-10 text-gray-50 border-gray-30 cursor-not-allowed',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: string;
  errorMessage?: string;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      label,
      errorMessage,
      containerClassName,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputVariant = disabled ? 'disabled' : variant;

    // 에러 상태일 때 적용할 스타일 클래스
    const errorStyles =
      variant === 'error'
        ? 'border-status-danger focus:ring-status-danger focus:border-status-danger'
        : '';

    return (
      <div className={cn('flex flex-col space-y-1', containerClassName)}>
        {label && (
          <label
            htmlFor={props.id}
            className="text-sm font-medium text-gray-80"
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          className={cn(
            inputVariants({ variant: inputVariant }),
            errorStyles,
            className
          )}
          disabled={disabled}
          {...props}
        />

        {errorMessage && variant === 'error' && (
          <div className="flex mt-1">
            <Status className="mr-1" />
            <p className="text-sm text-status-danger">{errorMessage}</p>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
