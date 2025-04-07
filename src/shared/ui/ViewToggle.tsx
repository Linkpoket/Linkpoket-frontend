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
  'flex-1 flex items-center justify-center transition-colors bg-[#E4E4E4] p-2',
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

const iconClass = cva('h-[20px] w-[20px] transition-colors', {
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
    <div
      className={cn(
        'flex w-[128px] h-[58px] rounded-[8px] overflow-hidden',
        className
      )}
    >
      <button
        onClick={() => onChange('grid')}
        className={toggleButton({ active: selectedView === 'grid' })}
      >
        <ToggleList
          className={iconClass({ active: selectedView === 'grid' })}
        />
      </button>
      <button
        onClick={() => onChange('list')}
        className={toggleButton({ active: selectedView === 'list' })}
      >
        <ToggleGrid
          className={iconClass({ active: selectedView === 'list' })}
        />
      </button>
    </div>
  );
}

// 사용방법;
// const [view, setView] = useState<'grid' | 'list'>('grid');
//   <ViewToggle selectedView={view} onChange={setView} />;
