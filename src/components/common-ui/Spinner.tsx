import { cn } from '@/utils/cn';

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
        'absolute z-[10000] flex h-10 w-10 items-center justify-center',
        display ? 'block' : 'hidden',
        positionClasses[position]
      )}
    >
      <div className="relative h-8 w-8">
        <div className="border-gray-60 absolute h-8 w-8 animate-spin rounded-full border-4 border-solid border-t-transparent"></div>
        <div className="border-gray-60 absolute h-8 w-8 animate-spin rounded-full border-4 border-solid border-t-transparent delay-150"></div>
        <div className="border-gray-60 absolute h-8 w-8 animate-spin rounded-full border-4 border-solid border-t-transparent delay-300"></div>
        <div className="border-gray-60 absolute h-8 w-8 animate-spin rounded-full border-4 border-solid border-t-transparent delay-450"></div>
      </div>
    </div>
  );
};

export { Spinner, type SpinnerProps };
