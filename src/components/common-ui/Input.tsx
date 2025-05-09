import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import Status from '@/assets/common-ui-assets/Status.svg?react';

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
      inputSize: {
        default: 'text-base',
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
  ...props
}: InputProps) => {
  const inputVariant = disabled ? 'disabled' : variant;

  const errorStyles =
    variant === 'error'
      ? 'border-status-danger focus:ring-status-danger focus:border-status-danger'
      : '';

  return (
    <div className={cn('flex flex-col space-y-4', containerClassName)}>
      {label && (
        <label
          htmlFor={props.id}
          className={cn(
            'text-gray-80 font-medium',
            // 모달용 라벨 폰트 사이즈 조정
            isModal || inputSize === 'medium' ? 'text-[16px]' : 'text-sm',
            labelClassName
          )}
        >
          {label}
        </label>
      )}

      <input
        className={cn(
          inputVariants({ variant: inputVariant, inputSize, isModal }),
          errorStyles,
          className
        )}
        disabled={disabled}
        {...props}
      />

      {errorMessage && variant === 'error' && (
        <div className="mt-1 flex">
          <Status className="mr-1" />
          <p className="text-status-danger text-sm">{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

Input.displayName = 'Input';
