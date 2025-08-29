import { NotificationModalProps } from '@/types/modalAlarm';
import { useMemo, useRef, useState } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';
import profile from '@/assets/common-ui-assets/Profile.webp';
import Close from '@/assets/common-ui-assets/AlarmModalClose.svg?react';

type Tab = 'all' | 'invite' | 'directory';

export default function NotificationModal({
  setIsOpen,
  notifications,
  isProcessing,
  isShareProcessing,
  onAccept,
  onReject,
  onDelete,
}: NotificationModalProps) {
  const [selectedTab, setSelectedTab] = useState<Tab>('all');
  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(modalRef, setIsOpen);

  // 탭별 카운트 (뱃지용)
  const inviteCount = useMemo(
    () =>
      notifications.filter((n) => n.notificationType === 'INVITE_PAGE').length,
    [notifications]
  );
  const directoryCount = useMemo(
    () =>
      notifications.filter((n) => n.notificationType === 'TRANSMIT_DIRECTORY')
        .length,
    [notifications]
  );

  // 탭 필터 → 시간 내림차순 정렬
  const shown = useMemo(() => {
    const filtered =
      selectedTab === 'all'
        ? notifications
        : selectedTab === 'invite'
          ? notifications.filter((n) => n.notificationType === 'INVITE_PAGE')
          : notifications.filter(
              (n) => n.notificationType === 'TRANSMIT_DIRECTORY'
            );

    return [...filtered].sort(
      (a, b) =>
        new Date(b.senderInfo.sentAt).getTime() -
        new Date(a.senderInfo.sentAt).getTime()
    );
  }, [selectedTab, notifications]);

  return (
    <div className="absolute top-14 right-16 z-20" ref={modalRef}>
      <div
        className="border-gray-30 bg-gray-0 max-h-[590px] w-[434px] rounded-2xl border p-[24px] pt-[8px]"
        style={{ boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.08)' }}
      >
        {/* 탭: 전체 / 페이지 초대 / 받은 폴더 */}
        <div className="border-gray-30 mb-1 flex gap-1 border-b">
          <button
            className={`relative cursor-pointer px-4 py-[14px] text-[13px] leading-[18px] font-semibold ${selectedTab === 'all' ? 'border-primary-50 text-primary-60 border-b-2' : 'text-gray-70 border-b-2 border-transparent'}`}
            onClick={() => setSelectedTab('all')}
          >
            전체
            <span className="text-gray-60 ml-1 text-xs">
              ({notifications.length})
            </span>
          </button>

          <button
            className={`relative cursor-pointer px-4 py-[14px] text-[13px] leading-[18px] font-semibold ${selectedTab === 'invite' ? 'border-primary-50 text-primary-60 border-b-2' : 'text-gray-70 border-b-2 border-transparent'}`}
            onClick={() => setSelectedTab('invite')}
          >
            페이지 초대
            <span className="text-gray-60 ml-1 text-xs">({inviteCount})</span>
          </button>

          <button
            className={`relative cursor-pointer px-4 py-[14px] text-[13px] leading-[18px] font-semibold ${selectedTab === 'directory' ? 'border-primary-50 text-primary-60 border-b-2' : 'text-gray-70 border-b-2 border-transparent'}`}
            onClick={() => setSelectedTab('directory')}
          >
            받은 폴더
            <span className="text-gray-60 ml-1 text-xs">
              ({directoryCount})
            </span>
          </button>
        </div>

        {/* 알림 리스트 */}
        <ul>
          {shown.length !== 0 ? (
            shown.map((item, idx) => (
              <li
                key={`${item.notificationType}-${item.id}`}
                className={`py-4 ${shown.length - 1 === idx ? '' : 'border-b-gray-30 border-b'}`}
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
                    onClick={() => onDelete?.(item.id, item.notificationType)}
                    className="cursor-pointer"
                  >
                    <Close className="text-gray-40" width={14} height={14} />
                  </button>
                </div>

                {/* 수락/거절 버튼 (대기 상태만) */}
                {item.requestStatus === 'WAITING' && (
                  <div className="mt-2 flex justify-end gap-2">
                    <button
                      disabled={isProcessing || isShareProcessing}
                      onClick={() =>
                        onReject?.({ id: item.id, type: item.notificationType })
                      }
                      className="border-gray-30 text-gray-90 cursor-pointer rounded-[6px] border px-[10px] py-[6px] text-[15px] font-semibold"
                    >
                      거절
                    </button>
                    <button
                      disabled={isProcessing || isShareProcessing}
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
            ))
          ) : (
            <div className="text-gray-70 mt-4 flex justify-center text-[13px] leading-[18px] font-semibold">
              {selectedTab === 'all'
                ? '도착한 알람이 없습니다.'
                : selectedTab === 'invite'
                  ? '페이지 초대 알람이 없습니다.'
                  : '받은 폴더 알람이 없습니다.'}
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}
