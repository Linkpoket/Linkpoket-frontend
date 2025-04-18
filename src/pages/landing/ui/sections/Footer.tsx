import FooterLogo from '@/shared/assets/FooterLogo.svg?react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="flex justify-between px-[66px] py-12">
      <div className="flex items-center space-x-8">
        <FooterLogo />
        <p className="text-gray-90 text-[21px] font-medium">© 2025 linkrew</p>
      </div>
      <div className="text-gray-70 flex space-x-8 text-[19px] leading-[150%] font-medium">
        <Link to="#">문의</Link>
        <Link to="#">이용약관</Link>
        <Link to="#">개인정보처리방침</Link>
      </div>
    </footer>
  );
};

export default Footer;
