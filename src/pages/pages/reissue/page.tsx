import { useEffect } from 'react';
import { axiosInstance } from '@/apis/axiosInstance';

export default function ReissuePage() {
  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await axiosInstance.get('/api/jwt/access-token');

        if (response?.headers['redirect-url']) {
          window.location.href = response.headers['redirect-url'];
        }

        const accessToken = response.data.data;
        if (accessToken) {
          localStorage.setItem('access_token', accessToken);
        }
      } catch (error) {
        window.location.href = '/login';
      }
    };

    fetchAccessToken();
  }, []);

  return <p>Reissuing access token... Please wait.</p>;
}
