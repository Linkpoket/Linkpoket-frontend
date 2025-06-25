import { axiosInstance } from '../axiosInstance';

interface PatchProfileColorResponse {
  email: string;
  colorCode: string;
}

export const patchProfileColor = async (
  colorCode: string
): Promise<PatchProfileColorResponse> => {
  const { data } = await axiosInstance.patch('/api/member/color-code', {
    colorCode,
  });
  return data.data;
};
