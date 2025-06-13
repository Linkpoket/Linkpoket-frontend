import { useMutation } from '@tanstack/react-query';
import { patchShareInvitationStatus } from '@/apis/alarm-apis/patchShareInvitationStatus';

export function usePatchShareInvitationStatus() {
  return useMutation({
    mutationFn: patchShareInvitationStatus,
  });
}
