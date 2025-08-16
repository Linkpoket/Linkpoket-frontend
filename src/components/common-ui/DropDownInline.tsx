import { useEffect, useRef, useState } from 'react';
import Transfer from '@/assets/common-ui-assets/Transfer.svg?react';
import Copy from '@/assets/common-ui-assets/Copy.svg?react';
import Delete from '@/assets/common-ui-assets/Delete.svg?react';
import { usePageStore } from '@/stores/pageStore';
import { useModalStore } from '@/stores/modalStore';
import FolderTransferModal from '../modal/folder/FolderTransferModal';
import { useTransferActionStore } from '@/stores/transferActionStore';
import DeleteFolderModal from '../modal/folder/DeleteFolderModal';
import DeleteLinkModal from '../modal/link/DeleteLinkModal';
import { useClickOutsideMultiple } from '@/hooks/useClickOutsideMultiple';
import { ToastCustom } from './ToastCustom';
import { useTransferFolder } from '@/hooks/mutations/useTransferFolder';

type DropDownInlineProps = {
  id: string;
  type: string;
  initialTitle: string;
  initialLink?: string;
  onTitleChange?: (id: string, title: string) => void;
  onLinkChange?: (id: string, link: string) => void;
  className?: string;
  isDropDownInline: boolean;
  setIsDropDownInline: React.Dispatch<React.SetStateAction<boolean>>;
};

const DropDownInline = ({
  id,
  type,
  initialTitle = '',
  initialLink = '',

  onTitleChange,
  onLinkChange,
  setIsDropDownInline,
  className,
}: DropDownInlineProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [link, setLink] = useState(initialLink);

  const { pageId } = usePageStore();

  const [isFolderDeleteOpen, setIsFolderDeleteOpen] = useState(false);
  const [isLinkDeleteOpen, setIsLinkDeleteOpen] = useState(false);

  const { openTransferFolderModal } = useModalStore();

  const { isTransferFolderModalOpen, closeTransferFolderModal } =
    useModalStore();

  const { mutate: transferFolder, isPending: isTransferring } =
    useTransferFolder({
      onSuccess: (data) => {
        console.log('🟢 React Query onSuccess 호출됨:', data);
        ToastCustom.success(
          `${data.data.receiverEmail}에게 전송이 완료되었습니다.`
        );
        closeTransferFolderModal();
        setIsDropDownInline(false);
      },
      onError: (error) => {
        console.log('🔴 React Query onError 호출됨:', error);

        switch (error.errorCode) {
          case 'TRANSMIT_DIRECTORY_REQUEST_ACCEPTED_EXIST':
            ToastCustom.error('이미 해당 디렉토리 전송 요청을 수락하였습니다.');
            break;
          default:
            ToastCustom.error(error.detail || '전송 중 오류가 발생했습니다.');
        }
      },
    });

  // TODO: 타이틀 변경은 공유페이지, 폴더에 있는걸 hook으로 만들어 여기서도 사용하면 좋을 것 같아요. 그래서 일단 버튼 제거했습니다
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    onTitleChange?.(id, value);
  };

  // TODO: 타이틀 변경은 공유페이지, 폴더에 있는걸 hook으로 만들어 여기서도 사용하면 좋을 것 같아요. 그래서 일단 버튼 제거했습니다
  const handleLinkChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setLink(value);
    onLinkChange?.(id, value);
  };

  const handleFolderDeleteOpen = () => {
    setIsFolderDeleteOpen(true);
  };

  const handleLinkDeleteOpen = () => {
    setIsLinkDeleteOpen(true);
  };

  const isAnyModalOpen =
    isFolderDeleteOpen || isLinkDeleteOpen || isTransferFolderModalOpen;

  const dropdownRef = useRef(null);
  const folderModalRef = useRef(null);
  const linkModalRef = useRef(null);
  const transferModalRef = useRef(null);

  useClickOutsideMultiple(
    [dropdownRef, folderModalRef, linkModalRef, transferModalRef],
    setIsDropDownInline,
    !isAnyModalOpen
  );

  return (
    <div
      ref={dropdownRef}
      className={`border-gray-20 focus:bg-gray-30 focus:border-gray-30 bg-gray-0 z-50 inline-flex w-[214px] flex-col rounded-[10px] border p-[4px] text-[14px] font-[500] shadow ${className}`}
    >
      {type === 'folder' && (
        <div className="flex flex-col">
          <input
            value={title}
            onChange={handleTitleChange}
            placeholder="디렉토리명 입력"
            className="border-gray-20 mb-2 rounded-lg border px-[8px] py-[11px] outline-none"
          />

          <button
            onClick={() => {
              openTransferFolderModal();
            }}
            className="flex cursor-pointer items-center gap-[10px] px-[8px] py-[11px]"
          >
            <Transfer width={18} height={18} /> 전송하기
          </button>
          <button
            onClick={() => console.log('복사')}
            className="flex cursor-pointer items-center gap-[10px] px-[8px] py-[11px]"
          >
            <Copy width={18} height={18} /> 복사하기
          </button>
          <button
            onClick={handleFolderDeleteOpen}
            className="text-status-danger flex cursor-pointer items-center gap-[10px] px-[8px] py-[11px]"
          >
            <Delete width={18} height={18} /> 삭제하기
          </button>

          {isFolderDeleteOpen && (
            <DeleteFolderModal
              ref={folderModalRef}
              isOpen={isFolderDeleteOpen}
              onClose={() => setIsFolderDeleteOpen(false)}
              folderId={id}
              pageId={pageId}
            />
          )}
        </div>
      )}

      {type === 'link' && (
        <div className="flex flex-col">
          <div className="border-gray-20 flex flex-col overflow-hidden rounded-lg border">
            <input
              value={title}
              onChange={handleTitleChange}
              placeholder="사이트명 입력"
              className="border-gray-20 border-b p-[12px] outline-none"
            />
            <textarea
              value={link}
              onChange={handleLinkChange}
              placeholder="링크를 입력하세요"
              className="text-gray-60 resize-none p-[12px] text-[13px] font-[400] outline-none"
            />
          </div>

          <button
            onClick={() => {
              navigator.clipboard
                .writeText(link)
                .then(() => {
                  ToastCustom.success('링크가 복사되었습니다.');
                })
                .catch((err) => {
                  console.error('복사 실패:', err);
                });
            }}
            className="flex cursor-pointer items-center gap-[10px] px-[12px] py-[11px]"
          >
            <Copy width={18} height={18} /> 복사하기
          </button>
          <button
            onClick={() => handleLinkDeleteOpen()}
            className="text-status-danger flex cursor-pointer items-center gap-[10px] p-[12px]"
          >
            <Delete width={18} height={18} /> 삭제하기
          </button>
          {isLinkDeleteOpen && (
            <DeleteLinkModal
              ref={linkModalRef}
              isOpen={isLinkDeleteOpen}
              onClose={() => setIsLinkDeleteOpen(false)}
              linkId={id}
              pageId={pageId}
            />
          )}
        </div>
      )}
      <FolderTransferModal
        ref={transferModalRef}
        isOpen={isTransferFolderModalOpen}
        onClose={closeTransferFolderModal}
        directoryId={id}
        folderName={title}
        onSubmit={async (email) => {
          if (!pageId || !id) {
            ToastCustom.error('페이지/폴더 정보가 없습니다.');
            return;
          }
          transferFolder({
            receiverEmail: email,
            directoryId: id,
            baseRequest: {
              pageId,
              commandType: 'DIRECTORY_TRANSMISSION',
            },
          });
        }}
      />
    </div>
  );
};

export default DropDownInline;
