import Hamburger from '@/assets/widget-ui-assets/Hamburger.svg?react';

interface Props {
  onClick: () => void;
  className?: string;
}

export function HamburgerButton({ onClick, className }: Props) {
  return (
    <button
      onClick={onClick}
      className={`hamburger-button cursor-pointer ${className ?? ''}`.trim()}
      aria-label="메뉴 열기"
      type="button"
    >
      <Hamburger />
    </button>
  );
}
