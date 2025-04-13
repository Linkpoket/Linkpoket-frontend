import Logo from '@/shared/assets/Logo.svg?react';
import Kakao from '@/shared/assets/Kakao.svg?react';
import Google from '@/shared/assets/Google.svg?react';
import { Button } from '@/shared/ui/button';

const LoginPage = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <section className="flex flex-col items-start w-full max-w-md">
        <div className="flex flex-col leading-[1.5] text-left text-[28px] font-bold mb-[69px]">
          {/* 링크모아 문구 */}
          <Logo />
          <h2 className="text-gray-800 mb-1 mt-4">
            <span className="text-orange-500">링크</span>를 한눈에
          </h2>
          <h2 className="mb-1">
            <span className="text-orange-500">모아</span>두고
          </h2>
          <p className="text-gray-800">간편하게 관리하세요</p>
        </div>

        {/* 카카오 로그인 */}
        <section className="w-full space-y-4">
          <Button className="flex items-center justify-center w-full py-3 bg-[#fee500] rounded-lg text-gray-800 font-medium hover:bg-none">
            <Kakao className="mr-2" />
            카카오 로그인
          </Button>

          {/* 구글 로그인 */}
          <Button className="flex items-center justify-center w-full py-3 bg-[#f2f2f2] hover:bg-[#e6e6e6] rounded-lg text-gray-800 font-medium">
            <Google className="mr-2" />
            Google 로그인
          </Button>
        </section>
      </section>
    </main>
  );
};

export default LoginPage;
