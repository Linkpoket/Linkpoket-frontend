import useUpdateSharedPageInvitation from '@/hooks/mutations/updateSharedPageInvitation';
import { useState } from 'react';

export default function ModalOptions({
  userRole,
  pageId,
  email,
}: {
  userRole: string;
  pageId: number;
  email: string;
}) {
  const [role, setRole] = useState(userRole || '');

  const updateMemberRole = useUpdateSharedPageInvitation({
    pageId,
    onSuccess: () => {
      console.log('역할 변경 성공toast적용');
    },
    onError: (error) => {
      console.error('역할 변경 실패:', error);
    },
  });

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!pageId) return;

    updateMemberRole.mutate({
      baseRequest: {
        pageId,
        commandType: 'SHARED_PAGE_INVITATION',
      },
      receiverEmail: email,
      permissionType: e.target.value as 'VIEWER' | 'EDITOR' | 'HOST' | 'null',
    });

    setRole(e.target.value as 'VIEWER' | 'EDITOR' | 'HOST' | 'null');

    console.log('권한변경', pageId, email, e.target.value);
  };

  return (
    <div className="absolute top-1/2 right-1 -translate-y-1/2">
      <select
        value={role}
        onChange={handleRoleChange}
        className="border-gray-5 text-gray-60 bg-gray-5 h-[42px] w-[87px] rounded-lg border px-3 text-[14px] font-[600] focus:outline-none"
      >
        <option value="VIEWER">뷰어</option>
        <option value="EDITOR">에디터</option>
        <option value="HOST">호스트</option>
        <option value="null" className="text-status-danger">
          내보내기
        </option>
      </select>
    </div>
  );
}
