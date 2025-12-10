import { useNavigate } from 'react-router-dom';
import NotFoundImage from '@/assets/common-ui-assets/404 이미지.webp';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden">
      {/* 배경 이미지 - 화면 전체 가득 차게 */}
      <img
        src={NotFoundImage}
        alt="404 Not Found"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/20" />

      {/* 콘텐츠 */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <h1 className="mb-6 text-[24rem] leading-none font-bold text-white drop-shadow-2xl md:text-[20rem]">
          404
        </h1>

        <p className="mb-8 text-3xl font-bold text-white drop-shadow-lg">
          이 곳은 개인적인 공간입니다.
          <br />
          뒤로가기 버튼을 눌려주세요.
        </p>

        {/* 뒤로가기 버튼 */}
        <button
          onClick={() => navigate(-1)}
          className="rounded-lg bg-white/90 px-8 py-3 text-lg font-medium text-gray-900 transition-all hover:bg-white hover:shadow-lg"
        >
          뒤로가기
        </button>
      </div>
    </div>
  );
}
