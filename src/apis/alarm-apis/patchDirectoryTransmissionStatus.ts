import { axiosInstance } from '../axiosInstance';

export const patchDirectoryTransmissionStatus = async (data: {
  requestId: string;
  requestStatus: 'ACCEPTED' | 'REJECTED';
  notificationType: 'TRANSMIT_DIRECTORY';
}) => {
  const response = await axiosInstance.patch(
    '/api/folder/directory-transmissions/status',
    data
  );
  return response.data;
};
