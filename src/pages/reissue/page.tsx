import { useEffect } from 'react';
import { axiosInstance } from '@/apis/axiosInstance';

export default function ReissuePage() {
  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await axiosInstance.get('/api/jwt/access-token');

        // 1. 일반 인증용 access token은 헤더에서 꺼냄
        const authAccessToken = response.headers['authorization']?.replace(
          'Bearer ',
          ''
        );
        if (authAccessToken) {
          localStorage.setItem('access_token', authAccessToken);
        } else {
          window.location.href = '/login';
          return;
        }

        // 2. SSE 전용 토큰은 응답 바디에서 꺼냄
        const sseToken = response.data.data?.value;
        if (sseToken) {
          localStorage.setItem('sse_token', sseToken);
        }

        if (response?.headers['redirect-url']) {
          window.location.href = response.headers['redirect-url'];
        }
      } catch (error) {
        window.location.href = '/login';
      }
    };

    fetchAccessToken();
  }, []);

  // TODO: 로딩스피너 넣는게 좋을듯
  return <p>Reissuing access token... Please wait.</p>;
}
