import { searchPageItems } from '@/apis/search-apis/searchPageItems';
import { PageItemSearchRequest } from '@/types/search';
import { useQuery } from '@tanstack/react-query';

export function useSearchPageItems(params: PageItemSearchRequest) {
  const { data, ...rest } = useQuery({
    queryKey: ['searchPageItems', params],
    queryFn: () => searchPageItems(params),
    select: (response) => response,
    enabled: !!params.pageId && !!params.keyword,
    structuralSharing: true,
  });

  return { pageItems: data, ...rest };
}
