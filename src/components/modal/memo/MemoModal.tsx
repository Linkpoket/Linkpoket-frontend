import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Textarea } from '@/components/common-ui/Textarea';
import ModalClose from '@assets/common-ui-assets/ModalClose.svg?react';
import { MemoResponse } from '@/types/memos';

interface MemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMemo: string;
  onSave: (memo: string) => void;
  title: string;
  memoData?: MemoResponse | null;
}

export default function MemoModal({
  isOpen,
  onClose,
  initialMemo,
  onSave,
  title,
  memoData,
}: MemoModalProps) {
  const [memo, setMemo] = useState(initialMemo);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMemo(initialMemo);
  }, [initialMemo, isOpen]);

  // 날짜 포맷팅 함수 (백엔드 형식: "yyyy-MM-dd HH:mm")
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      // "yyyy-MM-dd HH:mm" 형식을 파싱 (예: "2024-01-15 14:30")
      const dateMatch = dateString.match(
        /^(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2})/
      );
      if (!dateMatch) {
        // 다른 형식이면 그대로 반환
        return dateString;
      }

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

      // 7일 이상이면 날짜 표시 (yyyy-MM-dd 형식)
      return `${year}-${month}-${day}`;
    } catch (error) {
      return dateString;
    }
  };

  const handleSave = () => {
    onSave(memo);
    onClose();
  };

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (modalRef.current && !modalRef.current.contains(target)) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, handleClickOutside, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/20">
      <div
        ref={modalRef}
        className="relative w-full max-w-[400px] rounded-xl bg-white p-4 shadow-lg"
        data-ignore-outside-click
      >
        {/* 헤더 */}
        <div className="mb-3 flex items-center justify-between">
          <span className="text-gray-90 text-sm font-medium">{title}</span>
          <button
            onClick={onClose}
            className="text-gray-60 hover:text-gray-90 cursor-pointer transition-colors"
            aria-label="닫기"
          >
            <ModalClose />
          </button>
        </div>

        {/* 본문 */}
        <div className="mb-4">
          <Textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="메모를 입력하세요..."
            className="min-h-[100px] w-full resize-none text-sm"
            autoFocus
          />
        </div>

        {/* 푸터 */}
        <div className="space-y-3">
          {/* 마지막 수정 정보 */}
          {memoData && (
            <div className="text-[11px] text-gray-50">
              마지막 수정 : {memoData.memberNickname} ·{' '}
              {formatDate(memoData.createdDate)}
            </div>
          )}
          {/* 버튼 */}
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="text-gray-60 hover:text-gray-90 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            >
              취소
            </button>
            <button
              onClick={handleSave}
              className="bg-gray-90 hover:bg-gray-70 text-gray-0 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
