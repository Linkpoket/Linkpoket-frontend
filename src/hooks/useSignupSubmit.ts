import { useNavigate } from 'react-router-dom';
import { COLOR_OPTIONS } from '@/styles/tokens';
import { JOB_OPTIONS } from '@/constants/signup';
import { FormData } from '@/schemas/signup';
import { useUserStore } from '@/stores/userStore';
import axios from 'axios';

export const useSignupSubmit = () => {
  const navigate = useNavigate();
  const setIsLoggedIn = useUserStore((state) => state.setIsLoggedIn);

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

      // 임시 토큰을 헤더에 추가하여 회원가입 요청
      const tempAccessToken = localStorage.getItem('temp_access_token');

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/member/sign-up`,
        {
          ageRange: data.ageRange,
          gender: genderValue,
          job: submitData.jobText,
          nickName: data.nickname,
          colorCode: submitData.colorCode,
        },
        {
          withCredentials: true,
          headers: tempAccessToken
            ? {
                Authorization: `Bearer ${tempAccessToken}`,
              }
            : {},
        }
      );

      // 회원가입 완료 후 임시 토큰을 정식 토큰으로 이동
      if (tempAccessToken) {
        localStorage.setItem('access_token', tempAccessToken);
        localStorage.removeItem('temp_access_token');
      }

      const tempSseToken = localStorage.getItem('temp_sse_token');
      if (tempSseToken) {
        localStorage.setItem('sse_token', tempSseToken);
        localStorage.removeItem('temp_sse_token');
      }

      // userStore 상태 수동 업데이트
      setIsLoggedIn(true);

      navigate('/');
    } catch (error: any) {
      console.error('회원가입 에러:', error);
      if (axios.isAxiosError(error)) {
        console.error('응답 상태 코드:', error.response?.status);
        console.error('응답 메시지:', error.response?.data);
      }
    }
  };

  return { onSubmit };
};
