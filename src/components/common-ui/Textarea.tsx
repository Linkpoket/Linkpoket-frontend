import React from 'react';
import { cn } from '@/utils/cn';

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode;
  labelClassName?: string;
  containerClassName?: string;
  isModal?: boolean;
}

export const Textarea = ({
  className,
  label,
  labelClassName,
  containerClassName,
  isModal = false,
  ...props
}: TextareaProps) => {
  return (
    <div className={cn('flex flex-col space-y-4', containerClassName)}>
      {label && (
        <label
          htmlFor={props.id}
          className={cn(
            'text-gray-80 font-medium',
            isModal ? 'text-[16px]' : 'text-sm',
            labelClassName
          )}
        >
          {label}
        </label>
      )}

      <textarea
        className={cn(
          'border-gray-30 focus:ring-primary-30 focus:border-primary-40 w-full resize-none rounded-lg border bg-white px-4 py-3 transition-all focus:ring-2 focus:outline-none',
          className
        )}
        rows={4}
        {...props}
      />
    </div>
  );
};
