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

  // Header에서 accessToken 추출 (axios는 헤더를 소문자로 변환)
  const accessToken =
    response.headers['authorization']?.replace('Bearer ', '') ||
    response.headers['Authorization']?.replace('Bearer ', '');

  if (accessToken) {
    localStorage.setItem('admin_access_token', accessToken);
    axiosInstance.defaults.headers.common['Authorization'] =
      `Bearer ${accessToken}`;
  }

  // Cookie는 withCredentials: true로 자동으로 설정됨 (refresh_token)
  // Response body에도 accessToken, refreshToken이 포함되어 있음
  return response.data.data;
}
