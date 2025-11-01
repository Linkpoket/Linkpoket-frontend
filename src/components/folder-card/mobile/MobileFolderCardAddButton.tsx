import { useModalStore } from '@/stores/modalStore';

export default function MobileFolderCardAddButton() {
  const { openFolderModal } = useModalStore();

  return (
    <div
      onClick={() => openFolderModal()}
      className={`flex-shrink-0 cursor-pointer rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm transition-all duration-200 hover:scale-105 hover:bg-gray-50 hover:shadow-md focus:scale-105 focus:bg-gray-50 focus:shadow-md focus:outline-none active:scale-95`}
    >
      <div className="flex items-center gap-2">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-400 text-white">
          <span className="text-sm font-bold">+</span>
        </div>
        <span className="text-sm font-medium text-black">새 폴더</span>
      </div>
    </div>
  );
}
