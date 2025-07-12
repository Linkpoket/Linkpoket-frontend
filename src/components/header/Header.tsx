import Logo from '@/assets/widget-ui-assets/Logo.svg?react';
import { HamburgerButton } from './HamburgerButton';
import { UserActions } from './UserActions';
import { AuthButtons } from './AuthButtons';
import { useMobile } from '@/hooks/useMobile';
import { Link } from 'react-router-dom';
import { Search } from '../common-ui/Search';

interface Props {
  isLoggedIn: boolean;
  showDepth: boolean;
  showSidebar?: boolean;
  setShowSidebar?: React.Dispatch<React.SetStateAction<boolean>>;
  showHeaderButton: boolean;
}

//Todo: 해당 데이터는 useQuery 활용하여 대체.

export function Header({
  isLoggedIn = true,
  setShowSidebar,
  showHeaderButton,
}: Props) {
  const isMobile = useMobile();

  return (
    // Header 1920기준 w값 1600고정 - 반응형 고려시 해당부분 수정
    !isMobile ? (
      <header className="border-b-gray-10 flex h-[62px] justify-between border-b px-[24px] py-[12px]">
        <div className="flex items-center gap-[24px]">
          <Link to="/">
            <Logo className="h-[24px]" />
          </Link>
        </div>
        <div className="flex items-center gap-[24px]">
          <Search placeholder="폴더 또는 링크 검색" />
          {showHeaderButton && (isLoggedIn ? <UserActions /> : <AuthButtons />)}
        </div>
      </header>
    ) : (
      <header className="flex h-[112px] flex-col gap-2 px-2 py-3">
        <div className="border-b-gray-10 flex w-full flex-1 justify-between border-b">
          <div className="flex items-center gap-[16px]">
            <HamburgerButton onClick={() => setShowSidebar?.(true)} />
            <Link to="/">
              <Logo className="h-[24px]" />
            </Link>
          </div>
          <div className="flex items-center gap-[24px]">
            {showHeaderButton &&
              (isLoggedIn ? <UserActions /> : <AuthButtons />)}
          </div>
        </div>
        <Search placeholder="폴더 또는 링크 검색" />
      </header>
    )
  );
}
