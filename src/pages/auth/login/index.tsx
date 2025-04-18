import Logo from '@/shared/assets/Logo.svg?react';
import Kakao from '@/shared/assets/Kakao.svg?react';
import Google from '@/shared/assets/Google.svg?react';
import { Button } from '@/shared/ui/button';

const LoginPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <section className="flex w-full max-w-md flex-col items-start">
        <div className="mb-[69px] flex flex-col text-left text-[28px] leading-[1.5] font-bold">
          {/* 링크모아 문구 */}
          <Logo />
          <h2 className="mt-4 mb-1 text-gray-800">
            <span className="text-orange-500">링크</span>를 한눈에
          </h2>
          <h2 className="mb-1">
            <span className="text-orange-500">모아</span>두고
          </h2>
          <p className="text-gray-800">간편하게 관리하세요</p>
        </div>

        {/* 카카오 로그인 */}
        <section className="w-full space-y-4">
          <Button className="flex w-full items-center justify-center rounded-lg bg-[#fee500] py-3 font-medium text-gray-800 hover:bg-none">
            <Kakao className="mr-2" />
            카카오 로그인
          </Button>

          {/* 구글 로그인 */}
          <Button className="flex w-full items-center justify-center rounded-lg bg-[#f2f2f2] py-3 font-medium text-gray-800 hover:bg-[#e6e6e6]">
            <Google className="mr-2" />
            Google 로그인
          </Button>
        </section>
      </section>
    </main>
  );
};

export default LoginPage;
