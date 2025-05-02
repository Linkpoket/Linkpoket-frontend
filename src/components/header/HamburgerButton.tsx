import Hamburger from '@/assets/widget-ui-assets/Hamburger.svg?react';

export function HamburgerButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="active:bg-gray-10 hover:bg-gray-10 flex h-[38px] w-[38px] items-center justify-center p-[10px] hover:rounded-[10px] active:rounded-[8px]">
      <button
        onClick={onClick}
        className="cursor-pointer px-[2px] pt-[5px] pb-[4px]"
      >
        <Hamburger />
      </button>
    </div>
  );
}
