import { useQuery } from '@tanstack/react-query';
import { fetchMemo, MemoViewParams } from '@/apis/memo-apis/fetchMemo';

export function useFetchMemo(params: MemoViewParams | null) {
  return useQuery({
    queryKey: ['memo', params?.itemType, params?.itemId, params?.pageId],
    queryFn: async () => {
      try {
        const result = await fetchMemo(params!);
        return result?.data || null; // MemoResponse | null 반환
      } catch (error: any) {
        // 404 에러나 API가 없는 경우 null 반환 (메모가 없는 것으로 처리)
        if (error?.response?.status === 404) {
          return null;
        }
        // 다른 에러는 재throw
        throw error;
      }
    },
    enabled:
      !!params && !!params.itemId && !!params.pageId && !!params.itemType,
    retry: (failureCount, error: any) => {
      // 404 에러는 재시도하지 않음 (메모가 없는 경우)
      if (error?.response?.status === 404) {
        return false;
      }
      // 다른 에러는 기본 재시도 로직 따름
      return failureCount < 3;
    },
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
  });
}
