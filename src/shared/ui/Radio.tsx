import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/util/utils';

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
  disabled?: boolean;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, size, label, disabled, containerClassName, ...props }, ref) => {
    const radioSize = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    };

    const dotSize = {
      sm: 'w-2 h-2',
      md: 'w-2.5 h-2.5',
      lg: 'w-3 h-3',
    };

    return (
      <label
        className={cn(radioVariants({ size, disabled }), containerClassName)}
      >
        <div className="relative flex items-center justify-center">
          <input
            type="radio"
            ref={ref}
            disabled={disabled}
            className={cn(
              'peer appearance-none border border-gray-30 rounded-full',
              'checked:border-[#FF9320] checked:border-2',
              'focus:outline-none focus:ring-2 focus:ring-[#FF9320]/50',
              'disabled:border-gray-30 disabled:bg-gray-10',
              radioSize[size || 'md'],
              className
            )}
            {...props}
          />
          <div
            className={cn(
              'absolute rounded-full bg-[#FF9320] opacity-0 peer-checked:opacity-100 pointer-events-none',
              dotSize[size || 'md']
            )}
          ></div>
        </div>
        {label && (
          <span className={cn('text-gray-90', disabled ? 'text-gray-50' : '')}>
            {label}
          </span>
        )}
      </label>
    );
  }
);

Radio.displayName = 'Radio';
