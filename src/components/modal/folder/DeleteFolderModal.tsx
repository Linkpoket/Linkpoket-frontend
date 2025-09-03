import Modal from '@/components/common-ui/Modal';
import Status from '@/assets/common-ui-assets/Status.svg?react';
import useDeleteFolder from '@/hooks/mutations/useDeleteFolder';
import { forwardRef } from 'react';

const DeleteFolderModal = forwardRef<
  HTMLDivElement,
  {
    isOpen: boolean;
    onClose: () => void;
    folderId: string;
    pageId: string;
  }
>(({ isOpen, onClose, folderId, pageId }, ref) => {
  const { mutate: deleteFolder } = useDeleteFolder(pageId);

  const handleDelete = () => {
    const requestBody = {
      baseRequest: {
        pageId,
        commandType: 'EDIT',
      },
      folderId: folderId,
    };
    deleteFolder(requestBody);
    onClose();
  };

  return (
    <Modal
      ref={ref}
      isOpen={isOpen}
      onClose={onClose}
      className="p-4 md:max-w-[544px]"
    >
      <Modal.Header>
        <div className="flex items-center space-x-[10px]">
          <Status />
          <span>폴더 삭제</span>
        </div>
        <p className="text-gray-90 mt-2 mb-6 ml-9 text-base font-normal">
          해당 폴더를 삭제하면 복구할 수 없습니다.
        </p>
      </Modal.Header>

      <Modal.Footer className="pt-0">
        <Modal.CancelButton />
        <Modal.ConfirmButton onClick={handleDelete}>삭제</Modal.ConfirmButton>
      </Modal.Footer>
    </Modal>
  );
});

export default DeleteFolderModal;
