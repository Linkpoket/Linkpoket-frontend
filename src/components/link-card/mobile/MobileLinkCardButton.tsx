import { useModalStore } from '@/stores/modalStore';

export default function MobileLinkCardButton() {
  const { openLinkModal } = useModalStore();

  const handleAddLinkModalOpen = () => {
    openLinkModal();
  };
  return (
    <>
      <div
        className={`group relative flex h-[170px] flex-col items-center justify-center gap-4 overflow-visible rounded-lg p-[16px] hover:cursor-pointer`}
        onClick={handleAddLinkModalOpen}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="text-2xl font-medium">+</div>
          <div className="text-2xl font-medium">Add</div>
        </div>
      </div>
    </>
  );
}
