import { useQuery } from '@tanstack/react-query';
import { fetchSharedPageDashboard } from '@/apis/page-apis/fetchSharedPageDashboard';
import { PageParamsData } from '@/types/pages';

export default function useFetchSharedPageDashboard(data: PageParamsData) {
  return useQuery({
    queryKey: ['sharedPageDashboard', data.pageId],
    queryFn: () => fetchSharedPageDashboard(data),
    placeholderData: (prev) => prev,
    structuralSharing: true,
  });
}
