import fetchUserInfo from '@/apis/profile-apis/fetchUserInfo';
import { useQuery } from '@tanstack/react-query';

export default function useUserInfo() {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: fetchUserInfo,
    placeholderData: (prev) => prev,
    structuralSharing: true,
  });
}
