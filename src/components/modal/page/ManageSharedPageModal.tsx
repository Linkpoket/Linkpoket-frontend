import { useState, useEffect } from 'react';
import Modal from '@/components/common-ui/Modal';
import { Button } from '@/components/common-ui/button';
import ToggleButton from '@/components/common-ui/ToggleButton';
import { Input } from '@/components/common-ui/Input';
import { useLocation, useParams } from 'react-router-dom';
import useFetchSharedPageDashboard from '@/hooks/queries/useFetchSharedPageDashboard';
import InviteUserModal from './InviteUserModal';
import ModalOptions from '@/components/common-ui/ModalOptions';
import SiteIcon from '@/assets/common-ui-assets/SiteIcon.svg?react';

interface ManageSharedPageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ManageSharedPageModal = ({
  isOpen,
  onClose,
}: ManageSharedPageModalProps) => {
  const [isPublic, setIsPublic] = useState<'RESTRICTED' | 'PUBLIC'>(
    'RESTRICTED'
  );
  const [search, setSearch] = useState('');
  const [isOpenInviteUserModal, setIsOpenInviteUserModal] = useState(false);

  const handleClose = () => {
    if (!isOpenInviteUserModal) {
      onClose();
    }
  };

  const path = useLocation().pathname;
  const pathname = 'http://linkrew.com' + path;
  const { pageId } = useParams();
  const safePageId = pageId ?? '';

  const sharedPageDashboardQuery = useFetchSharedPageDashboard({
    pageId: safePageId,
  });

  // API 데이터가 로드된 후 state 업데이트
  useEffect(() => {
    if (sharedPageDashboardQuery.data?.data.pageType) {
      // pageType에 따라 isPublic 설정
      setIsPublic(
        sharedPageDashboardQuery.data.data.pageType === 'PUBLIC'
          ? 'PUBLIC'
          : 'RESTRICTED'
      );
    }
  }, [sharedPageDashboardQuery.data]);

  // 링크 복사 함수
  const handleCopyLink = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(`${currentUrl}`);
    } catch (error) {
      console.error('링크 복사 실패:', error);
    }
  };

  console.log('페이지 대쉬보드 정보', sharedPageDashboardQuery.data);
  console.log(
    '페이지 대쉬보드 정보',
    sharedPageDashboardQuery.data?.data.pageType
  );

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
      className="p-[16px] md:max-w-[562px]"
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
            onClick={() =>
              setIsPublic((v) => (v === 'PUBLIC' ? 'RESTRICTED' : 'PUBLIC'))
            }
          />
        </div>
        <div className="text-gray-70 mt-[7px] mb-4 text-[16px] font-[400]">
          페이지를 공개하면, 링크를 가진 모든 사용자가 볼 수 있습니다.
        </div>

        <div className="mt-4 flex gap-4">
          <div className="flex w-full items-center gap-4">
            <Input
              containerClassName="flex-1 min-w-0"
              className="w-full"
              value={pathname}
              readOnly
            />
            <Button
              size="lg"
              variant="ghost"
              className="flex gap-2"
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
        <div className="mt-[7px] flex items-center gap-4">
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

        <div className="max-h-[220px] overflow-y-auto">
          {filteredMembers.map((m) => (
            <div
              key={m.memberId}
              className="border-gray-10 flex items-center gap-3 border-b py-2 last:border-b-0"
            >
              <div
                className="text-primary-0 flex h-[32px] w-[32px] items-center justify-center rounded-full px-[16px] py-[10px] text-[22px] font-[500]"
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
                    className="bg-gray-20 h-[42px] w-[87px] text-[14px] text-gray-50"
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
