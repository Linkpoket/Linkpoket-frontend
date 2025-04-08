import { useState } from 'react';
import Transfer from '@/shared/assets/Transfer.svg?react';
import Copy from '@/shared/assets/Copy.svg?react';
import Delete from '@/shared/assets/Delete.svg?react';

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
}: DropDownInlineProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [link, setLink] = useState(initialLink);

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

  // TODO : 삭제하기 disabled의 경우, auth가 추가되면 분기처리예정
  return (
    <div className="inline-flex flex-col text-[19px] font-[600] p-[8px] border border-gray-30 rounded-[10px] bg-white shadow">
      {type === 'directory' && (
        <>
          <input
            value={title}
            onChange={handleTitleChange}
            placeholder="디렉토리명 입력"
            className="p-[12px] rounded-lg border border-gray-30 outline-none"
          />
          <button
            onClick={() => onShare?.(id)}
            className="flex items-center gap-[10px] p-[12px] "
          >
            <Transfer /> 전송하기
          </button>
          <button
            onClick={() => onCopy?.(title)}
            className="flex items-center gap-[10px] p-[12px] "
          >
            <Copy /> 복사하기
          </button>
          <button
            onClick={() => onDelete?.(id)}
            className="flex items-center gap-[10px] p-[12px] text-status-danger"
          >
            <Delete /> 삭제하기
          </button>
        </>
      )}

      {type === 'site' && (
        <>
          <div className="flex flex-col border border-gray-30 rounded-lg overflow-hidden">
            <input
              value={title}
              onChange={handleTitleChange}
              placeholder="사이트명 입력"
              className="p-[12px] border-b border-gray-30 outline-none"
            />
            <textarea
              value={link}
              onChange={handleLinkChange}
              placeholder="링크를 입력하세요"
              rows={2}
              className="p-[12px] text-gray-60 font-[400] resize-none outline-none"
            />
          </div>
          <button
            onClick={() => onShare?.(id)}
            className="flex items-center gap-[10px] p-[12px] "
          >
            <Transfer /> 전송하기
          </button>
          <button
            onClick={() => onDelete?.(id)}
            className="flex items-center gap-[10px] p-[12px] text-status-danger"
          >
            <Delete /> 삭제하기
          </button>
        </>
      )}
    </div>
  );
};

export default DropDownInline;

// // 추후 api 전달에따라 내부로직 변경 가능
// onShare,onCopy,onDelete,onTitleChange의 경우 부모 컴포넌트에서 useMutation 처리하도록 설계
