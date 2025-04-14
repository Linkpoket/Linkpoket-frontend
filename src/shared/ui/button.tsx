import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/util/utils';

const buttonVariants = cva(
  'items-center justify-center text-center transition-colors focus:outline-none disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-50 text-primary-0 font-semibold hover:bg-primary-40 active:bg-primary-60 disabled:bg-gray-20 disabled:text-gray-50',
        secondary:
          'bg-primary-10 text-primary-60 font-semibold hover:bg-primary-20 active:bg-primary-30 disabled:bg-gray-20 disabled:text-gray-50',
        ghost:
          'bg-primary-0 text-gray-90 font-semibold border border-gray-30 hover:bg-gray-5 active:bg-gray-10 disabled:bg-primary-0 disabled:text-gray-50',
      },
      size: {
        sm: 'px-[10px] rounded-md',
        md: 'px-[16px] rounded-lg',
        lg: 'px-[20px] rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'sm',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
}

export function Button({
  className,
  variant,
  size,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
}
