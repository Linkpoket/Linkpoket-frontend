import { useRef, useState } from 'react';
import Transfer from '@/assets/common-ui-assets/Transfer.svg?react';
import Copy from '@/assets/common-ui-assets/Copy.svg?react';
import Delete from '@/assets/common-ui-assets/Delete.svg?react';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useLinkActionStore } from '@/stores/linkActionStore';
import { useUpdateLink } from '@/hooks/mutations/useUpdateLink';
import { usePageStore } from '@/stores/pageStore';

type DropDownInlineProps = {
  id: string;
  type: 'directory' | 'site';
  initialTitle: string;
  initialLink: string;

  onDelete?: (id: string) => void;
  onShare?: (id: string) => void;
  onCopy?: (title: string) => void;
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
  onDelete,
  onShare,
  onCopy,
  onTitleChange,
  onLinkChange,
  setIsDropDownInline,
  className,
}: DropDownInlineProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [link, setLink] = useState(initialLink);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const deleteLink = useLinkActionStore((state) => state.deleteLink);
  const isModified = title !== initialTitle || link !== initialLink;
  const { mutate } = useUpdateLink();

  const pageId = usePageStore((state) => state.pageId);

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

  useClickOutside(dropdownRef, setIsDropDownInline);

  // TODO : 삭제하기 disabled의 경우, auth가 추가되면 분기처리예정
  return (
    <div
      ref={dropdownRef}
      className={`border-gray-30 focus:bg-gray-30 focus:border-gray-30 bg-gray-0 inline-flex w-[214px] flex-col rounded-[10px] border p-[8px] text-[14px] font-[600] shadow ${className}`}
    >
      {type === 'directory' && (
        <div className="flex flex-col">
          <input
            value={title}
            onChange={handleTitleChange}
            placeholder="디렉토리명 입력"
            className="border-gray-30 rounded-lg border p-[8px] outline-none"
          />
          <button
            onClick={() => onShare?.(id)}
            className="flex cursor-pointer items-center gap-[10px] px-[8px] py-[11px]"
          >
            <Transfer width={18} height={18} /> 전송하기
          </button>
          <button
            onClick={() => onCopy?.(title)}
            className="flex cursor-pointer items-center gap-[10px] px-[8px] py-[11px]"
          >
            <Copy width={18} height={18} /> 복사하기
          </button>
          <button
            onClick={() => onDelete?.(id)}
            className="text-status-danger flex cursor-pointer items-center gap-[10px] px-[8px] py-[11px]"
          >
            <Delete width={18} height={18} /> 삭제하기
          </button>
        </div>
      )}

      {type === 'site' && (
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
              className="text-gray-60 cursor-pointer resize-none p-[12px] text-[13px] font-[400] outline-none"
            />
          </div>
          {isModified && (
            <button
              onClick={() => {
                mutate({
                  baseRequest: {
                    pageId,
                    commandType: 'EDIT',
                  },
                  linkId: Number(id),
                  linkName: title,
                  linkUrl: link,
                });
                setIsDropDownInline(false);
              }}
              className="text-primary-60 flex cursor-pointer gap-[10px] p-[12px]"
            >
              수정 완료
            </button>
          )}
          <button
            onClick={() => onShare?.(id)}
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
