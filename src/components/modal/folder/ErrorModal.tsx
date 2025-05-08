import Modal from '@/components/common-ui/Modal';
import Status from '@/assets/common-ui-assets/Status.svg?react';

const ErrorModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="p-4 md:max-w-[544px]">
      <Modal.Header className="border-none text-[22px] font-bold">
        <div className="flex items-center">
          <Status className="mr-[10px] py-[2.5px]" />
          에러
        </div>
        <p className="text-gray-90 pl-9 text-base font-normal">
          해당 요청을 처리할 수 있는 권한이 없습니다.
        </p>
      </Modal.Header>

      <Modal.Footer className="pt-0">
        <Modal.ConfirmButton onClick={onClose} variant="check">
          확인
        </Modal.ConfirmButton>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorModal;
