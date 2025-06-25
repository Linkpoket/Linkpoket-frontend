import { fetchSharedPage } from '@/apis/page-apis/fetchSharedPage';
import { useQuery } from '@tanstack/react-query';
import { PageParamsData } from '@/types/pages';

type UseFetchSharedPageProps = PageParamsData & { enabled?: boolean };

export function useFetchSelectedPage({
  pageId,
  enabled = true,
}: UseFetchSharedPageProps) {
  const { data, ...rest } = useQuery({
    queryKey: ['sharedPage', pageId],
    queryFn: () => fetchSharedPage({ pageId }),
    enabled,
  });

  return {
    data,
    ...rest,
  };
}
