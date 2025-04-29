import { NotificationModalProps } from '@/types/modalAlaram';
import { useState } from 'react';
import profile from '@/assets/common-ui-assets/Profile.webp';

export default function NotificationModal({
  isOpen,
  notifications,
  onAccept,
  onReject,
}: NotificationModalProps) {
  const [selectedTab, setSelectedTab] = useState<'time' | 'type'>('time');

  if (!isOpen) return null;

  return (
    <div className="absolute top-12 right-17 z-1">
      <div
        className="border-gray-30 bg-gray-0 max-h-[590px] w-[434px] rounded-2xl border p-[24px] pt-[8px]"
        style={{ boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.08)' }}
      >
        {/* 탭 */}
        <div className="border-gray-30 flex border-b">
          <button
            className={`cursor-pointer px-4 py-[14px] text-[13px] font-semibold ${
              selectedTab === 'time'
                ? 'border-primary-50 text-primary-60 border-b-2'
                : 'text-gray-90 border-b-2 border-transparent'
            }`}
            onClick={() => setSelectedTab('time')}
          >
            시간순
          </button>
          <button
            className={`cursor-pointer px-4 py-[14px] text-[13px] font-semibold ${
              selectedTab === 'type'
                ? 'border-primary-50 text-primary-60 border-b-2'
                : 'text-gray-90 border-b-2 border-transparent'
            }`}
            onClick={() => setSelectedTab('type')}
          >
            종류순
          </button>
        </div>

        {/* 알림 리스트 */}
        <ul>
          {notifications.map((item, idx) => (
            <li
              key={item.id}
              className={`py-4 ${notifications.length - 1 === idx ? '' : 'border-b-gray-30 border-b'}`}
            >
              <div className="flex items-start gap-[10px]">
                {/* 프로필 추후 item.iconUrl로 변경경*/}
                <img
                  src={profile}
                  alt="프로필 이미지"
                  className="h-[34px] w-[34px] rounded-full object-cover"
                />

                {/* 텍스트 + 버튼 */}
                <div className="text-gray-90 flex-1 text-sm font-[400]">
                  {item.type === 'link' ? (
                    <>
                      <span>{item.senderEmail}</span>
                      님이 회원님에게
                      <span>{item.directoryName}</span>
                      페이지에 초대했습니다.
                    </>
                  ) : (
                    <div>
                      <span className="font-semibold">
                        {item.directoryName}
                      </span>
                      페이지에 대한 권한이 에디터로 변경되었습니다.
                    </div>
                  )}
                  <div
                    className={`text-gray-60 text-xs ${item.type === 'link' ? '' : 'pb-[33px]'}`}
                  >
                    {item.dateTime}
                  </div>
                </div>
              </div>

              {/* 수락/거절 버튼 (link일 경우만) */}
              {item.type === 'link' && (
                <div className="mt-2 flex justify-end gap-2">
                  <button
                    onClick={() => onReject?.(item.id)}
                    className="border-gray-30 text-gray-90 cursor-pointer rounded-[6px] border px-[10px] py-[6px] text-[15px]"
                  >
                    거절
                  </button>
                  <button
                    onClick={() => onAccept?.(item.id)}
                    className="bg-primary-50 text-primary-0 cursor-pointer rounded-[6px] px-[10px] py-[6px] text-[15px]"
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
