import Logo from '@/shared/assets/Logo.svg?react';
import Kakao from '@/shared/assets/Kakao.svg?react';
import Google from '@/shared/assets/Google.svg?react';
import { SocialLoginButton } from '@/shared/ui/SocialLoginButton';

const LoginPage = () => {
  const handleKakaoLogin = () => {
    // 카카오 로그인 로직 구현
    console.log('카카오 로그인 시도');
  };

  const handleGoogleLogin = () => {
    // 구글 로그인 로직 구현
    console.log('구글 로그인 시도');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <section className="flex w-full max-w-md flex-col items-start">
        <div className="mb-[69px] flex flex-col text-left text-[28px] leading-[150%] font-bold">
          <Logo />
          <h2 className="mt-4 text-orange-500">링크를 한눈에</h2>
          <span className="text-gray-100">모아두고</span>
          <span className="text-gray-100">간편하게 관리하세요</span>
        </div>

        <section className="w-full space-y-4">
          <SocialLoginButton
            provider="카카오"
            icon={Kakao}
            bgColor="bg-yellow-300"
            hoverColor="bg-yellow-400"
            onClick={handleKakaoLogin}
          />

          <SocialLoginButton
            provider="Google"
            icon={Google}
            bgColor="bg-gray-5"
            hoverColor="bg-gray-200"
            onClick={handleGoogleLogin}
          />
        </section>
      </section>
    </main>
  );
};

export default LoginPage;
