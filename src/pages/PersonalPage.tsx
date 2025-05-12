import PageLayout from '@/components/page-layout/PageLayout';
import { useEffect } from 'react';
import { useFetchPersonalPage } from '@/hooks/queries/useFetchPersonalPage';
import { useUserStore } from '@/stores/userStore';

export default function PersonalPage() {
  const { data: response, isLoading, error } = useFetchPersonalPage();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (response) {
      const { member } = response.data;
      const { nickName, email, colorCode } = member;
      setUser(nickName, email, colorCode);

      console.log('모든데이터', response);
    }
  }, [response, setUser]);

  //TODO: 로딩스피너 및 데이터를 불러오기 실패할 경우 처리 필요
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <>
      <PageLayout />
    </>
  );
}
