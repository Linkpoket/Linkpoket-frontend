import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import Transfer from '@/assets/common-ui-assets/Transfer.svg?react';
import Copy from '@/assets/common-ui-assets/Copy.svg?react';
import Delete from '@/assets/common-ui-assets/Delete.svg?react';
import { usePageStore } from '@/stores/pageStore';
import { useModalStore } from '@/stores/modalStore';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useTransferFolder } from '@/hooks/mutations/useTransferFolder';
import toast from 'react-hot-toast';
import { DeleteModalSkeleton } from '../skeleton/DeleteModalSkeleton';
import { useUpdateTitle } from '@/hooks/useUpdateTitle';
import { MemoResponse } from '@/types/memos';

const FolderTransferModal = lazy(
  () => import('../modal/folder/FolderTransferModal')
);
const DeleteFolderModal = lazy(
  () => import('../modal/folder/DeleteFolderModal')
);
const DeleteLinkModal = lazy(() => import('../modal/link/DeleteLinkModal'));
const DeleteFileModal = lazy(() => import('../modal/file/DeleteFileModal'));

type DropDownInlineProps = {
  id: string;
  type: 'folder' | 'link' | 'file';
  initialTitle: string;
  initialLink?: string;
  memoData?: MemoResponse | null;
  onMemoClick?: () => void;
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
  memoData,
  onMemoClick,
  onLinkChange,
  setIsDropDownInline,
  className = '',
}: DropDownInlineProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [link, setLink] = useState(initialLink);
  const { debouncedUpdate, handleBlur } = useUpdateTitle(id, title, {
    type,
    link,
  });

  const { pageId } = usePageStore();

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const dateMatch = dateString.match(
        /^(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2})/
      );
      if (!dateMatch) return dateString;

      const [, year, month, day, hour, minute] = dateMatch;
      const date = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        parseInt(hour),
        parseInt(minute)
      );

      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffMins < 1) return '방금 전';
      if (diffMins < 60) return `${diffMins}분 전`;
      if (diffHours < 24) return `${diffHours}시간 전`;
      if (diffDays < 7) return `${diffDays}일 전`;

      return `${year}-${month}-${day}`;
    } catch (error) {
      return dateString;
    }
  };

  const [isFolderDeleteOpen, setIsFolderDeleteOpen] = useState(false);
  const [isLinkDeleteOpen, setIsLinkDeleteOpen] = useState(false);
  const [isFileDeleteOpen, setIsFileDeleteOpen] = useState(false);

  const { openTransferFolderModal } = useModalStore();
  const { isTransferFolderModalOpen, closeTransferFolderModal } =
    useModalStore();

  const { mutate: transferFolder } = useTransferFolder({
    onSuccess: (data) => {
      toast.success(`${data.data.receiverEmail}에게 전송이 완료되었습니다.`);
      closeTransferFolderModal();
      setIsDropDownInline(false);
    },
    onError: (error: any) => {
      if (
        error?.errorData?.errorCode ===
        'TRANSMIT_DIRECTORY_REQUEST_ACCEPTED_EXIST'
      ) {
        toast.error('이미 해당 디렉토리 전송 요청을 수락하였습니다.');
      } else {
        toast.error(
          error instanceof Error
            ? error.message
            : '전송 중 오류가 발생했습니다.'
        );
      }
    },
  });

  const handleLinkChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setLink(value);
    onLinkChange?.(id, value);
  };

  const handleFolderDeleteOpen = () => setIsFolderDeleteOpen(true);
  const handleLinkDeleteOpen = () => setIsLinkDeleteOpen(true);
  const handleFileDeleteOpen = () => setIsFileDeleteOpen(true);

  const handleTransferClick = () => {
    openTransferFolderModal();
  };

  const handleCopyClick = () => {
    if (type === 'folder') {
    } else if (type === 'link') {
      navigator.clipboard
        .writeText(link)
        .then(() => toast.success('링크가 복사되었습니다.'))
        .catch((err) => console.error('복사 실패:', err));
    } else if (type === 'file') {
      navigator.clipboard
        .writeText(link)
        .then(() => toast.success('파일 링크가 복사되었습니다.'))
        .catch((err) => console.error('복사 실패:', err));
    }
  };

  const isAnyModalOpen =
    isFolderDeleteOpen ||
    isLinkDeleteOpen ||
    isFileDeleteOpen ||
    isTransferFolderModalOpen;

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const folderModalRef = useRef<HTMLDivElement | null>(null);
  const linkModalRef = useRef<HTMLDivElement | null>(null);
  const fileModalRef = useRef<HTMLDivElement | null>(null);
  const transferModalRef = useRef<HTMLDivElement | null>(null);

  // 여러 ref를 배열로 전달하여 useClickOutside 적용
  useClickOutside(
    [dropdownRef, folderModalRef, linkModalRef, fileModalRef, transferModalRef],
    setIsDropDownInline,
    !isAnyModalOpen
  );

  // ESC로 닫기(선택)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsDropDownInline(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setIsDropDownInline]);

  return (
    <div
      ref={dropdownRef}
      data-dropdown
      className={`border-gray-20 bg-gray-0 absolute top-[130px] z-[1000] mt-2 inline-flex w-[140px] flex-col rounded-[10px] border p-[4px] text-[14px] font-[500] shadow sm:w-[214px] md:top-[160px] md:right-[-8px] xl:top-[160px] ${className}`}
    >
      {type === 'folder' && (
        <div className="flex flex-col">
          <input
            value={title}
            onChange={(e) => {
              const value = e.target.value;
              setTitle(value);
              debouncedUpdate({ title: value });
            }}
            onBlur={() => {
              handleBlur(title);
            }}
            placeholder="디렉토리명 입력"
            className="border-gray-20 mb-2 rounded-lg border px-[8px] py-[11px] outline-none"
          />

          {/* 메모 미리보기 */}
          {memoData?.content ? (
            <div className="border-gray-20 mb-2 flex flex-col gap-2 rounded-lg border px-[8px] py-[11px]">
              <p className="text-gray-90 text-[13px] font-[400] break-words whitespace-pre-wrap">
                {memoData.content}
              </p>
              <div className="text-[11px] text-gray-50">
                {memoData.memberNickname} · {formatDate(memoData.createdDate)}
              </div>
            </div>
          ) : (
            <div className="border-gray-20 mb-2 rounded-lg border px-[8px] py-[11px]">
              <div className="text-[13px] font-[400] text-gray-50">
                메모가 없습니다
              </div>
            </div>
          )}

          <button
            onClick={handleTransferClick}
            className="flex cursor-pointer items-center gap-[10px] px-[8px] py-[11px]"
          >
            <Transfer width={18} height={18} /> 전송하기
          </button>
          <button
            onClick={handleCopyClick}
            className="flex cursor-pointer items-center gap-[10px] px-[8px] py-[11px]"
          >
            <Copy width={18} height={18} /> 복사하기
          </button>
          {onMemoClick && (
            <button
              onClick={() => {
                onMemoClick();
                setIsDropDownInline(false);
              }}
              className="flex cursor-pointer items-center gap-[10px] px-[8px] py-[11px]"
            >
              <span className="flex h-[18px] w-[18px] items-center justify-center text-[16px] leading-none">
                ✎
              </span>
              메모하기
            </button>
          )}
          <button
            onClick={handleFolderDeleteOpen}
            className="text-status-danger flex cursor-pointer items-center gap-[10px] px-[8px] py-[11px]"
          >
            <Delete width={18} height={18} /> 삭제하기
          </button>

          {isFolderDeleteOpen && (
            <Suspense fallback={<DeleteModalSkeleton />}>
              <DeleteFolderModal
                ref={folderModalRef}
                isOpen={isFolderDeleteOpen}
                onClose={() => setIsFolderDeleteOpen(false)}
                folderId={id}
                pageId={pageId}
              />
            </Suspense>
          )}
        </div>
      )}

      {type === 'link' && (
        <div className="flex flex-col">
          <div className="border-gray-20 flex flex-col overflow-hidden rounded-lg border">
            <input
              value={title}
              onChange={(e) => {
                const value = e.target.value;
                setTitle(value);
                debouncedUpdate({ title: value });
              }}
              placeholder="사이트명 입력"
              className="border-gray-20 border-b p-[12px] outline-none"
            />
            {/* 메모 미리보기 */}
            {memoData?.content ? (
              <div className="flex flex-col gap-2 p-[12px]">
                <p className="text-gray-90 text-[13px] font-[400] break-words whitespace-pre-wrap">
                  {memoData.content}
                </p>
                <div className="text-[11px] text-gray-50">
                  {memoData.memberNickname} · {formatDate(memoData.createdDate)}
                </div>
              </div>
            ) : (
              <div className="p-[12px] text-[13px] font-[400] text-gray-50">
                메모가 없습니다
              </div>
            )}
          </div>

          <button
            onClick={handleCopyClick}
            className="flex cursor-pointer items-center gap-[10px] px-[12px] py-[11px]"
          >
            <Copy width={18} height={18} /> 복사하기
          </button>
          {onMemoClick && (
            <button
              onClick={() => {
                onMemoClick();
                setIsDropDownInline(false);
              }}
              className="flex cursor-pointer items-center gap-[10px] px-[12px] py-[11px]"
            >
              <span className="flex h-[18px] w-[18px] items-center justify-center text-[16px] leading-none">
                ✎
              </span>
              메모하기
            </button>
          )}

          <button
            onClick={handleLinkDeleteOpen}
            className="text-status-danger flex cursor-pointer items-center gap-[10px] p-[12px]"
          >
            <Delete width={18} height={18} /> 삭제하기
          </button>

          {isLinkDeleteOpen && (
            <Suspense fallback={<DeleteModalSkeleton />}>
              <DeleteLinkModal
                ref={linkModalRef}
                isOpen={isLinkDeleteOpen}
                onClose={() => setIsLinkDeleteOpen(false)}
                linkId={id}
                pageId={pageId}
              />
            </Suspense>
          )}
        </div>
      )}

      {type === 'file' && (
        <div className="flex flex-col">
          <div className="border-gray-20 flex flex-col overflow-hidden rounded-lg border">
            <div className="border-gray-20 border-b p-[12px]">
              <p className="text-gray-90 text-[14px] font-[600]">{title}</p>
            </div>
            <div className="text-gray-60 p-[12px] text-[13px] font-[400] break-all">
              {link}
            </div>
          </div>

          <button
            onClick={handleCopyClick}
            className="flex cursor-pointer items-center gap-[10px] px-[12px] py-[11px]"
          >
            <Copy width={18} height={18} /> 복사하기
          </button>

          <button
            onClick={handleFileDeleteOpen}
            className="text-status-danger flex cursor-pointer items-center gap-[10px] p-[12px]"
          >
            <Delete width={18} height={18} /> 삭제하기
          </button>

          {isFileDeleteOpen && (
            <Suspense fallback={<DeleteModalSkeleton />}>
              <DeleteFileModal
                ref={fileModalRef}
                isOpen={isFileDeleteOpen}
                onClose={() => setIsFileDeleteOpen(false)}
                fileId={id}
                pageId={pageId}
              />
            </Suspense>
          )}
        </div>
      )}

      <FolderTransferModal
        ref={transferModalRef}
        isOpen={isTransferFolderModalOpen}
        onClose={closeTransferFolderModal}
        directoryId={id}
        folderName={title}
        onSubmit={async (email, directoryId) => {
          if (!pageId || !directoryId) {
            toast.error('페이지/폴더 정보가 없습니다.');
            return;
          }
          transferFolder({
            receiverEmail: email,
            folderId: directoryId,
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
