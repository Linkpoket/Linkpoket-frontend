import { useState } from 'react';
import { useSearchPageItems } from './queries/useSearchPageItems';
import { useDebounceValue } from './useDebounceValue';

export function usePageSearch(
  pageId: string | undefined,
  searchType: 'TITLE' | 'CONTENT' = 'TITLE'
) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const debouncedKeyword = useDebounceValue(searchKeyword, 300);

  const { pageItems, isSuccess, isLoading, error } = useSearchPageItems({
    pageId: pageId ?? '', // pageId 없을 때 기본값 (서버 요청 안 나가도록 enabled 처리됨)
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
