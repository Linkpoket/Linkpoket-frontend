import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { usePageStore } from '@/stores/pageStore';
import { useSearchStore } from '@/stores/searchStore';
import { useSearchPageItems } from '@/hooks/queries/useSearchPageItems';
import { useDebounce } from '@/hooks/useDebounce';

export function usePageSearch() {
  const { pageId } = usePageStore();
  const pathName = useLocation().pathname;

  const {
    searchKeyword,
    setSearchKeyword,
    setSearchResult,
    setIsSearching,
    clearSearch,
  } = useSearchStore();

  const [debouncedKeyword, setDebouncedKeyword] = useState(searchKeyword);

  const debouncedSetKeyword = useDebounce((value: string) => {
    setDebouncedKeyword(value);
  }, 300);

  useEffect(() => {
    debouncedSetKeyword(searchKeyword);
  }, [searchKeyword, debouncedSetKeyword]);

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

  return {
    searchKeyword,
    handleSearchChange,
    handleClear,
    showSearch,
  };
}
