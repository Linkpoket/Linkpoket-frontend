import { useQuery } from '@tanstack/react-query';
import { fetchJoinedPage } from '@/apis/page-apis/fetchJoinedPage';
import { useUserStore } from '@/stores/userStore';

/**
 * 모든 페이지 + 폴더 정보를 한번에 가져오는 훅
 * /api/personal-pages/overview API를 사용
 * select 옵션으로 personalPage와 sharedPages를 자동 추출
 */
export default function useFetchPagesOverview() {
  const { isLoggedIn } = useUserStore();

  return useQuery({
    queryKey: ['pagesOverview'],
    queryFn: fetchJoinedPage,
    enabled: isLoggedIn,
    select: (response) => {
      // response가 없거나 data가 없으면 undefined 반환 (로딩 상태 유지)
      if (!response?.data) {
        return undefined;
      }

      const pagesLocal = response.data || [];
      const personalPage = pagesLocal.find(
        (p: any) => p.pageType === 'PERSONAL'
      );
      const sharedPages = pagesLocal.filter(
        (p: any) => p.pageType === 'SHARED'
      );

      return {
        personalPage,
        sharedPages,
        rawData: pagesLocal, // 원본 데이터도 필요할 수 있으므로 포함
      };
    },
    staleTime: 0,
    gcTime: 1000 * 60,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
}
