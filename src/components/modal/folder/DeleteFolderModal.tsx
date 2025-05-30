import Modal from '@/components/common-ui/Modal';
import Status from '@/assets/common-ui-assets/Status.svg?react';
import useDeleteFolder from '@/hooks/mutations/useDeleteFolder';

const DeleteFolderModal = ({
  isOpen,
  onClose,
  folderId,
  pageId,
}: {
  isOpen: boolean;
  onClose: () => void;
  folderId: number;
  pageId: number;
}) => {
  const { mutate: deleteFolder } = useDeleteFolder(pageId);

  const handleDelete = () => {
    const requestBody = {
      baseRequest: {
        pageId,
        commandType: 'EDIT',
      },
      folderId: folderId,
    };
    console.log('폴더 삭제 요청 데이터:', requestBody);
    deleteFolder(requestBody);
    onClose();
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
        <Modal.ConfirmButton onClick={handleDelete}>삭제</Modal.ConfirmButton>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteFolderModal;
