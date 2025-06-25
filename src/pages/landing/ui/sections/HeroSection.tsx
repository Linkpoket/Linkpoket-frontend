import { Button } from '@/components/common-ui/button';
import landingImage1 from '@/assets/common-ui-assets/landingImage1.png';

const HeroSection: React.FC = () => {
  const heroTitles = ['링크를 한눈에', '모아두고', '간편하게 관리하세요'];

  const buttonVariants = [
    {
      text: '시작하기',
      href: '/signup',
      className: '',
    },
    {
      text: '구글 확장 프로그램 무료 다운로드',
      href: '/extension',
      className: 'bg-primary-10 text-primary-60',
    },
  ];

  return (
    <section className="bg-primary-5 hero-section-mobile hero-section-tablet hero-section-desktop">
      <div className="hero-container-mobile hero-container-tablet hero-container-desktop flex">
        <header className="hero-header-mobile hero-header-tablet hero-header-desktop flex flex-col">
          {heroTitles.map((title, index) => (
            <h1
              key={index}
              className={`hero-title-mobile hero-title-tablet hero-title-desktop leading-[140%] font-bold tracking-[0.01em] ${
                index === 0 ? 'text-primary-50' : 'text-gray-100'
              }`}
            >
              {title}
            </h1>
          ))}

          <div className="hero-buttons-mobile hero-buttons-tablet hero-buttons-desktop">
            {buttonVariants.map(({ text, href, className }, index) => (
              <a key={index} href={href}>
                <Button
                  size="noPadding"
                  className={`hero-button-mobile hero-button-tablet hero-button-desktop font-semibold ${className} ${
                    index === 0
                      ? 'hover:bg-primary-40 active:bg-primary-60'
                      : 'hover:bg-primary-20 active:bg-primary-30'
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
            src={landingImage1}
            alt="Landing page main illustration"
            className="hero-image-mobile hero-image-tablet hero-image-desktop"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
