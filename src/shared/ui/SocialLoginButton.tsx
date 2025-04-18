import { Button } from './button';

export const SocialLoginButton = ({
  provider,
  icon: Icon,
  bgColor,
  hoverColor,
  onClick,
}: {
  provider: string;
  icon: React.ElementType;
  bgColor: string;
  hoverColor: string;
  onClick: () => void;
}) => (
  <Button
    onClick={onClick}
    className={`flex w-full items-center justify-center rounded-lg ${bgColor} py-3 font-semibold text-gray-800 hover:${hoverColor} text-[21px]`}
  >
    <Icon className="mr-[10px]" />
    {provider} 로그인
  </Button>
);
