import FooterLogo from '@/assets/common-ui-assets/FooterLogo.svg?react';
import { PRIVACY_POLICY } from '@/constants/privacyPolicy';
import { TERMS_OF_SERVICE } from '@/constants/termsOfService';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const data = [
    {
      name: '문의',
      href: '',
    },
    {
      name: '이용약관',
      href: TERMS_OF_SERVICE,
    },
    {
      name: '개인정보처리방침',
      href: PRIVACY_POLICY,
    },
  ];
  return (
    <footer className="footer-mobile footer-tablet footer-desktop flex justify-between">
      <div className="footer-logo-container-mobile footer-logo-container-desktop footer-logo-container-tablet flex items-center space-x-8">
        <FooterLogo />
        <p className="text-gray-90 footer-copyright-mobile footer-copyright-tablet footer-copyright-desktop text-[21px] font-medium">
          © 2025 linkrew
        </p>
      </div>
      <div className="text-gray-70 footer-links-mobile footer-links-tablet footer-links-desktop flex text-[19px] leading-[150%] font-medium">
        {data.map(({ name, href }, idx) => {
          return (
            <Link to={href} key={idx} target="noopener noreferrer">
              {name}
            </Link>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
