import { axiosInstance } from '../axiosInstance';

interface PatchProfileNicknameResponse {
  email: string;
  nickname: string;
}

export const patchProfileNickname = async (
  nickname: string
): Promise<PatchProfileNicknameResponse> => {
  const response = await axiosInstance.patch<{
    status: number;
    message: string;
    data: PatchProfileNicknameResponse;
  }>('/api/member/nickname', {
    nickname,
  });

  if (response.data.status !== 200) throw new Error(response.data.message);

  return response.data.data;
};
