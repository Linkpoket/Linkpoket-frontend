import { axiosInstance } from '../axiosInstance';

export const patchDirectoryTransmissionStatus = async (data: {
  requestId: number;
  requestStatus: 'ACCEPTED' | 'REJECTED';
  notificationType: 'TRANSMIT_DIRECTORY';
}) => {
  const response = await axiosInstance.patch(
    '/api/dispatch/directory-transmissions/status',
    data
  );
  console.log('폴더전송 수락/거절 결과', response);
  return response.data;
};
