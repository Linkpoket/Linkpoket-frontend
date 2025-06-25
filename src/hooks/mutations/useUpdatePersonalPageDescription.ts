import { useMutation, useQueryClient } from '@tanstack/react-query';
import updatePersonalPageDescription from '@/apis/page-apis/updataPersonalPageDescription';

export default function useUpdatePersonalPageDescription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePersonalPageDescription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['personalPage'] });
    },
  });
}
