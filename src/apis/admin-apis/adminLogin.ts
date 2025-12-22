import { axiosInstance } from '../axiosInstance';

export interface AdminLoginRequest {
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  accessToken: string;
  refreshToken: string;
}

export async function adminLogin(
  request: AdminLoginRequest
): Promise<AdminLoginResponse> {
  const response = await axiosInstance.post<{
    data: AdminLoginResponse;
  }>('/api/admin/auth/login', request);

  // Header에서 accessToken 추출
  const accessToken =
    response.headers['authorization']?.replace('Bearer ', '') ||
    response.headers['Authorization']?.replace('Bearer ', '');

  if (accessToken) {
    localStorage.setItem('admin_access_token', accessToken);
    axiosInstance.defaults.headers.common['Authorization'] =
      `Bearer ${accessToken}`;
  }

  return response.data.data;
}
