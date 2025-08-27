import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '@/assets/widget-ui-assets/Logo.svg?react';
import { HamburgerButton } from './HamburgerButton';
import { UserActions } from './UserActions';
import { AuthButtons } from './AuthButtons';
import { useMobile } from '@/hooks/useMobile';
import { Search } from '../common-ui/Search';
import { useSearchStore } from '@/stores/searchStore';
import { usePageStore } from '@/stores/pageStore';
import { useSearchPageItems } from '@/hooks/queries/useSearchPageItems';
import { useDebounceValue } from '@/hooks/useDebounceValue';

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

  const { pageId } = usePageStore();
  const {
    searchKeyword,
    setSearchKeyword,
    setSearchResult,
    setIsSearching,
    clearSearch,
  } = useSearchStore();

  const debouncedKeyword = useDebounceValue(searchKeyword, 300);

  // API 호출
  const { pageItems: searchResult, isLoading } = useSearchPageItems({
    pageId: pageId ?? '',
    keyword: debouncedKeyword,
    searchType: 'TITLE',
  });

  // 검색 결과 상태 업데이트
  useEffect(() => {
    setIsSearching(isLoading);
    if (searchResult) {
      console.log('Header: 검색 결과를 스토어에 저장', searchResult);
      setSearchResult(searchResult);
    }
  }, [searchResult, isLoading, setSearchResult, setIsSearching]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleClear = () => {
    clearSearch();
  };

  useEffect(() => {
    clearSearch();
  }, [pathName, clearSearch]);

  const showSearch = pathName !== '/signup' && pathName !== '/login';

  return !isMobile ? (
    <header className="border-b-gray-10 flex h-[62px] justify-between border-b px-[24px] py-[12px]">
      <div className="flex items-center gap-[24px]">
        <Link to="/">
          <Logo className="h-[24px]" />
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
    <header className="flex h-[112px] flex-col gap-2 px-2 py-3">
      <div className="border-b-gray-10 flex w-full flex-1 justify-between border-b">
        <div className="flex items-center gap-[16px]">
          <HamburgerButton onClick={() => setShowSidebar?.(true)} />
          <Link to="/">
            <Logo className="h-[24px]" />
          </Link>
        </div>
        <div className="flex items-center gap-[24px]">
          {showHeaderButton && (isLoggedIn ? <UserActions /> : <AuthButtons />)}
        </div>
      </div>
      {showSearch && (
        <Search
          placeholder="폴더 또는 링크 검색"
          value={searchKeyword}
          onChange={handleSearchChange}
          onClear={handleClear}
        />
      )}
    </header>
  );
}
