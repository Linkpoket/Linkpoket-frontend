import { axiosInstance } from '../axiosInstance';

export const deleteDirectoryRequest = async (data: { dispatchId: string }) => {
  const response = await axiosInstance.delete(
    '/api/folder/directory-transmissions',
    { data }
  );
  return response.data;
};
