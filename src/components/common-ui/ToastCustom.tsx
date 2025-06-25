import { cva, VariantProps } from 'class-variance-authority';
import { toast } from 'react-hot-toast';
import { cn } from '@/utils/cn';
import Success from '@/assets/common-ui-assets/ToastSuccess.svg?react';
import Error from '@/assets/common-ui-assets/ToastError.svg?react';

interface ToastProps {
  message: string;
  variant: VariantProps<typeof toastVariants>['variant'];
}

const toastVariants = cva(
  'flex gap-[8px] justify-center text-center p-[16px] rounded-[10px] text-[17px] font-[400]',
  {
    variants: {
      variant: {
        success: 'bg-[#EDF7ED] border border-status-success ',
        error: 'bg-[#FEECEB] border border-status-error',
        info: 'bg-primary-5 border border-primary-50',
      },
    },
    defaultVariants: {
      variant: 'success',
    },
  }
);

const base = ({ message, variant }: ToastProps) => {
  toast.custom((t) => (
    <div
      className={cn(
        toastVariants({ variant }),
        t.visible ? 'animate-enter' : 'animate-leave'
      )}
    >
      {variant === 'success' && (
        <span>
          <Success />
        </span>
      )}
      {variant === 'error' && (
        <span>
          <Error />
        </span>
      )}

      <span>{message}</span>
    </div>
  ));
};

export const ToastCustom = {
  success: (msg: string) => base({ message: msg, variant: 'success' }),
  error: (msg: string) => base({ message: msg, variant: 'error' }),
  info: (msg: string) => base({ message: msg, variant: 'info' }),
};
