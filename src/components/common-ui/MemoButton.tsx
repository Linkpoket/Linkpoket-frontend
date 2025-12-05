interface MemoButtonProps {
  hasMemo: boolean;
  onClick: () => void;
}

export default function MemoButton({ hasMemo, onClick }: MemoButtonProps) {
  return (
    <button
      data-card-button
      className="absolute top-10 right-2 z-10 cursor-pointer"
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
