import HelpIcon from '@/assets/common-ui-assets/HelpIcon.svg?react';
import Withdraw from '@/assets/common-ui-assets/Withdraw.svg?react';
import Deleted from '@/assets/common-ui-assets/Deleted.svg?react';
import { useRef, useState } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useLocation } from 'react-router-dom';
import { usePageStore } from '@/stores/pageStore';
import DeleteSharedPageModal from './DeleteSharedPageModal';
import WithdrawSharedPageModal from './WithdrawlSharedPageModal';
import ManageSharedPageModal from './ManageSharedPageModal';
import SharedPage from '@/assets/widget-ui-assets/SharedPage.svg?react';
import SiteIcon from '@/assets/common-ui-assets/SiteIcon.svg?react';

interface HeaderMenuProps {
  isHost: boolean;
  onWithDrawPage: () => void;
  onContact: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HeaderMenu({
  isHost,
  onContact,
  setIsOpen,
}: HeaderMenuProps) {
  const [isDeleteSharedPageModalOpen, setIsDeleteSharedPageModalOpen] =
    useState(false);
  const [isWithdrawSharedPageModalOpen, setisWithdrawSharedPageModalOpen] =
    useState(false);
  const [isManageSharedPageModalOpen, setIsManageSharedPageModalOpen] =
    useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(modalRef, () => {
    // 모달이 열려있지 않을 때만 메뉴 닫기
    if (
      !isWithdrawSharedPageModalOpen &&
      !isDeleteSharedPageModalOpen &&
      !isManageSharedPageModalOpen
    ) {
      setIsOpen(false);
    }
  });

  const location = useLocation();
  const isShared = location.pathname.includes('shared');
  const isFolder = location.pathname.includes('folder');

  const { pageId: id } = usePageStore();

  return (
    <div
      className="border-gray-30 bg-gray-0 absolute top-14 right-6 z-1 inline-flex w-[198px] flex-col justify-center rounded-[10px] border p-2 font-[500] shadow-lg"
      ref={modalRef}
    >
      {isShared && (
        <>
          <div className="flex flex-col">
            <>
              <button
                onClick={() => setIsManageSharedPageModalOpen(true)}
                className="hover:bg-gray-10 active:bg-gray-5 text-gray-90 flex cursor-pointer items-center gap-[10px] rounded-lg px-2 py-[11px] text-[14px] font-[500]"
              >
                <SiteIcon />
                <span className="text-[14px]">링크 복사</span>
              </button>
              {isHost && (
                <button
                  onClick={() => setIsManageSharedPageModalOpen(true)}
                  className="hover:bg-gray-10 active:bg-gray-5 text-gray-90 flex cursor-pointer items-center gap-[10px] rounded-lg px-2 py-[11px] text-[14px] font-[500]"
                >
                  <SharedPage width={20} height={21} />
                  <span className="text-[14px]">공유 페이지 관리</span>
                </button>
              )}

              {/* 탈퇴 버튼 */}
              <button
                onClick={() => setisWithdrawSharedPageModalOpen(true)}
                className="text-status-danger hover:bg-gray-10 active:bg-gray-5 flex cursor-pointer items-center gap-[10px] rounded-lg px-2 py-[11px] text-[14px] font-[500]"
              >
                <Withdraw />{' '}
                <span className="text-[14px]">공유 페이지 탈퇴</span>
              </button>

              {isWithdrawSharedPageModalOpen && (
                <WithdrawSharedPageModal
                  isOpen={isWithdrawSharedPageModalOpen}
                  onClose={() => setisWithdrawSharedPageModalOpen(false)}
                  pageId={id}
                />
              )}
            </>
            {isShared && isHost && (
              <button
                onClick={() => setIsDeleteSharedPageModalOpen(true)}
                className="text-status-danger hover:bg-gray-10 active:bg-gray-5 flex cursor-pointer items-center gap-[10px] rounded-lg px-2 py-[11px] text-[14px] font-[500]"
              >
                <Deleted />
                <span className="text-[14px]">공유 페이지 삭제</span>
              </button>
            )}
            {isFolder && isHost && (
              <button
                onClick={() => setIsDeleteSharedPageModalOpen(true)}
                className="text-status-danger hover:bg-gray-10 active:bg-gray-5 flex cursor-pointer items-center gap-[10px] rounded-lg px-2 py-[11px] text-[14px] font-[500]"
              >
                <Deleted />
                <span className="text-[14px]">폴더 삭제</span>
              </button>
            )}

            {/*TODO: 이후 삭제 예정 조건*/}

            {isManageSharedPageModalOpen && (
              <ManageSharedPageModal
                isOpen={isManageSharedPageModalOpen}
                onClose={() => setIsManageSharedPageModalOpen(false)}
              />
            )}

            {isDeleteSharedPageModalOpen && (
              <DeleteSharedPageModal
                isOpen={isDeleteSharedPageModalOpen}
                onClose={() => setIsDeleteSharedPageModalOpen(false)}
                pageId={id}
              />
            )}
          </div>
        </>
      )}

      <div className="border-gray-20 my-[4px] w-[166px] border" />

      <div className="flex flex-col">
        <button
          onClick={onContact}
          className="text-gray-90 active:bg-gray-10 hover:bg-gray-10 flex cursor-pointer items-center gap-[10px] rounded-lg px-2 py-[11px] text-[14px] font-[500]"
        >
          <HelpIcon /> <span className="text-[14px]">도움말</span>
        </button>

        <div className="flex"></div>
      </div>
    </div>
  );
}

/* 
api를 어떻게 받냐에 따라 수정 가능성이 있음 : user.role === 'host';
다음과 같이 쓰길 기대함.
export default function TEST() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <div>
      <DropDown
isHost={true}
isDarkMode={isDarkMode}
onToggleDarkMode={handleToggleDarkMode}
onWithDrawPage={() => console.log('탈퇴')}
onDeletePage={() => console.log('삭제')}
onContact={() => console.log('문의')}
      />
    </div>
  );
} 

4.29 : 다크모드는 후순위 작업으로서 일단 주석처리함
*/
