import { fetchSharedPage } from '@/apis/page-apis/fetchSharedPage';
import { useSuspenseQuery } from '@tanstack/react-query';

export function useFetchSharedPage(pageId: string) {
  const { data } = useSuspenseQuery({
    queryKey: ['sharedPage', pageId],
    queryFn: () => fetchSharedPage({ pageId }),
    select: (response) => response.data,
  });

  return {
    data,
  };
}
