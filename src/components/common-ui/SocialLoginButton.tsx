import { cn } from '@/utils/cn';
import { Button } from './button';

export const SocialLoginButton = ({
  provider,
  icon: Icon,
  bgColor,
  className,
  onClick,
}: {
  provider: string;
  icon: React.ElementType;
  bgColor: string;
  className?: string;
  onClick: () => void;
}) => (
  <Button
    onClick={onClick}
    className={cn(
      `flex w-full items-center justify-center rounded-lg ${bgColor} text-gray-90 h-[63px] py-3 text-[21px] font-semibold`,
      className
    )}
  >
    <Icon className="mr-[10px]" />
    {provider} 로그인
  </Button>
);
