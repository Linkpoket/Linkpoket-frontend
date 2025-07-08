import { useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/cn';
import PageSortBoxIcon from '@/assets/common-ui-assets/PageSortBoxIcon.svg?react';
import PageSortBoxIconUp from '@/assets/common-ui-assets/PageSortBoxIconUp.svg?react';
import PageSortBoxIconCheck from '@/assets/common-ui-assets/PageSortBoxIconCheck.svg?react';

interface SortSelectProps {
  options?: string[];
  onChange?: (value: string) => void;
  className?: string;
}

export default function DropDownView({
  options = ['기본순', '최신순', '이름순'],
  onChange,
  className,
}: SortSelectProps) {
  const [selected, setSelected] = useState<string>(options[0]);
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
    setSelected(option);
    setIsOpen(false);
    onChange?.(option);
  };

  return (
    <div
      ref={dropdownRef}
      className={cn('relative inline-block text-left', className)}
    >
      <button
        aria-haspopup="listbox"
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-gray-5 text-gray-60 inline-flex h-[48px] min-w-max cursor-pointer items-center justify-between gap-[10px] rounded-[8px] px-[20px] text-[16px] font-[600]"
      >
        <span>{selected}</span>
        {isOpen ? <PageSortBoxIconUp /> : <PageSortBoxIcon />}
      </button>

      {isOpen && (
        <ul
          role="menu"
          className="border-gray-30 text-gray-90 bg-gray-0 absolute z-10 mt-1 w-full rounded-[10px] border p-[8px] text-[16px] font-[600]"
        >
          {options.map((option) => (
            <li
              key={option}
              role="menuitem"
              onClick={() => handleSelect(option)}
              className={cn(
                'hover:bg-gray-5 flex cursor-pointer items-center justify-between px-3 py-3 hover:rounded-[8px]',
                selected === option && 'bg-gray-5 rounded-[8px]'
              )}
            >
              <span>{option}</span>
              {selected === option && (
                <PageSortBoxIconCheck className="h-4 w-4 text-gray-500" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// 사용하기. 해당 컴포넌트는 uncontrolled component임. onChange는 부모컴포넌트에서 선택된 값을 알기 위함함
// <SortSelect
//   defaultValue="기본순"
//   onChange={(val) => {
//     // 선택된 정렬값으로 API 요청 다시 보내기
//     fetchSortedPosts(val);
//   }}
// 또는 새로운 함수 로직 작성을 하고 onChange={새로운 함수} 이렇게도 가능
// />;
