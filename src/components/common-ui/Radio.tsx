import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const radioVariants = cva('relative flex items-center', {
  variants: {
    size: {
      sm: 'gap-2 text-sm',
      md: 'gap-3 text-base',
      lg: 'gap-4 text-lg',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
    },
    error: {
      true: 'text-red-500',
    },
    isModal: {
      true: 'gap-3',
    },
  },
  defaultVariants: {
    size: 'md',
    disabled: false,
  },
});

export interface RadioProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      'size' | 'disabled'
    >,
    VariantProps<typeof radioVariants> {
  label?: string;
  containerClassName?: string;
  error?: boolean;
  disabled?: boolean;
  isModal?: boolean;
}

export const Radio = ({
  className,
  size,
  label,
  disabled,
  error,
  containerClassName,
  isModal = false,
  ...props
}: RadioProps) => {
  const radioSize = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const dotSize = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
  };

  return (
    <label
      className={cn(
        radioVariants({ size, disabled, error, isModal }),
        containerClassName
      )}
    >
      <div className="relative flex items-center justify-center">
        <input
          type="radio"
          disabled={disabled}
          className={cn(
            'peer appearance-none rounded-full border',
            error
              ? 'border-red-500 checked:border-0 checked:bg-red-500 focus:ring-red-500/50'
              : 'border-gray-30 checked:border-0 checked:bg-[#FF9320] focus:ring-[#FF9320]/50',
            'focus:ring-2 focus:outline-none',
            'disabled:border-gray-30 disabled:bg-gray-10',
            isModal ? 'h-[18px] w-[18px]' : radioSize[size || 'md'],
            className
          )}
          {...props}
        />
        <div
          className={cn(
            'pointer-events-none absolute rounded-full bg-white opacity-0 peer-checked:opacity-100',
            isModal ? 'h-[6px] w-[6px]' : dotSize[size || 'md']
          )}
        ></div>
      </div>
      {label && (
        <span
          className={cn(
            'text-gray-90',
            isModal ? 'text-[14px]' : 'text-[19px]',
            disabled ? 'text-gray-50' : ''
          )}
        >
          {label}
        </span>
      )}
    </label>
  );
};

Radio.displayName = 'Radio';
