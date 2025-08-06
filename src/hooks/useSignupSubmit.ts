import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '@/apis/axiosInstance';
import { COLOR_OPTIONS } from '@/styles/tokens';
import { JOB_OPTIONS } from '@/constants/signup';
import { FormData } from '@/schemas/signup';
import axios from 'axios';

export const useSignupSubmit = () => {
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    const submitData = {
      ...data,
      jobText:
        data.job === 'other'
          ? data.customJob
          : JOB_OPTIONS.find((opt) => opt.value === data.job)?.label || '',
      colorCode:
        COLOR_OPTIONS[Math.floor(Math.random() * COLOR_OPTIONS.length)],
    };

    try {
      const genderValue = data.gender === 'male' ? 1 : 2;

      // 회원가입은 axiosInstance 사용 (기존 그대로)
      await axiosInstance.post('/api/member/sign-up', {
        ageRange: data.ageRange,
        gender: genderValue,
        job: submitData.jobText,
        nickName: data.nickname,
        colorCode: submitData.colorCode,
      });

      // Access Token 요청은 일반 axios 사용 (인터셉터 우회)
      const tokenResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/jwt/access-token`,
        {
          withCredentials: true,
        }
      );

      const authAccessToken = tokenResponse.headers['authorization']?.replace(
        'Bearer ',
        ''
      );

      if (authAccessToken) {
        localStorage.setItem('access_token', authAccessToken);
      } else {
        console.warn('Access Token이 없습니다.');
        window.location.href = '/login';
        return;
      }

      const sseToken = tokenResponse.data.data?.value;
      if (sseToken) {
        localStorage.setItem('sse_token', sseToken);
      } else {
        console.warn('SSE 토큰이 존재하지 않습니다.');
      }

      navigate('/');
    } catch (error: any) {
      console.error('회원가입 에러:', error);
      if (axios.isAxiosError(error)) {
        console.error('응답 상태 코드:', error.response?.status);
        console.error('응답 메시지:', error.response?.data);
      } else {
        console.error('기타 오류:', error);
      }
    }
  };

  return { onSubmit };
};
