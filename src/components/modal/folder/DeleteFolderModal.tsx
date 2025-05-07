import { useState } from 'react';
import Modal from '@/components/common-ui/Modal';
import Status from '@/assets/common-ui-assets/Status.svg?react';

const DeleteFolderModal = ({
  isOpen,
  onClose,
  onSubmit,
  folderId,
}: {
  isOpen: boolean;
  onClose: () => void;
  folderId: number | null;
  onSubmit: (folderId: null | number) => Promise<void>;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (folderId: number | null) => {
    setIsSubmitting(true);

    try {
      console.log('삭제할 폴더 ID:', folderId);
      await onSubmit(folderId);
      onClose();
    } catch (error) {
      console.error('폴더 삭제 오류:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="p-4 md:max-w-[544px]">
      <Modal.Header className="border-none text-[22px] font-bold">
        <div className="flex items-center">
          <Status className="mr-[10px] py-[2.5px]" />
          폴더 삭제
        </div>
        <p className="text-gray-90 pl-9 text-base font-normal">
          해당 폴더를 삭제하면 복구할 수 없습니다.
        </p>
      </Modal.Header>

      <Modal.Footer className="pt-0">
        <Modal.CancelButton />
        <Modal.ConfirmButton
          onClick={() => handleSubmit(folderId)}
          disabled={isSubmitting}
        >
          삭제
        </Modal.ConfirmButton>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteFolderModal;
