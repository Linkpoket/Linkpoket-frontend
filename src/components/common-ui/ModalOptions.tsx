import { useUpdateSharedPageMemberType } from '@/hooks/mutations/useUpdateSharedPageMemberType';
import { UpdateSharedPagePermissionData } from '@/types/pages';
import { useState } from 'react';

export default function ModalOptions({
  userRole,
  pageId,
  email,
  memberId,
}: {
  userRole: string;
  pageId: string;
  email: string;
  memberId: string;
}) {
  const [role, setRole] = useState(userRole || '');

  const updateMemberRole = useUpdateSharedPageMemberType();

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!pageId) return;

    const requestBody: UpdateSharedPagePermissionData = {
      baseRequest: {
        pageId,
        commandType: 'SHARED_PAGE_PERMISSION_CHANGE',
      },
      targetMemberId: memberId,
      permissionType: role,
    };

    updateMemberRole.mutate(requestBody);
    setRole(e.target.value as 'VIEWER' | 'EDITOR' | 'HOST' | 'null');

    // console.log('권한 변경 데이터', requestBody);
    // console.log('권한변경', pageId, email, e.target.value);
  };

  return (
    <div className="absolute top-1/2 right-1 -translate-y-1/2">
      <div className="relative">
        <select
          value={role}
          onChange={handleRoleChange}
          className="border-gray-5 text-gray-60 bg-gray-5 h-[42px] w-[87px] cursor-pointer appearance-none rounded-lg border px-3 text-[14px] font-[600] focus:outline-none"
        >
          <option value="VIEWER">뷰어</option>
          <option value="EDITOR">에디터</option>
          <option value="HOST">호스트</option>
          <option value="null" className="text-status-danger">
            내보내기
          </option>
        </select>
        {/* 커스텀 화살표 */}
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          <svg
            className="text-gray-60 h-4 w-4"
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
        </div>
      </div>
    </div>
  );
}
