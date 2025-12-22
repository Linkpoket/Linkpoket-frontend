import Modal from '@/components/common-ui/Modal';
import Status from '@/assets/common-ui-assets/Status.svg?react';
import { useDeleteFile } from '@/hooks/mutations/useDeleteFile';
import { forwardRef } from 'react';

const DeleteFileModal = forwardRef<
  HTMLDivElement,
  {
    isOpen: boolean;
    onClose: () => void;
    fileId: string;
    pageId: string;
  }
>(({ isOpen, onClose, fileId, pageId }, ref) => {
  const { mutate: deleteFile } = useDeleteFile({
    onSuccess: () => {
      onClose();
    },
  });

  const handleDelete = () => {
    const requestBody = {
      baseRequest: {
        pageId,
        commandType: 'EDIT',
      },
      fileId: fileId,
    };
    deleteFile(requestBody);
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
          <span>파일 삭제</span>
        </div>
        <p className="text-gray-90 mt-2 mb-6 ml-9 text-base font-normal">
          해당 파일을 삭제하면 복구할 수 없습니다.
        </p>
      </Modal.Header>

      <Modal.Footer className="pt-0">
        <Modal.CancelButton />
        <Modal.ConfirmButton
          onClick={() => {
            handleDelete();
          }}
        >
          삭제
        </Modal.ConfirmButton>
      </Modal.Footer>
    </Modal>
  );
});

export default DeleteFileModal;
