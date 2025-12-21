import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

/* request 전에 accessToken을 헤더에 자동으로 추가 */
export const setupRequestInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      // 일반 API 호출 시 access_token 사용
      let accessToken = localStorage.getItem('access_token');

      // access_token이 없으면 refresh_token(쿠키)으로 재갱신 시도
      if (!accessToken) {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/jwt/access-token`,
            {
              withCredentials: true,
            }
          );

          const newAccessToken = res.headers['authorization']?.replace(
            'Bearer ',
            ''
          );

          if (newAccessToken) {
            localStorage.setItem('access_token', newAccessToken);
            accessToken = newAccessToken;
          }
        } catch (error) {
          // 재갱신 실패 시 요청은 그대로 진행 (서버에서 처리)
          console.error('토큰 재갱신 실패:', error);
        }
      }

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    }
  );
};
