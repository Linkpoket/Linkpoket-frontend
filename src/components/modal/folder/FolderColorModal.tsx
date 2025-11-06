import Modal from '@/components/common-ui/Modal';
import { useFolderColorStore } from '@/stores/folderColorStore';
import { FOLDER_COLOR_OPTIONS } from '@/constants/folderColor';

interface FolderColorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FolderColorModal({
  isOpen,
  onClose,
}: FolderColorModalProps) {
  const { selectedColorId, setSelectedColorId } = useFolderColorStore();

  const handleColorSelect = (colorId: string) => {
    if (colorId !== selectedColorId) setSelectedColorId(colorId);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header showCloseButton>폴더 색상 변경</Modal.Header>
      <Modal.Body hasFooter>
        <div className="space-y-4">
          <p className="text-gray-90 text-sm">
            폴더 아이콘의 색상을 선택해주세요.
          </p>

          <div className="grid grid-cols-1 gap-3">
            {FOLDER_COLOR_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => handleColorSelect(option.id)}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 p-3 transition-all ${
                  selectedColorId === option.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                {/* 색상 미리보기 */}
                <div
                  className="h-8 w-8 rounded-full shadow-sm"
                  style={{ backgroundColor: option.previewColor }}
                />

                {/* 색상 이름 */}
                <span className="text-gray-90 text-sm font-medium">
                  {option.name}
                </span>

                {/* 선택 표시 */}
                {selectedColorId === option.id && (
                  <div className="ml-auto">
                    <svg
                      className="h-5 w-5 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="pt-0">
        <Modal.ConfirmButton onClick={onClose}>완료</Modal.ConfirmButton>
      </Modal.Footer>
    </Modal>
  );
}
