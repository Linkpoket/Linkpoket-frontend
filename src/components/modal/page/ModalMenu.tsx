import Consult from '@/assets/common-ui-assets/Consult.svg?react';
import Withdraw from '@/assets/common-ui-assets/Withdraw.svg?react';
import Deleted from '@/assets/common-ui-assets/Deleted.svg?react';
import { useEffect, useRef } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDeleteSharedPage } from '@/hooks/mutations/useDeleteSharedPage';
import { usePageStore } from '@/stores/pageStore';
// import DarkMode from '@/assets/common-ui-assets/DarkMode.svg?react';
// import ToggleButton from './ToggleButton';

interface ModalMenuProps {
  isHost: boolean;
  // isDarkMode?: boolean;
  // onToggleDarkMode?: () => void;
  onWithDrawPage: () => void;
  onContact: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalMenu({
  // isDarkMode = false,
  // onToggleDarkMode,
  isHost,
  onWithDrawPage,
  onContact,
  setIsOpen,
}: ModalMenuProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  useClickOutside(modalRef, setIsOpen);

  const location = useLocation();
  const isShared = location.pathname.includes('shared');

  const { pageId: id, commandType: type } = usePageStore();

  useEffect(() => {
    console.log(id, type);
  }, [id, type]);

  const deleteSharedPageMutation = useDeleteSharedPage({
    onSuccess: () => {
      console.log('공유 페이지 삭제 성공');
      setIsOpen(false);
    },
    onError: () => {
      console.log('공유 페이지 삭제 실패');
    },
  });

  const handleDeleteSharedPage = () => {
    deleteSharedPageMutation.mutate({
      baseRequest: {
        pageId: id,
        commandType: type,
      },
    });
    navigate('/');
    console.log('페이지 번호:', id, '삭제 완료');
  };

  return (
    <div
      className="border-gray-30 bg-gray-0 absolute top-14 right-6 z-1 inline-flex w-[198px] flex-col justify-center rounded-[10px] border p-[8px] font-[600] shadow-lg"
      ref={modalRef}
    >
      <div className="flex flex-col">
        <button
          onClick={onContact}
          className="text-gray-90 active:bg-gray-10 hover:bg-gray-10 flex cursor-pointer items-center gap-[10px] rounded-lg px-2 py-[11px] text-[14px] font-[600]"
        >
          <Consult /> <span className="text-[14px]">문의하기</span>
        </button>
        {/* <div className="hover:bg-gray-5 active:bg-gray-5 flex items-center justify-between gap-[20px] hover:rounded-[8px]">
          <button className="flex items-center gap-[10px] p-[12px]">
            <DarkMode /> <span className="text-[19px]">다크 모드 전환</span>
          </button>
          <ToggleButton
            checked={isDarkMode}
            onClick={onToggleDarkMode}
            className="mr-[10px]"
          />
        </div> */}
        <div className="flex"></div>
      </div>
      {isShared && (
        <>
          <div className="border-gray-40 m-[8px] w-[166px] border" />
          <div className="flex flex-col">
            <button
              onClick={onWithDrawPage}
              className="text-status-danger hover:bg-gray-10 active:bg-gray-5 flex cursor-pointer items-center gap-[10px] rounded-lg px-2 py-[11px] text-[14px] font-[600]"
            >
              <Withdraw /> <span className="text-[14px]">공유 페이지 탈퇴</span>
            </button>
            {isHost && (
              <button
                onClick={handleDeleteSharedPage}
                className="text-status-danger hover:bg-gray-10 active:bg-gray-5 flex cursor-pointer items-center gap-[10px] rounded-lg px-2 py-[11px] text-[14px] font-[600]"
              >
                <Deleted /> <span className="text-[14px]">페이지 삭제하기</span>
              </button>
            )}
          </div>
        </>
      )}
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
