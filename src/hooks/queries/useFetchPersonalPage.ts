import { useQuery } from '@tanstack/react-query';
import { fetchPersonalPage } from '@/apis/page-apis/fetchPersonalPage';

export function useFetchPersonalPage() {
  return useQuery({
    queryKey: ['personalPage'],
    queryFn: fetchPersonalPage,
  });
}
