import PageLayout from '@/components/page-layout/PageLayout';
import { axiosInstance } from '@/apis/axiosInstance';
import { useEffect } from 'react';

export default function PersonalPage() {
  // useEffect(() => {
  //   async function fetchLoginPage() {
  //     try {
  //       const response = await axiosInstance.get('/api/page', {});
  //       console.log('응답 데이터:', response.data, '/api/page');
  //     } catch (error) {
  //       console.error('GET 요청 에러:', error);
  //     }
  //   }

  //   fetchLoginPage(); // 여기서 호출해야 요청이 발생함
  // }, []);

  return (
    <>
      <PageLayout />
    </>
  );
}
