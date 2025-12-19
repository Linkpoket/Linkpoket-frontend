import PlusIcon from '@/assets/common-ui-assets/PlusIcon.svg?react';

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  ariaLabel: string;
}

export const ActionButton = ({
  icon,
  label,
  onClick,
  ariaLabel,
}: ActionButtonProps) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center justify-center gap-[12px]"
    aria-label={ariaLabel}
  >
    <div className="bg-gray-10 hover:bg-gray-20 active:bg-gray-30 relative flex h-[58px] w-[69px] items-center justify-center rounded-xl transition-colors">
      {icon}
      <div className="border-gray-30 absolute -top-0.5 -right-0.5 flex h-[20px] w-[20px] items-center justify-center rounded-full border bg-white">
        <PlusIcon className="text-gray-90 h-[12px] w-[12px]" />
      </div>
    </div>
    <span className="text-gray-90 text-[15px] font-medium">{label}</span>
  </button>
);
