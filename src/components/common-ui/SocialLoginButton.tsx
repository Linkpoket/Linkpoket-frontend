import { cn } from '@/utils/cn';
import { Button } from './button';

export const SocialLoginButton = ({
  provider,
  icon: Icon,
  bgColor,
  className,
  iconClassName,
  onClick,
  noMargin,
}: {
  provider?: string;
  icon: React.ElementType;
  bgColor?: string;
  className?: string;
  iconClassName?: string;
  onClick: () => void;
  noMargin?: boolean;
}) => (
  <Button
    onClick={onClick}
    className={cn(
      `flex w-full items-center justify-center rounded-lg ${bgColor} text-gray-90 group h-[63px] py-3 text-[21px] font-semibold`,
      className
    )}
  >
    <Icon className={cn(!noMargin && 'mr-[10px]', iconClassName)} />
    {provider && provider}
  </Button>
);
