import FooterLogo from '@/assets/common-ui-assets/FooterLogo.svg?react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer-mobile footer-tablet footer-desktop flex justify-between">
      <div className="footer-logo-container-mobile footer-logo-container-desktop footer-logo-container-tablet flex items-center space-x-8">
        <FooterLogo />
        <p className="text-gray-90 footer-copyright-mobile footer-copyright-tablet footer-copyright-desktop text-[21px] font-medium">
          © 2025 linkrew
        </p>
      </div>
      <div className="text-gray-70 footer-links-mobile footer-links-tablet footer-links-desktop flex text-[19px] leading-[150%] font-medium">
        <Link to="#">문의</Link>
        <Link to="#">이용약관</Link>
        <Link to="#">개인정보처리방침</Link>
      </div>
    </footer>
  );
};

export default Footer;
