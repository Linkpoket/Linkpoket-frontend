import { fetchJoinedPage } from '@/apis/page-apis/fetchJoinedPage';
import { useQuery } from '@tanstack/react-query';

export default function useFetchJoinedPage() {
  const { data, ...rest } = useQuery({
    queryKey: ['joinedPage'],
    queryFn: fetchJoinedPage,
    select: (response) => response.data,
    staleTime: 1000 * 60,
  });

  return { joinedPage: data, ...rest };
}
