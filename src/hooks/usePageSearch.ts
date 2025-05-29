import { useState } from 'react';
import { useDebounce } from './useDebounce';
import { useSearchPageItems } from './queries/useSearchPageItems';

export function usePageSearch(
  pageId: number | undefined,
  searchType: 'TITLE' | 'CONTENT' = 'TITLE'
) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const debouncedKeyword = useDebounce(searchKeyword, 300);

  const { pageItems, isSuccess, isLoading, error } = useSearchPageItems({
    pageId: pageId ?? 0, // pageId 없을 때 기본값 (서버 요청 안 나가도록 enabled 처리됨)
    keyword: debouncedKeyword,
    searchType,
  });

  const searchResult = isSuccess ? pageItems : undefined;

  return {
    searchKeyword,
    setSearchKeyword,
    searchResult,
    isLoading,
    error,
  };
}
