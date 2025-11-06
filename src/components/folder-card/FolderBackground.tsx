export default function FolderBackground({
  backgroundColor,
}: {
  backgroundColor: string;
}) {
  return (
    <div
      className="absolute inset-0 rounded-[24px] opacity-90 shadow-[0_10px_20px_rgba(0,0,0,0.12)]"
      style={{
        background: backgroundColor,
      }}
    />
  );
}
