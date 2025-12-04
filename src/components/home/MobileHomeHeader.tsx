import { UserActions } from '@/components/header/UserActions';
import { AuthButtons } from '@/components/header/AuthButtons';

interface MobileHomeHeaderProps {
  nickname?: string;
  isLoggedIn: boolean;
}

export const MobileHomeHeader = ({
  nickname,
  isLoggedIn,
}: MobileHomeHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-6 pt-12">
      <div>
        <p className="text-sm text-gray-500">Hi {nickname || 'User'}</p>
        <h1 className="text-3xl font-black text-black">LINKREW</h1>
      </div>
      <div className="flex items-center gap-[24px]">
        {isLoggedIn ? <UserActions /> : <AuthButtons />}
      </div>
    </div>
  );
};
