import { fetchSharedPage } from '@/apis/page-apis/fetchSharedPage';
import { useQuery } from '@tanstack/react-query';

export function useFetchSharedPage(pageId: string) {
  const { data, ...rest } = useQuery({
    queryKey: ['sharedPage', pageId],
    queryFn: () => fetchSharedPage({ pageId }),
    placeholderData: (prev) => prev,
    structuralSharing: true,
  });

  return {
    data,
    ...rest,
  };
}
