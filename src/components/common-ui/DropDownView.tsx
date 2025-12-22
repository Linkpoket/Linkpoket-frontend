import { useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/cn';
import PageSortBoxIcon from '@/assets/common-ui-assets/PageSortBoxIcon.svg?react';
import PageSortBoxIconUp from '@/assets/common-ui-assets/PageSortBoxIconUp.svg?react';
import PageSortBoxIconCheck from '@/assets/common-ui-assets/PageSortBoxIconCheck.svg?react';

interface SortSelectProps {
  sortType: string;
  setSortType: (value: string) => void;
  className?: string;
}

export default function DropDownView({
  sortType,
  setSortType,
  className,
}: SortSelectProps) {
  const options = ['기본순', '최신순', '이름순'];
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (option: string) => {
    setIsOpen(false);
    setSortType(option);
  };

  return (
    <div
      ref={dropdownRef}
      className={cn('relative inline-block text-left', className)}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        aria-haspopup="listbox"
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-gray-60 inline-flex h-[48px] min-w-max cursor-pointer items-center justify-between gap-[10px] rounded-[8px] px-[20px] text-[14px] font-[600]"
      >
        <span>{sortType}</span>
        {isOpen ? <PageSortBoxIconUp /> : <PageSortBoxIcon />}
      </button>

      {isOpen && (
        <>
          {/* 버튼과 드롭다운 사이 간격을 채우는 보이지 않는 영역 */}
          <div className="absolute top-full right-0 left-0 h-1" />
          <ul
            role="menu"
            className="border-gray-30 text-gray-90 bg-gray-0 absolute z-[9999] mt-1 w-full rounded-[10px] border p-[8px] text-[14px] font-[600]"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            {options.map((option) => (
              <li
                key={option}
                role="menuitem"
                onClick={() => handleSelect(option)}
                className={cn(
                  'hover:bg-gray-5 flex cursor-pointer items-center justify-between px-3 py-3 hover:rounded-[8px]',
                  sortType === option && 'bg-gray-5 rounded-[8px]'
                )}
              >
                <span>{option}</span>
                {sortType === option && (
                  <PageSortBoxIconCheck className="h-4 w-4 text-gray-500" />
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
