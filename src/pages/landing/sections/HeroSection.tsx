import { Button } from '@/components/common-ui/button';
import 히어로이미지 from '@/assets/common-ui-assets/히어로 이미지.webp';
import { useMobile } from '@/hooks/useMobile';
import { CHROME_EXTENSION_URL } from '@/constants/urls';
import toast from 'react-hot-toast';

const HeroSection: React.FC = () => {
  const isMobile = useMobile();

  const heroTitles = [
    '나만의 링크부터 팀의 자료까지,',
    '한곳에 모아 쉽고 함께 관리해요',
  ];

  const buttonVariants = [
    {
      text: '시작하기',
      href: '/login',
      className: '',
    },
    {
      text: '구글 확장 프로그램 다운',
    },
  ];

  return (
    <section className="bg-primary-5 flex py-16">
      <div className="mx-auto flex max-w-[980px] flex-col place-content-between px-[24px] md:w-full md:flex-row">
        <header className="flex flex-col justify-center">
          <div className="mb-6">
            {heroTitles.map((title, index) => (
              <h1
                key={index}
                className={`text-[24px] leading-[140%] font-bold md:text-[28px]`}
              >
                {title}
              </h1>
            ))}
          </div>

          <div className="mb-18 flex space-x-4 md:mb-0">
            {buttonVariants.map(({ text, href, className }, index) => (
              <a
                key={index}
                href={href}
                target={index === 1 ? '_blank' : undefined}
                rel={index === 1 ? 'noopener noreferrer' : undefined}
                aria-label={
                  index === 1
                    ? '구글 확장 프로그램 다운로드 (새 창)'
                    : '링크포켓 시작하기'
                }
              >
                <Button
                  size={isMobile ? 'sm' : 'lg'}
                  variant={index === 1 ? 'ghost' : 'primary'}
                  onClick={
                    index === 1
                      ? () => {
                          toast.success('상표 문제로 인해 점검 중입니다.');
                        }
                      : undefined
                  }
                  className={`font-semibold ${className} ${
                    index === 0 && 'hover:bg-primary-40 active:bg-primary-60'
                  }`}
                >
                  {text}
                </Button>
              </a>
            ))}
          </div>
        </header>

        <div className="hero-image-container-tablet hero-image-container-desktop">
          <img
            src={히어로이미지}
            alt="Landing page main illustration"
            className="w-[454px] rounded-3xl"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
