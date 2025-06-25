import { useQuery } from '@tanstack/react-query';
import { fetchPersonalPage } from '@/apis/page-apis/fetchPersonalPage';

export function useFetchPersonalPage() {
  const { data, ...rest } = useQuery({
    queryKey: ['personalPage'],
    queryFn: fetchPersonalPage,
  });

  const member = data?.data?.member;
  const pageDetails = data?.data?.pageDetails;
  const folderDetailResponse = data?.data?.directoryDetailRespons;
  const LinkDetailResponse = data?.data?.pageDetailRespons;

  return {
    member,
    pageDetails,
    folderDetailResponse,
    LinkDetailResponse,
    ...rest,
  };
}
