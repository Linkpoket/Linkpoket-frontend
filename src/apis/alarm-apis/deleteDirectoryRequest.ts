import { axiosInstance } from '../axiosInstance';

export const deleteDirectoryRequest = async (data: { dispatchId: number }) => {
  const response = await axiosInstance.delete(
    '/api/dispatch/directory-transmissions',
    { data }
  );
  return response.data;
};
