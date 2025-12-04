import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchFavorite } from '@/apis/favorite-apis/fetchFavorite';

export default function useFetchFavorite() {
  return useSuspenseQuery({
    queryKey: ['favorite'],
    queryFn: fetchFavorite,
    select: (response) => response.data,
  });
}
