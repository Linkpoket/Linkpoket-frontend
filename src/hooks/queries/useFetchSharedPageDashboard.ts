import { useQuery } from '@tanstack/react-query';
import { fetchSharedPageDashboard } from '@/apis/page-apis/fetchSharedPageDashboard';
import { SelectedPageData } from '@/types/pages';

export default function useFetchSharedPageDashboard(
  data: SelectedPageData & { enabled?: boolean }
) {
  return useQuery({
    queryKey: ['sharedPageDashboard', data],
    queryFn: () => fetchSharedPageDashboard(data),
    enabled: !!data.pageId && !!data.commandType,
  });
}
