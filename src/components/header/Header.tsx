import { Link, useLocation } from 'react-router-dom';
import Logo from '@/assets/widget-ui-assets/Logo.svg?react';
import { HamburgerButton } from './HamburgerButton';
import { UserActions } from './UserActions';
import { AuthButtons } from './AuthButtons';
import { useMobile } from '@/hooks/useMobile';
import { Search } from '../common-ui/Search';
import { usePageSearch } from '@/hooks/usePageSearch';

interface Props {
  isLoggedIn: boolean;
  showDepth: boolean;
  showSidebar?: boolean;
  setShowSidebar?: React.Dispatch<React.SetStateAction<boolean>>;
  showHeaderButton: boolean;
}

export function Header({
  isLoggedIn = true,
  setShowSidebar,
  showHeaderButton,
}: Props) {
  const isMobile = useMobile();
  const pathName = useLocation().pathname;

  const { searchKeyword, handleSearchChange, handleClear } = usePageSearch();

  const showSearch = pathName !== '/signup' && pathName !== '/login';

  return !isMobile ? (
    <header className="border-b-gray-10 flex h-[62px] justify-between border-b px-[24px] py-[12px]">
      <div className="flex items-center gap-[24px]">
        <Link to="/" className="flex items-center">
          <Logo className="h-[36px]" />
          <span className="text-[24px] font-[800]">LINKPOKET</span>
        </Link>
      </div>
      <div className="flex items-center gap-[24px]">
        {showSearch && (
          <Search
            placeholder="폴더 또는 링크 검색"
            value={searchKeyword}
            onChange={handleSearchChange}
            onClear={handleClear}
          />
        )}
        {showHeaderButton && (isLoggedIn ? <UserActions /> : <AuthButtons />)}
      </div>
    </header>
  ) : (
    <header className="flex h-[56px] flex-col gap-2 px-2">
      <div className="border-b-gray-10 flex w-full flex-1 justify-between border-b">
        <div className="flex items-center gap-[16px]">
          <HamburgerButton onClick={() => setShowSidebar?.(true)} />
          <Link to="/" className="flex items-center">
            <Logo className="h-[36px]" />
            <span className="text-[24px] font-[800]">LINKPOKET</span>
          </Link>
        </div>
        <div className="flex items-center gap-[24px]">
          {showHeaderButton && (isLoggedIn ? <UserActions /> : <AuthButtons />)}
        </div>
      </div>
    </header>
  );
}
