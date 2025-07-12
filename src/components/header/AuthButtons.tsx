import { Button } from '@/components/common-ui/button';
import { useNavigate } from 'react-router-dom';

export function AuthButtons() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="flex cursor-pointer items-center gap-[16px] text-[17px]">
      <Button
        onClick={handleLogin}
        className="h-auto px-[16px] py-[12px] whitespace-nowrap"
      >
        로그인
      </Button>
      <Button
        variant="ghost"
        onClick={handleSignup}
        className="h-auto px-[16px] py-[12px] whitespace-nowrap"
      >
        회원가입
      </Button>
    </div>
  );
}
