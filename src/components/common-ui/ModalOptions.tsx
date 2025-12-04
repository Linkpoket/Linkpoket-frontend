import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useUpdateSharedPageMemberType } from '@/hooks/mutations/useUpdateSharedPageMemberType';
import { UpdateSharedPagePermissionData } from '@/types/pages';
import { cn } from '@/utils/cn';

const ROLE_OPTIONS = [
  { value: 'VIEWER', label: '뷰어' },
  { value: 'EDITOR', label: '에디터' },
  { value: 'HOST', label: '호스트' },
  { value: 'null', label: '보내기', isDanger: true },
];

const getRoleLabel = (value: string) => {
  return ROLE_OPTIONS.find((option) => option.value === value)?.label || '';
};

export default function ModalOptions({
  userRole,
  pageId,
  email: _email,
  memberId,
}: {
  userRole: string;
  pageId: string;
  email: string;
  memberId: string;
}) {
  const [role, setRole] = useState(userRole || '');
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const updateMemberRole = useUpdateSharedPageMemberType();

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        buttonRef.current &&
        !buttonRef.current.contains(target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !buttonRef.current || !dropdownRef.current) return;

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const dropdown = dropdownRef.current;

    dropdown.style.position = 'fixed';
    dropdown.style.top = `${buttonRect.top + 50}px`;
    dropdown.style.left = `${buttonRect.right - dropdown.offsetWidth + 10}px`;
    dropdown.style.zIndex = '10000';
  }, [isOpen]);

  const handleRoleSelect = (selectedValue: string) => {
    if (!pageId) return;

    const requestBody: UpdateSharedPagePermissionData = {
      baseRequest: {
        pageId,
        commandType: 'SHARED_PAGE_PERMISSION_CHANGE',
      },
      targetMemberId: memberId,
      permissionType: selectedValue as 'VIEWER' | 'EDITOR' | 'HOST' | 'null',
    };

    updateMemberRole.mutate(requestBody);
    setRole(selectedValue);
    setIsOpen(false);
  };

  return (
    <>
      <div className="absolute top-1/2 right-1 -translate-y-1/2">
        <button
          ref={buttonRef}
          onClick={() => setIsOpen((prev) => !prev)}
          className="border-gray-5 bg-gray-5 text-gray-60 relative inline-flex h-[42px] w-[92px] cursor-pointer items-center justify-between gap-[10px] rounded-lg border px-3 text-[14px] font-[600] focus:outline-none"
        >
          <span>{getRoleLabel(role)}</span>
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {isOpen &&
        createPortal(
          <ul
            ref={dropdownRef}
            role="menu"
            className="border-gray-30 text-gray-90 bg-gray-0 absolute z-10 w-[87px] rounded-[10px] border p-[8px] text-[14px] font-[600]"
          >
            {ROLE_OPTIONS.map((option) => (
              <li
                key={option.value}
                role="menuitem"
                onClick={() => handleRoleSelect(option.value)}
                className={cn(
                  'hover:bg-gray-5 flex cursor-pointer items-center justify-between px-3 py-3 hover:rounded-[8px]',
                  role === option.value && 'bg-gray-5 rounded-[8px]',
                  option.isDanger && 'text-status-danger'
                )}
              >
                <span>{option.label}</span>
              </li>
            ))}
          </ul>,
          document.body
        )}
    </>
  );
}
