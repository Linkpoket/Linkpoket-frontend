import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ReissuePage() {
  console.log('ReissuePage 컴포넌트 렌더링');
  const navigate = useNavigate();

  useEffect(() => {
    console.log('ReissuePage useEffect 실행');
    console.log('현재 쿠키:', document.cookie);

    const fetchAccessToken = async () => {
      console.log('액세스 토큰 요청 함수 시작');
      try {
        console.log('API 요청 시작: /api/jwt/access-token');

        const response = await axios.get('/api/jwt/access-token', {
          withCredentials: true,
        });
        console.log('API 응답 받음:', response);
        console.log('응답 데이터:', response.data);
        console.log('응답 헤더:', response.headers);

        const accessToken = response.data.data;
        console.log('추출된 액세스 토큰:', accessToken);

        if (accessToken) {
          localStorage.setItem('access_token', accessToken);
          console.log('로컬 스토리지에 토큰 저장 완료');

          // 저장 후 확인
          const storedToken = localStorage.getItem('access_token');
          console.log('저장 후 확인한 토큰:', storedToken);

          console.log('메인 페이지로 리다이렉트 시작');
          navigate('/');
          console.log('리다이렉트 명령 실행됨');
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
    return () => {
      console.log('ReissuePage 컴포넌트 언마운트');
    };
  }, [navigate]);

  return <p>Reissuing access token... Please wait.</p>;
}
