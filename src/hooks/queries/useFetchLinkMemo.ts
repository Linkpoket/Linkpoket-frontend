import { useQuery } from '@tanstack/react-query';
import {
  fetchLinkMemo,
  LinkMemoViewParams,
} from '@/apis/linkMemo-apis/fetchLinkMemo';

export function useFetchLinkMemo(params: LinkMemoViewParams | null) {
  return useQuery({
    queryKey: ['linkMemo', params?.linkId, params?.pageId],
    queryFn: async () => {
      try {
        const result = await fetchLinkMemo(params!);
        return result?.data || null; // LinkMemoResponse | null 반환
      } catch (error: any) {
        // 404 에러나 API가 없는 경우 null 반환 (메모가 없는 것으로 처리)
        if (error?.response?.status === 404) {
          return null;
        }
        // 다른 에러는 재throw
        throw error;
      }
    },
    enabled: !!params && !!params.linkId && !!params.pageId,
    retry: false, // 메모 조회는 실패해도 재시도하지 않음
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
  });
}
