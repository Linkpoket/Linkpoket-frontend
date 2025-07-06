import { useState, useEffect } from 'react';
import Modal from '@/components/common-ui/Modal';
import { Button } from '@/components/common-ui/button';
import ToggleButton from '@/components/common-ui/ToggleButton';
import { Input } from '@/components/common-ui/Input';
import { Radio } from '@/components/common-ui/Radio';
import { useLocation, useParams } from 'react-router-dom';
import useFetchSharedPageDashboard from '@/hooks/queries/useFetchSharedPageDashboard';
import InviteUserModal from './InviteUserModal';
import ModalOptions from '@/components/common-ui/ModalOptions';

const TIERS = [
  { label: '베이직(5명)', value: 'BASIC' },
  { label: '스탠다드(10명)', value: 'STANDARD' },
  { label: '프리미엄(20명)', value: 'PREMIUM' },
];

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

  const pathname = useLocation().pathname;
  const { pageId } = useParams();
  const numericId = Number.parseInt(pageId ?? '', 10);
  const resolvedPageId = Number.isFinite(numericId) ? numericId : null;

  const sharedPageDashboardQuery = useFetchSharedPageDashboard({
    pageId: resolvedPageId ?? -1,
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
      await navigator.clipboard.writeText(currentUrl);
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
    memberId: number;
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
      className="p-[24px] md:max-w-[562px]"
    >
      <Modal.Header className="border-gray-40 mb-[16px] border-b-[1px] pb-[24px] text-[22px] font-bold">
        공유 페이지 관리
      </Modal.Header>

      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[16px] font-semibold">페이지 공개</span>
          <ToggleButton
            checked={isPublic === 'PUBLIC'}
            onClick={() =>
              setIsPublic((v) => (v === 'PUBLIC' ? 'RESTRICTED' : 'PUBLIC'))
            }
          />
        </div>
        <div className="text-gray-70 mb-4 text-[16px]">
          페이지를 공개하면, 링크를 가진 모든 사용자가 볼 수 있습니다.
        </div>

        <div className="mb-2 flex gap-4">
          <div className="flex w-full gap-2">
            <Input
              containerClassName="flex-1 min-w-0"
              className="!w-auto"
              value={pathname}
              readOnly
            />
            <Button size="sm" variant="secondary" onClick={handleCopyLink}>
              링크 복사
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="mb-2 text-[16px] font-bold">
          공유 페이지 등급(멤버 초대 가능 수)
        </div>
        <div className="flex gap-4">
          {TIERS.map((t) => (
            <Radio
              key={t.value}
              name="tier"
              value={t.value}
              checked={sharedPageDashboardQuery.data?.data.pageType === t.value}
              onChange={() => {}}
              label={t.label}
              isModal
            />
          ))}
        </div>
      </div>

      <div className="mb-2">
        <div className="mb-2 text-[16px] font-bold">공유 페이지 멤버</div>
        <div className="mb-2 flex gap-2">
          <Input
            containerClassName="flex-1 min-w-0"
            className="!w-auto"
            placeholder="멤버 닉네임/이메일로 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            size="sm"
            variant="primary"
            onClick={() => setIsOpenInviteUserModal(true)}
          >
            멤버 초대
          </Button>
          {isOpenInviteUserModal && (
            <InviteUserModal
              isOpen={isOpenInviteUserModal}
              onClose={() => setIsOpenInviteUserModal(false)}
              pageId={resolvedPageId ?? -1}
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
                className="text-primary-0 flex h-[40px] w-[40px] items-center justify-center rounded-full px-[16px] py-[10px] text-[22px] font-[500]"
                style={{ backgroundColor: m.colorCode }}
              >
                {m.nickName[0]}
              </div>
              <div className="flex-1">
                <div className="text-gray-90 text-[18px] font-bold">
                  {m.nickName}
                </div>
                <div className="text-[16px] text-gray-50">{m.email}</div>
              </div>
              <div className="relative">
                {m.isWaiting === false ? (
                  <ModalOptions
                    userRole={m.role}
                    pageId={resolvedPageId ?? -1}
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
      <Modal.Footer className="pt-4">
        <Button variant="ghost" onClick={handleClose}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ManageSharedPageModal;
