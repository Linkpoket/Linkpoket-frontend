import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer>
      <div>
        <div className="flex w-[260px] flex-col gap-1 px-[24px] pt-[16px] pb-[24px]">
          <div className="text-gray-70 flex gap-[16px] text-[13px] leading-[150%] font-[400]">
            <Link to="#">문의</Link>
            <Link to="#">이용약관</Link>
            <Link to="#">개인정보처리방침</Link>
          </div>
          <p className="text-[13px] font-[400] text-gray-50">
            © 2025 linkpoket
          </p>
        </div>
      </div>
    </footer>
  );
}
