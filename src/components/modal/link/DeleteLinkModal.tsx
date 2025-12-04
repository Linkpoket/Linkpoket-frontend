import { forwardRef } from 'react';
import Modal from '@/components/common-ui/Modal';
import Status from '@/assets/common-ui-assets/Status.svg?react';
import { useDeleteLink } from '@/hooks/mutations/useDeleteLink';
import { DeleteLinkData } from '@/types/links';
import toast from 'react-hot-toast';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  linkId: string;
  pageId: string;
};

const DeleteLinkModal = forwardRef<HTMLDivElement, Props>(
  ({ isOpen, onClose, linkId, pageId }, ref) => {
    const { mutate: deleteLink, isPending } = useDeleteLink();

    const handleDelete = () => {
      const requestBody: DeleteLinkData = {
        baseRequest: {
          pageId,
          commandType: 'EDIT',
        },
        linkId,
      };

      deleteLink(requestBody, {
        onSuccess: () => {
          onClose();
        },
        onError: (error) => {
          console.error('링크 삭제 실패:', error);
          toast.error(
            error instanceof Error ? error.message : '링크 삭제에 실패했습니다.'
          );
        },
      });
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
            <span>링크 삭제</span>
          </div>
          <p className="text-gray-90 mt-2 mb-6 ml-9 text-base font-normal">
            삭제하면 복구할 수 없습니다
          </p>
        </Modal.Header>

        <Modal.Footer className="pt-0">
          <Modal.CancelButton />
          <Modal.ConfirmButton onClick={handleDelete} disabled={isPending}>
            {isPending ? '삭제 중...' : '삭제'}
          </Modal.ConfirmButton>
        </Modal.Footer>
      </Modal>
    );
  }
);

export default DeleteLinkModal;
