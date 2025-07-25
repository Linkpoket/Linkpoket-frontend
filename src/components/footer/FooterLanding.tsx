import { Link } from 'react-router-dom';
import Logo from '@/assets/widget-ui-assets/Logo.svg?react';

export function FooterLanding() {
  return (
    <footer>
      <div className="flex w-full items-center justify-between px-[22px] py-[32px]">
        <div className="flex items-center gap-[32px]">
          <Logo />
          <span className="text-gray-90 text-[13px] font-[500]">
            © 2025 linkmoa
          </span>
        </div>

        <div className="text-gray-70 flex gap-[32px] text-[13px]">
          <Link to="#">문의</Link>
          <Link to="#">이용약관</Link>
          <a
            href="https://receptive-point-998.notion.site/Linkrew-206f9c9e9312804db5acd2e518704dff"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-70"
          >
            개인정보처리방침
          </a>
        </div>
      </div>
    </footer>
  );
}
