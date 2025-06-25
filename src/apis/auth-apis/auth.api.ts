import { axiosInstance } from '../axiosInstance';

export const logout = async () => {
  const response = await axiosInstance.post('/api/member/log-out');
  return response.data;
};

export const deleteAccount = async () => {
  const response = await axiosInstance.delete('/api/member/deletion');
  return response.data;
};
