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

      await axiosInstance.post('/api/member/sign-up', {
        ageRange: data.ageRange,
        gender: genderValue,
        job: submitData.jobText,
        nickName: data.nickname,
        colorCode: submitData.colorCode,
      });

      navigate('/');
    } catch (error) {
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
