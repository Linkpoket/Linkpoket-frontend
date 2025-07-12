import { fetchJoinedPage } from '@/apis/page-apis/fetchJoinedPage';
import { useQuery } from '@tanstack/react-query';

export default function useFetchJoinedPage() {
  const { data, ...rest } = useQuery({
    queryKey: ['joinedPage'],
    queryFn: fetchJoinedPage,
    select: (response) => response.data.slice(1),
    staleTime: 1000 * 60,
    placeholderData: (prev) => prev,
    structuralSharing: true,
  });

  return { joinedPage: data, ...rest };
}
