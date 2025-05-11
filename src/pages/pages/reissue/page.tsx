import { useEffect } from 'react';
import axios from 'axios';
import { axiosInstance } from '@/apis/axiosInstance';
import { useNavigate } from 'react-router-dom';

export default function ReissuePage() {
  const navigate = useNavigate();
  console.log('ReissuePage 컴포넌트 렌더링');

  useEffect(() => {
    const fetchAccessToken = async () => {
      console.log('액세스 토큰 요청 함수 시작');
      try {
        console.log('API 요청 시작: /api/jwt/access-token');

        const response = await axiosInstance.get('/api/jwt/access-token');

        if (response?.headers['redirect-url']) {
          window.location.href = response.headers['redirect-url'];
        }

        console.log('API 응답 받음:', response);

        const accessToken = response.data.data;
        console.log('추출된 액세스 토큰:', accessToken);

        if (accessToken) {
          localStorage.setItem('access_token', accessToken);
          console.log('로컬 스토리지에 토큰 저장 완료');
        } else {
          console.error('응답에 토큰이 없습니다:', response.data);
        }
      } catch (error) {
        console.error('액세스 토큰 요청 중 오류 발생:', error);

        if (axios.isAxiosError(error)) {
          console.log('오류 응답 데이터:', error.response?.data);
          console.log('오류 응답 상태:', error.response?.status);
          console.log('오류 메시지:', error.message);
        } else {
          console.log('알 수 없는 오류 발생', error);
        }
      }
    };

    fetchAccessToken();
  }, [navigate]);

  return <p>Reissuing access token... Please wait.</p>;
}
