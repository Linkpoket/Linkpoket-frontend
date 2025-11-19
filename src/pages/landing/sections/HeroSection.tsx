import { Button } from '@/components/common-ui/button';
import 히어로이미지 from '@/assets/common-ui-assets/히어로 이미지_LINKPOKET.webp';
import { useMobile } from '@/hooks/useMobile';
import { CHROME_EXTENSION_URL } from '@/constants/urls';

const HeroSection: React.FC = () => {
  const isMobile = useMobile();

  const heroTitles = ['나의 링크부터 팀의 자료까지,', '한곳에서 쉽게 관리해요'];

  const buttonVariants = [
    {
      text: '시작하기',
      href: '/login',
      className: '',
    },
    {
      text: '구글 확장 프로그램 다운',
      href: CHROME_EXTENSION_URL,
    },
  ];

  return (
    <section className="mt-30 flex bg-transparent py-16">
      <div className="mx-auto flex max-w-[980px] flex-col place-content-between px-[24px] md:w-full md:flex-row">
        <header className="flex flex-col justify-center">
          <div className="mb-6">
            {heroTitles.map((title, index) => (
              <h1
                key={index}
                className={`leading-[160%] ${
                  index === 0
                    ? 'text-[40px] md:text-[38px]'
                    : 'text-[31px] font-bold md:text-[48px]'
                }`}
              >
                {title}
              </h1>
            ))}
          </div>

          <div className="mt-6 mb-18 flex space-x-2 md:mb-0">
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
            className="w-[600px] rounded-3xl"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
