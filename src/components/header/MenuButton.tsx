import { useState } from 'react';
import Menu from '@/assets/widget-ui-assets/Menu.svg?react';
import HeaderMenu from './HeaderMenu';

interface MenuButtonProps {
  onAlarmClose?: () => void;
}

/*
메뉴 버튼 컴포넌트
메뉴 버튼 표시 및 HeaderMenu 관리만을 위해 분리 
 */
export const MenuButton = ({ onAlarmClose }: MenuButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAlarmClose?.();
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <button
        className={`hover:bg-gray-10 active:bg-gray-10 flex h-[32px] w-[32px] cursor-pointer items-center justify-center hover:rounded-[8px] active:rounded-[8px] ${isOpen ? 'bg-gray-10 rounded-[8px]' : ''}`}
        onClick={handleClick}
        aria-label="메뉴 열기"
      >
        <Menu className="relative" />
      </button>

      {isOpen && (
        <HeaderMenu
          isHost={true}
          setIsOpen={() => setIsOpen(!isOpen)}
          onWithDrawPage={() => console.log('탈퇴')}
          onContact={() => setIsContactOpen(!isContactOpen)}
          isContactOpen={isContactOpen}
        />
      )}
    </>
  );
};
