import { axiosInstance } from '../axiosInstance';

interface PatchProfileNicknameResponse {
  email: string;
  nickname: string;
}

export const patchProfileNickname = async (
  nickname: string
): Promise<PatchProfileNicknameResponse> => {
  const { data } = await axiosInstance.patch('/api/member/nickname', {
    nickname,
  });
  return data.data;
};
