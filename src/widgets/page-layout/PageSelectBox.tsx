import { useEffect, useRef, useState } from 'react';
import PageSelectBoxIcon from '@/shared/assets/PageSelectBoxIcon.svg?react';
import PageSelectBoxIconUp from '@/shared/assets/PageSelectBoxIconUp.svg?react';
import PageSelectBoxIconCheck from '@/shared/assets/PageSelectBoxIconCheck.svg?react';
import { cn } from '@/shared/lib/util/utils';

type Option = '기본순' | '최신순' | '이름순';

interface SortSelectProps {
  options?: Option[];
  defaultValue?: Option;
  onChange?: (value: Option) => void;
}

export default function PageSelectBox({
  options = ['기본순', '최신순', '이름순'],
  defaultValue = '기본순',
  onChange,
}: SortSelectProps) {
  const [selected, setSelected] = useState<Option>(defaultValue);
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

  const handleSelect = (opt: Option) => {
    setSelected(opt);
    setIsOpen(false);
    onChange?.(opt);
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        aria-haspopup="listbox"
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-gray-5 text-gray-60 inline-flex h-[48px] min-w-max cursor-pointer items-center justify-between gap-[10px] rounded-[8px] px-[20px] text-[17px] font-[600]"
      >
        <span>{selected}</span>
        {isOpen ? <PageSelectBoxIconUp /> : <PageSelectBoxIcon />}
      </button>

      {isOpen && (
        <ul
          role="menu"
          className="border-gray-30 text-gray-90 absolute z-10 mt-1 w-full rounded-[10px] border p-[8px] text-[17px] font-[600]"
        >
          {options.map((opt) => (
            <li
              key={opt}
              role="menuitem"
              onClick={() => handleSelect(opt)}
              className={cn(
                'hover:bg-gray-5 flex cursor-pointer items-center justify-between px-3 py-3',
                selected === opt && 'bg-gray-5 rounded-[8px]'
              )}
            >
              <span>{opt}</span>
              {selected === opt && (
                <PageSelectBoxIconCheck className="h-4 w-4 text-gray-500" />
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
// />;
