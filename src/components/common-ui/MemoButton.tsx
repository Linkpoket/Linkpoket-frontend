import { cn } from '@/utils/cn';

interface MemoButtonProps {
  hasMemo: boolean;
  onClick: () => void;
  className?: string;
}

export default function MemoButton({
  hasMemo,
  onClick,
  className,
}: MemoButtonProps) {
  return (
    <button
      data-card-button
      className={cn(
        'absolute top-[34px] right-3 z-10 flex cursor-pointer items-center justify-center',
        className
      )}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label="메모"
    >
      <div
        className={`h-3 w-3 rounded-full transition-colors ${
          hasMemo ? 'bg-[#4DA9FF]' : 'bg-gray-30'
        }`}
      />
    </button>
  );
}
