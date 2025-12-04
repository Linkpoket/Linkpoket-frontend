import { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

/* request 전에 accessToken을 헤더에 자동으로 추가 */
export const setupRequestInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    // Admin API 호출 시 admin_access_token 사용
    if (config.url?.includes('/api/admin/')) {
      const adminAccessToken = localStorage.getItem('admin_access_token');
      if (adminAccessToken) {
        config.headers.Authorization = `Bearer ${adminAccessToken}`;
      }
    } else {
      // 일반 API 호출 시 access_token 사용
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  });
};
