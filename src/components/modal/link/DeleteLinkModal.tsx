import { forwardRef } from 'react';
import Modal from '@/components/common-ui/Modal';
import Status from '@/assets/common-ui-assets/Status.svg?react';
import { useDeleteLink } from '@/hooks/mutations/useDeleteLink';
import { DeleteLinkData } from '@/types/links';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  linkId: number;
  pageId: number;
};

const DeleteLinkModal = forwardRef<HTMLDivElement, Props>(
  ({ isOpen, onClose, linkId, pageId }, ref) => {
    const { mutate: deleteLink } = useDeleteLink();

    const handleDelete = () => {
      const requestBody: DeleteLinkData = {
        baseRequest: {
          pageId,
          commandType: 'EDIT',
        },
        linkId,
      };
      console.log('링크 삭제 요청 데이터', requestBody);
      deleteLink(requestBody);
      onClose();
    };

    return (
      <Modal
        ref={ref}
        isOpen={isOpen}
        onClose={onClose}
        className="p-4 md:max-w-[544px]"
      >
        <Modal.Header className="border-none text-[22px] font-bold">
          <div className="flex items-center">
            <Status className="mr-[10px] py-[2.5px]" />
            링크 삭제
          </div>
          <p className="text-gray-90 pl-9 text-base font-normal">
            삭제하면 복구할 수 없습니다
          </p>
        </Modal.Header>

        <Modal.Footer className="pt-0">
          <Modal.CancelButton />
          <Modal.ConfirmButton onClick={handleDelete}>삭제</Modal.ConfirmButton>
        </Modal.Footer>
      </Modal>
    );
  }
);

export default DeleteLinkModal;
