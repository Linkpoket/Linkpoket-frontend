import { useRef, useState } from 'react';
import Transfer from '@/assets/common-ui-assets/Transfer.svg?react';
import Copy from '@/assets/common-ui-assets/Copy.svg?react';
import Delete from '@/assets/common-ui-assets/Delete.svg?react';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useLinkActionStore } from '@/stores/linkActionStore';
import { useUpdateLink } from '@/hooks/mutations/useUpdateLink';
import { usePageStore } from '@/stores/pageStore';
import DeleteFolderModal from '../modal/folder/DeleteFolderModal';
import useUpdateFolder from '@/hooks/mutations/useUpdateFolder';

type DropDownInlineProps = {
  id: number;
  type: string;
  initialTitle: string;
  initialLink?: string;
  onTitleChange?: (id: number, title: string) => void;
  onLinkChange?: (id: number, link: string) => void;
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

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const deleteLink = useLinkActionStore((state) => state.deleteLink);

  const isModifiedLink = title !== initialTitle || link !== initialLink;
  const isModifiedFolder = title !== initialTitle;

  const pageId = usePageStore((state) => state.pageId);

  const { mutate } = useUpdateLink();
  const { mutate: mutateFolder } = useUpdateFolder(pageId);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    onTitleChange?.(id, value);
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setLink(value);
    onLinkChange?.(id, value);
  };

  const handleDeleteOpen = () => {
    setIsDeleteOpen(true);
  };

  useClickOutside(dropdownRef, setIsDropDownInline, !isDeleteOpen);

  return (
    <div
      ref={dropdownRef}
      className={`border-gray-30 focus:bg-gray-30 focus:border-gray-30 bg-gray-0 z-50 inline-flex w-[214px] flex-col rounded-[10px] border p-[8px] text-[14px] font-[600] shadow ${className}`}
    >
      {type === 'folder' && (
        <div className="flex flex-col">
          <input
            value={title}
            onChange={handleTitleChange}
            placeholder="디렉토리명 입력"
            className="border-gray-30 rounded-lg border p-[8px] outline-none"
          />

          {isModifiedFolder && (
            <button
              onClick={() => {
                mutateFolder(
                  {
                    baseRequest: {
                      pageId,
                      commandType: 'EDIT',
                    },
                    folderName: title,
                    folderId: id,
                  },
                  {
                    onSuccess: () => {
                      setIsDropDownInline(false);
                    },
                    onError: (error) => {
                      console.error('링크 수정 실패:', error);
                      //Todo 사용자에게 에러 메시지 표시
                    },
                  }
                );
              }}
              className="text-primary-60 flex cursor-pointer gap-[10px] p-[12px]"
            >
              수정 완료
            </button>
          )}
          <button
            onClick={() => console.log('전송')}
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
            onClick={handleDeleteOpen}
            className="text-status-danger flex cursor-pointer items-center gap-[10px] px-[8px] py-[11px]"
          >
            <Delete width={18} height={18} /> 삭제하기
          </button>

          {isDeleteOpen && (
            <DeleteFolderModal
              isOpen={isDeleteOpen}
              onClose={() => setIsDeleteOpen(false)}
              folderId={id}
              pageId={pageId}
            />
          )}
        </div>
      )}

      {type === 'link' && (
        <div className="flex flex-col">
          <div className="border-gray-30 flex flex-col overflow-hidden rounded-lg border">
            <input
              value={title}
              onChange={handleTitleChange}
              placeholder="사이트명 입력"
              className="border-gray-30 border-b p-[12px] outline-none"
            />
            <textarea
              value={link}
              onChange={handleLinkChange}
              placeholder="링크를 입력하세요"
              className="text-gray-60 resize-none p-[12px] text-[13px] font-[400] outline-none"
            />
          </div>
          {isModifiedLink && (
            <button
              onClick={() => {
                mutate(
                  {
                    baseRequest: {
                      pageId,
                      commandType: 'EDIT',
                    },
                    linkId: Number(id),
                    linkName: title,
                    linkUrl: link,
                  },
                  {
                    onSuccess: () => {
                      setIsDropDownInline(false);
                    },
                    onError: (error) => {
                      console.error('링크 수정 실패:', error);
                      //Todo 사용자에게 에러 메시지 표시
                    },
                  }
                );
              }}
              className="text-primary-60 flex cursor-pointer gap-[10px] p-[12px]"
            >
              수정 완료
            </button>
          )}
          <button
            onClick={() => console.log('전송')}
            className="flex cursor-pointer items-center gap-[10px] p-[12px]"
          >
            <Transfer width={18} height={18} /> 전송하기
          </button>
          <button
            onClick={() => deleteLink(id)}
            className="text-status-danger flex cursor-pointer items-center gap-[10px] p-[12px]"
          >
            <Delete width={18} height={18} /> 삭제하기
          </button>
        </div>
      )}
    </div>
  );
};

export default DropDownInline;

// // 추후 api 전달에따라 내부로직 변경 가능
// onShare,onCopy,onDelete,onTitleChange의 경우 부모 컴포넌트에서 useMutation 처리하도록 설계
