import axios from 'axios';
import { useEffect } from 'react';
import { Spinner } from '@/components/common-ui/Spinner';

export default function ReissuePage() {
  useEffect(() => {
    const handleRedirection = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/jwt/access-token`,
          {
            withCredentials: true,
          }
        );

        const redirectUrl = response?.headers['redirect-url'];
        const accessToken = response.headers['authorization']?.replace(
          'Bearer ',
          ''
        );
        const sseToken = response.data?.data?.value;

        const isNewUser = new URL(redirectUrl).pathname === '/signup';

        if (isNewUser) {
          // 신규 회원: 임시 토큰으로 저장 (useAuth가 인식 안 함)
          if (accessToken) {
            localStorage.setItem('temp_access_token', accessToken);
          }
          if (sseToken) {
            localStorage.setItem('temp_sse_token', sseToken);
          }
          window.location.href = '/signup';
        } else {
          // 기존 회원: 정상 토큰으로 저장 (useAuth가 인식함)
          if (accessToken) {
            localStorage.setItem('access_token', accessToken);
          }
          if (sseToken) {
            localStorage.setItem('sse_token', sseToken);
          }
          window.location.href = '/home';
        }
      } catch (error) {
        console.error(error);
        window.location.href = '/login';
      }
    };

    handleRedirection();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner display={true} position="center" />
    </div>
  );
}
