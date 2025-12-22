import { Link, useLocation } from 'react-router-dom';
import { lazy, Suspense, useState } from 'react';
import Logo from '@/assets/widget-ui-assets/Logo.svg?react';
import { HamburgerButton } from './HamburgerButton';
import { UserActions } from './UserActions';
import { AuthButtons } from './AuthButtons';
import { useMobile } from '@/hooks/useMobile';
import { Search } from '../common-ui/Search';
import { usePageSearch } from '@/hooks/usePageSearch';
import { useFolderColorStore } from '@/stores/folderColorStore';
import { ManageSharedPageModalSkeleton } from '../skeleton/ManageSharedPageModalSkeleton';

const ManageSharedPageModal = lazy(
  () => import('../modal/page/ManageSharedPageModal')
);

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
  const [isManageSharedPageModalOpen, setIsManageSharedPageModalOpen] =
    useState(false);

  const { searchKeyword, handleSearchChange, handleClear } = usePageSearch();
  const { getCurrentColor } = useFolderColorStore();
  const currentFolderColor = getCurrentColor();

  const isSharedPage = pathName.includes('/shared');
  const showSearch =
    pathName !== '/signup' && pathName !== '/login' && pathName !== '/home';

  const handleOpenManageModal = () => {
    setIsManageSharedPageModalOpen(true);
  };

  return !isMobile ? (
    <header className="header-desktop border-b-gray-10 flex items-center justify-between border-b">
      <div className="header-desktop__left flex items-center">
        <Link to="/home" className="header-logo flex items-center">
          <Logo className="header-logo__icon" />
          <span className="header-logo__text font-[800]">LINKPOKET</span>
        </Link>
      </div>
      <div className="header-desktop__right flex items-center">
        {showSearch && (
          <Search
            containerClassName="header-search"
            className="header-search__input"
            placeholder="폴더 또는 링크 검색"
            value={searchKeyword}
            onChange={handleSearchChange}
            onClear={handleClear}
            focusColor={currentFolderColor.previewColor}
          />
        )}
        <div className="header-actions flex items-center gap-3">
          {isLoggedIn && isSharedPage && (
            <button
              onClick={handleOpenManageModal}
              className="text-gray-90 hover:text-gray-70 text-[17.5px] font-medium whitespace-nowrap transition-colors"
              style={{ writingMode: 'horizontal-tb' }}
            >
              공유
            </button>
          )}
          {showHeaderButton && (isLoggedIn ? <UserActions /> : <AuthButtons />)}
        </div>
      </div>
      {isManageSharedPageModalOpen && (
        <Suspense fallback={<ManageSharedPageModalSkeleton />}>
          <ManageSharedPageModal
            isOpen={isManageSharedPageModalOpen}
            onClose={() => setIsManageSharedPageModalOpen(false)}
          />
        </Suspense>
      )}
    </header>
  ) : (
    <header className="header-mobile flex flex-col">
      <div className="header-mobile__top border-b-gray-10 flex w-full flex-1 justify-between border-b">
        <div className="header-mobile__left flex items-center">
          <div className="header-mobile__hamburger flex items-center">
            <HamburgerButton onClick={() => setShowSidebar?.(true)} />
          </div>
          <Link to="/home" className="header-logo flex items-center">
            <Logo className="header-logo__icon" />
            <span className="header-logo__text font-[800]">LINKPOKET</span>
          </Link>
        </div>
        <div className="header-mobile__right flex items-center">
          <div className="header-actions flex items-center gap-3">
            {isLoggedIn && isSharedPage && (
              <button
                onClick={handleOpenManageModal}
                className="text-gray-90 hover:text-gray-70 text-[17.5px] font-medium whitespace-nowrap transition-colors"
                style={{ writingMode: 'horizontal-tb' }}
              >
                공유
              </button>
            )}
            {showHeaderButton &&
              (isLoggedIn ? <UserActions /> : <AuthButtons />)}
          </div>
        </div>
      </div>
      {isManageSharedPageModalOpen && (
        <Suspense fallback={<ManageSharedPageModalSkeleton />}>
          <ManageSharedPageModal
            isOpen={isManageSharedPageModalOpen}
            onClose={() => setIsManageSharedPageModalOpen(false)}
          />
        </Suspense>
      )}
    </header>
  );
}
