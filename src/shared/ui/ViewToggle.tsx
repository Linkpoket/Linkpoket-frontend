import { cva } from 'class-variance-authority';
import { cn } from '@/shared/lib/util/utils';
import ToggleGrid from '@/shared/assets/ToggleGrid.svg?react';
import ToggleList from '@/shared/assets/ToggleList.svg?react';

type ViewType = 'grid' | 'list';

interface ViewToggleProps {
  selectedView: ViewType;
  onChange: (view: ViewType) => void;
  className?: string;
}

const toggleButton = cva(
  'flex-1 flex items-center justify-center transition-colors bg-[#E4E4E4] cursor-pointer',
  {
    variants: {
      active: {
        true: 'bg-gray-20',
        false: 'bg-gray-5',
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

const iconClass = cva('h-[20px] w-[20px] p-[2px] transition-colors', {
  variants: {
    active: {
      true: 'text-gray-70',
      false: 'text-gray-40',
    },
  },
  defaultVariants: {
    active: false,
  },
});

export function ViewToggle({
  selectedView,
  onChange,
  className,
}: ViewToggleProps) {
  return (
    <div className={cn('flex h-[48px]', className)}>
      <button
        onClick={() => onChange('list')}
        className={cn(
          toggleButton({ active: selectedView === 'list' }),
          'rounded-tl-[8px] rounded-bl-[8px] p-[16px]'
        )}
      >
        <ToggleGrid
          className={iconClass({ active: selectedView === 'list' })}
        />
      </button>
      <button
        onClick={() => onChange('grid')}
        className={cn(
          toggleButton({ active: selectedView === 'grid' }),
          'rounded-tr-[8px] rounded-br-[8px] p-[16px]'
        )}
      >
        <ToggleList
          className={cn(
            iconClass({ active: selectedView === 'grid' }),
            'px-[3px] py-[4px]'
          )}
        />
      </button>
    </div>
  );
}
// 사용방법;
// const [view, setView] = useState<'grid' | 'list'>('grid');
//   <ViewToggle selectedView={view} onChange={setView} />;
