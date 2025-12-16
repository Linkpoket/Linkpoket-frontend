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
    className="flex flex-col items-center justify-center gap-[13px]"
    aria-label={ariaLabel}
  >
    <div className="bg-gray-10 hover:bg-gray-20 active:bg-gray-30 relative flex h-[62px] w-[74px] items-center justify-center rounded-xl transition-colors">
      {icon}
      <div className="border-gray-30 absolute -top-0.5 -right-0.5 flex h-[21px] w-[21px] items-center justify-center rounded-full border bg-white">
        <PlusIcon className="text-gray-90 h-[13px] w-[13px]" />
      </div>
    </div>
    <span className="text-gray-90 text-[16px] font-medium">{label}</span>
  </button>
);
