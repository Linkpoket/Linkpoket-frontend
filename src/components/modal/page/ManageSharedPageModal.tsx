import { useState } from 'react';
import Modal from '@/components/common-ui/Modal';
import { Button } from '@/components/common-ui/button';
import ToggleButton from '@/components/common-ui/ToggleButton';
import { Input } from '@/components/common-ui/Input';
import { useLocation, useParams } from 'react-router-dom';
import useFetchSharedPageDashboard from '@/hooks/queries/useFetchSharedPageDashboard';
import InviteUserModal from './InviteUserModal';
import ModalOptions from '@/components/common-ui/ModalOptions';
import SiteIcon from '@/assets/common-ui-assets/SiteIcon.svg?react';
import useUpdateSharedPageVisibility from '@/hooks/mutations/useUpdateSharedPageVisibility';
import { useFetchSharedPage } from '@/hooks/queries/useFetchSharedPage';
import { toast } from 'react-hot-toast';

interface ManageSharedPageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ManageSharedPageModal = ({
  isOpen,
  onClose,
}: ManageSharedPageModalProps) => {
  const [search, setSearch] = useState('');
  const [isOpenInviteUserModal, setIsOpenInviteUserModal] = useState(false);

  const handleClose = () => {
    if (!isOpenInviteUserModal) {
      onClose();
    }
  };

  const path = useLocation().pathname;
  const pathname = 'http://linkpoket.com' + path;
  const { pageId } = useParams();
  const safePageId = pageId ? Number(pageId) : 0;

  const sharedPageDashboardQuery = useFetchSharedPageDashboard({
    pageId: safePageId,
  });

  //페이지 공개 여부 업데이트
  const updateSharedPageVisibility = useUpdateSharedPageVisibility(safePageId);
  const { data: sharedPageData } = useFetchSharedPage(safePageId);
  const isPublic = sharedPageData.data.pageVisibility;

  const handleUpdateSharedPageVisibility = () => {
    if (isPublic === 'PUBLIC') {
      updateSharedPageVisibility.mutate({
        baseRequest: {
          pageId: safePageId,
          commandType: 'EDIT',
        },
        pageVisibility: 'RESTRICTED',
      });
    } else {
      updateSharedPageVisibility.mutate({
        baseRequest: {
          pageId: safePageId,
          commandType: 'EDIT',
        },
        pageVisibility: 'PUBLIC',
      });
    }
  };

  const publicPathName =
    'http://Linkpoket.com/api/public/pages?pageId=' + safePageId;

  // 링크 복사 함수
  const handleCopyLink = () => {
    if (isPublic === 'PUBLIC') {
      navigator.clipboard.writeText(publicPathName);
    } else {
      navigator.clipboard.writeText(pathname);
    }
  };

  const MEMBERS: {
    memberId: string;
    nickName: string;
    email: string;
    colorCode: string;
    isWaiting: boolean;
    role: string;
  }[] = sharedPageDashboardQuery.data?.data.pageMembers || [];

  const filteredMembers = (
    search.trim()
      ? MEMBERS.filter(
          (m) => m.nickName.includes(search) || m.email.includes(search)
        )
      : MEMBERS
  )
    .slice()
    .sort((a, b) => {
      if (a.isWaiting === b.isWaiting) return 0;
      return a.isWaiting ? 1 : -1;
    });

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className="w-[calc(100vw-32px)] max-w-[562px] p-4 md:w-auto md:p-6"
    >
      <Modal.Header
        showCloseButton
        className="mb-4 text-[18px] font-bold text-gray-100"
      >
        공유 페이지 관리
      </Modal.Header>

      <div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-gray-90 text-[18px] font-bold">
            페이지 공개
          </span>
          <ToggleButton
            checked={isPublic === 'PUBLIC'}
            onClick={() => {
              handleUpdateSharedPageVisibility();
              // toast.success('링크 복사 주소가 변경되었습니다'); 만약 공개 페이지 수정되면 해당 toast로 변경
              toast.success('공개 페이지를 준비중입니다..');
            }}
          />
        </div>
        <div className="text-gray-70 mt-[7px] mb-4 text-[16px] font-[400]">
          페이지를 공개하면, 링크를 가진 모든 사용자가 볼 수 있습니다.
        </div>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
          <div className="flex w-full flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-4">
            <Input
              containerClassName="flex-1 min-w-0"
              className="w-full"
              // value={isPublic === 'PUBLIC' ? publicPathName : pathname} 만약 공개 페이지 수정되면 해당 value로 변경
              value={isPublic === 'PUBLIC' ? pathname : pathname}
              readOnly
            />
            <Button
              size="lg"
              variant="ghost"
              className="flex w-full gap-2 sm:w-auto"
              onClick={handleCopyLink}
            >
              <SiteIcon />
              링크 복사
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="text-gray-90 mb-2 text-[18px] font-bold">
          공유 페이지 멤버
        </div>
        <div className="mt-[7px] flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-4">
          <Input
            containerClassName="flex-1 min-w-0"
            className="w-full"
            placeholder="멤버 닉네임/이메일로 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            size="lg"
            variant="primary"
            className="w-full sm:w-auto"
            onClick={() => setIsOpenInviteUserModal(true)}
          >
            멤버 초대
          </Button>
          {isOpenInviteUserModal && (
            <InviteUserModal
              isOpen={isOpenInviteUserModal}
              onClose={() => setIsOpenInviteUserModal(false)}
              pageId={safePageId}
            />
          )}
        </div>

        <div className="mt-2 max-h-[220px] overflow-y-auto">
          {filteredMembers.map((m) => (
            <div
              key={m.memberId}
              className="border-gray-10 flex items-center gap-2 border-b py-2 last:border-b-0 sm:gap-3"
            >
              <div
                className="text-primary-0 flex h-[28px] w-[28px] items-center justify-center rounded-full px-[12px] py-[8px] text-[18px] font-[500] sm:h-[32px] sm:w-[32px] sm:px-[16px] sm:py-[10px] sm:text-[22px]"
                style={{ backgroundColor: m.colorCode }}
              >
                {m.nickName[0]}
              </div>
              <div className="flex-1">
                <div className="text-gray-90 text-sm font-bold">
                  {m.nickName}
                </div>
                <div className="text-sm text-gray-50">{m.email}</div>
              </div>
              <div className="relative">
                {m.isWaiting === false ? (
                  <ModalOptions
                    userRole={m.role}
                    pageId={safePageId}
                    email={m.email}
                    memberId={m.memberId}
                  />
                ) : (
                  <Button
                    variant="ghost"
                    className="bg-gray-20 h-[36px] w-[80px] text-[12px] text-gray-50 sm:h-[42px] sm:w-[87px] sm:text-[14px]"
                  >
                    수락 대기
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ManageSharedPageModal;
