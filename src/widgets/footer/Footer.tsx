import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer>
      <div>
        <div className="flex flex-col gap-1 pt-[16px] px-[24px] pb-[24px]">
          <div className="flex gap-[20px] text-gray-70 text-[19px] font-[500] leading-[150%] whitespace-nowrap">
            <Link to="#">문의</Link>
            <Link to="#">이용약관</Link>
            <Link to="#">개인정보처리방침</Link>
          </div>
          <p className="text-gray-50 text-[21px] font-[400]">© 2025 linkmoa</p>
        </div>
      </div>
    </footer>
  );
}
