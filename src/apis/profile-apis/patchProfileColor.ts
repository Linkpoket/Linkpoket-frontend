import { axiosInstance } from '../axiosInstance';

interface PatchProfileColorResponse {
  success: boolean;
  colorCode: string;
  message?: string;
}

export const patchProfileColor = async (
  colorCode: string
): Promise<PatchProfileColorResponse> => {
  try {
    const response = await axiosInstance.patch('/api/member/color-code', {
      colorCode,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
