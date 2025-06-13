import { NotificationModalProps } from '@/types/modalAlarm';
import { useMemo, useRef, useState } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';
import profile from '@/assets/common-ui-assets/Profile.webp';
import Close from '@/assets/common-ui-assets/AlarmModalClose.svg?react';

export default function NotificationModal({
  setIsOpen,
  notifications,
  isProcessing,
  onAccept,
  onReject,
  onDelete,
}: NotificationModalProps) {
  const [selectedTab, setSelectedTab] = useState<'time' | 'type'>('time');
  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(modalRef, setIsOpen);

  const sortedNotifications = useMemo(() => {
    if (!notifications.length) return [];

    if (selectedTab === 'time') {
      return [...notifications].sort(
        (a, b) =>
          new Date(b.senderInfo.sentAt).getTime() -
          new Date(a.senderInfo.sentAt).getTime()
      );
    }

    if (selectedTab === 'type') {
      return [...notifications].sort((a, b) =>
        a.notificationType.localeCompare(b.notificationType)
      );
    }

    return notifications;
  }, [selectedTab, notifications]);

  return (
    <div className="absolute top-14 right-16 z-1" ref={modalRef}>
      <div
        className="border-gray-30 bg-gray-0 max-h-[590px] w-[434px] rounded-2xl border p-[24px] pt-[8px]"
        style={{ boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.08)' }}
      >
        {/* 탭 */}
        <div className="border-gray-30 flex border-b">
          <button
            className={`cursor-pointer px-4 py-[14px] text-[13px] leading-[18px] font-semibold ${
              selectedTab === 'time'
                ? 'border-primary-50 text-primary-60 border-b-2'
                : 'text-gray-70 border-b-2 border-transparent'
            }`}
            onClick={() => setSelectedTab('time')}
          >
            시간순
          </button>
          <button
            className={`cursor-pointer px-4 py-[14px] text-[13px] leading-[18px] font-semibold ${
              selectedTab === 'type'
                ? 'border-primary-50 text-primary-60 border-b-2'
                : 'text-gray-70 border-b-2 border-transparent'
            }`}
            onClick={() => setSelectedTab('type')}
          >
            종류순
          </button>
        </div>

        {/* 알림 리스트 */}
        <ul>
          {sortedNotifications.map((item, idx) => (
            <li
              key={`${item.notificationType}-${item.id}`}
              className={`py-4 ${notifications.length - 1 === idx ? '' : 'border-b-gray-30 border-b'}`}
            >
              <div className="flex items-start gap-[10px]">
                {/* 프로필 */}
                <img
                  src={profile}
                  alt="프로필 이미지"
                  className="h-[34px] w-[34px] rounded-full object-cover"
                />

                {/* 텍스트 + 버튼 */}
                <div className="text-gray-90 flex-1 text-sm font-[400]">
                  <div>{item.message}</div>
                  <div className="text-gray-60 text-xs">
                    {new Date(item.senderInfo.sentAt).toLocaleString('ko-KR')}
                  </div>
                </div>

                <button
                  onClick={() => onDelete?.(item.id)}
                  className="cursor-pointer"
                >
                  <Close className="text-gray-40" width={14} height={14} />
                </button>
              </div>

              {/* 수락/거절 버튼 (초대일 경우만) */}
              {item.requestStatus === 'WAITING' && (
                <div className="mt-2 flex justify-end gap-2">
                  <button
                    disabled={isProcessing}
                    onClick={() =>
                      onReject?.({ id: item.id, type: item.notificationType })
                    }
                    className="border-gray-30 text-gray-90 cursor-pointer rounded-[6px] border px-[10px] py-[6px] text-[15px] font-semibold"
                  >
                    거절
                  </button>
                  <button
                    disabled={isProcessing}
                    onClick={() =>
                      onAccept?.({ id: item.id, type: item.notificationType })
                    }
                    className="bg-primary-50 text-primary-0 cursor-pointer rounded-[6px] px-[10px] py-[6px] text-[15px] font-semibold"
                  >
                    수락
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
