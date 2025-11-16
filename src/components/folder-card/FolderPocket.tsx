export default function FolderPocket({
  backgroundColor,
}: {
  backgroundColor: string;
}) {
  return (
    <div
      className="absolute right-0 bottom-0 left-0 h-[64%] rounded-b-[16px] opacity-95 shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_-2px_10px_rgba(0,0,0,0.06)]"
      style={{
        background: backgroundColor
          .replace('0.85', '0.6')
          .replace('0.82', '0.55')
          .replace('0.8', '0.5'),
        clipPath: 'polygon(0% 7%, 86% 7%, 100% 0%, 100% 100%, 0% 100%)',
      }}
    />
  );
}
