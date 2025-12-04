import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchPersonalPage } from '@/apis/page-apis/fetchPersonalPage';

export function useFetchPersonalPage() {
  return useSuspenseQuery({
    queryKey: ['personalPage'],
    queryFn: () => fetchPersonalPage(),
    select: (response) => response.data,
  });
}
