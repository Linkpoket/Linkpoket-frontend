import { useQuery } from '@tanstack/react-query';
import { fetchJoinedPage } from '@/apis/page-apis/fetchJoinedPage';
import { useUserStore } from '@/stores/userStore';

/**
 * 모든 페이지 + 폴더 정보를 한번에 가져오는 훅
 * /api/personal-pages/overview API를 사용
 */
export default function useFetchPagesOverview() {
  const { isLoggedIn } = useUserStore();

  return useQuery({
    queryKey: ['pagesOverview'],
    queryFn: fetchJoinedPage,
    enabled: isLoggedIn,
    staleTime: 0,
    gcTime: 1000 * 60,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
}
