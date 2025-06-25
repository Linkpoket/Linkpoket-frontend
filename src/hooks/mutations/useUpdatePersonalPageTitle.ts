import { useMutation, useQueryClient } from '@tanstack/react-query';
import updatePersonalPageTitle from '@/apis/page-apis/updatePersonalPageTitle';

export default function useUpdatePersonalPageTitle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePersonalPageTitle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['personalPage'] });
    },
  });
}
