import { axiosInstance } from '../axiosInstance';

interface PatchProfileColorResponse {
  email: string;
  colorCode: string;
}

export const patchProfileColor = async (
  colorCode: string
): Promise<PatchProfileColorResponse> => {
  const response = await axiosInstance.patch<{
    status: number;
    message: string;
    data: PatchProfileColorResponse;
  }>('/api/member/color-code', {
    colorCode,
  });

  if (response.data.status !== 200)
    throw new Error(response.data.message ?? '프로필 색상 변경 실패');

  return response.data.data;
};
