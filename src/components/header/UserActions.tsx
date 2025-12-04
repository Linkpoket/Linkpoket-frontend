import { NotificationButton } from './NotificationButton';
import { ProfileButton } from './ProfileButton';
import { MenuButton } from './MenuButton';
import { useUserInfoSync } from '@/hooks/useUserInfoSync';

// 로그인 한 유저의 액션 버튼들을 조합하여 표시하는 컴포넌트

export function UserActions() {
  //유저상태 관리 훅
  useUserInfoSync();

  return (
    <div className="flex items-center gap-[8px]">
      {/* 알림버튼 */}
      <NotificationButton />
      {/* 프로필버튼 */}
      <ProfileButton />
      {/* 메뉴버튼 */}
      <MenuButton />
    </div>
  );
}
