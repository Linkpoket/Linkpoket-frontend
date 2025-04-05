import { cn } from '@/shared/lib/util/utils';

type SpinnerProps = {
  display?: boolean;
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
    | 'center';
};

const Spinner = (props: SpinnerProps) => {
  const { display = false, position = 'top-right' } = props;

  const positionClasses = {
    'top-left': 'top-2 left-2',
    'top-center': 'top-2 left-1/2 transform -translate-x-1/2',
    'top-right': 'top-2 right-2',
    'bottom-left': 'bottom-2 left-2',
    'bottom-center': 'bottom-2 left-1/2 transform -translate-x-1/2',
    'bottom-right': 'bottom-2 right-2',
    center: 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
  };

  return (
    <div
      className={cn(
        'fixed z-[10000] w-10 h-10 flex items-center justify-center',
        display ? 'block' : 'hidden',
        positionClasses[position]
      )}
    >
      <div className="relative w-8 h-8">
        <div className="absolute w-8 h-8 border-4 border-green-500 border-solid border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute w-8 h-8 border-4 border-green-500 border-solid border-t-transparent rounded-full animate-spin delay-150"></div>
        <div className="absolute w-8 h-8 border-4 border-green-500 border-solid border-t-transparent rounded-full animate-spin delay-300"></div>
        <div className="absolute w-8 h-8 border-4 border-green-500 border-solid border-t-transparent rounded-full animate-spin delay-450"></div>
      </div>
    </div>
  );
};

export { Spinner, type SpinnerProps };
