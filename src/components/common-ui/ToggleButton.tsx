import { cva } from 'class-variance-authority';
import { cn } from '@/utils/cn';

interface ToggleSwitchProps {
  checked: boolean;
  onClick?: () => void;
  className?: string;
}

const toggleContainer = cva(
  'relative inline-flex w-[46px] h-[28px] rounded-full transition-colors duration-300 cursor-pointer',
  {
    variants: {
      checked: {
        true: 'bg-primary-50',
        false: 'bg-gray-20',
      },
    },
  }
);

const toggleCircle = cva(
  'absolute top-1 left-1 h-[22px] w-[22px] rounded-full bg-gray-0 transition-transform duration-300',
  {
    variants: {
      checked: {
        true: 'translate-x-[16px] translate-y-[-1px]',
        false: 'translate-x-0 translate-y-[-1px]',
      },
    },
  }
);

export default function ToggleButton({
  checked,
  onClick,
  className,
}: ToggleSwitchProps) {
  return (
    <button
      onClick={onClick}
      className={cn(toggleContainer({ checked }), className)}
      role="switch"
      aria-checked={checked}
    >
      <span className={toggleCircle({ checked })} />
    </button>
  );
}

//   const [isOn, setIsOn] = useState(false);
//   <ToggleButton checked={isOn} onClick={() => setIsOn(!isOn)} />
