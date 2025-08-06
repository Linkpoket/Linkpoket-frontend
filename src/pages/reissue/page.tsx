import axios from 'axios';
import { useEffect } from 'react';

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
        const isNewUser = new URL(redirectUrl).pathname === '/signup';

        if (isNewUser) {
          window.location.href = '/signup';
        } else {
          const accessToken = response.headers['authorization']?.replace(
            'Bearer ',
            ''
          );
          const sseToken = response.data?.data?.value;
          if (accessToken) {
            localStorage.setItem('access_token', accessToken);
          }
          if (sseToken) {
            localStorage.setItem('sse_token', sseToken);
          }
          window.location.href = '/';
        }
      } catch (error) {
        console.log(error);
        window.location.href = '/login';
      }
    };

    handleRedirection();
  }, []);

  // TODO: 로딩스피너 넣는게 좋을듯
  return <p>Reissuing access token... Please wait.</p>;
}
