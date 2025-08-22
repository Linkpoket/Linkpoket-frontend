import { useState, forwardRef } from 'react';
import { Input } from '@/components/common-ui/Input';
import Modal from '@/components/common-ui/Modal';
import FolderItemIcon from '@/assets/common-ui-assets/FolderItemIcon.svg?react';
import toast from 'react-hot-toast';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  folderName: string;
  onSubmit: (email: string, directoryId: string) => void;
  directoryId: string;
};

const FolderTransferModal = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { isOpen, onClose, folderName, onSubmit, directoryId } = props;
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!email) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('유효한 이메일 주소를 입력해 주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(email, directoryId);
      setEmail('');
      onClose();
    } catch (error) {
      console.error('폴더 전송 오류:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} ref={ref}>
      <Modal.Header>폴더 전송</Modal.Header>
      <Modal.Body hasFooter>
        <div>
          <div className="text-gray-90 mb-4 flex items-center px-[8px] py-[11px] text-sm font-semibold">
            <FolderItemIcon className="mr-[10px] h-[18px] w-[18px]" />
            {folderName}
          </div>

          <div>
            <Input
              label="받는 사용자 이메일"
              placeholder="받는 사용자의 이메일 주소를 입력해 주세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isModal={true}
              containerClassName="w-full"
              labelClassName="font-bold leading-[140%]"
            />
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className="pt-0">
        <Modal.CancelButton onClick={() => setEmail('')} />
        <Modal.ConfirmButton
          onClick={handleSubmit}
          disabled={!email || isSubmitting}
          variant={email ? 'primary' : 'default'}
        >
          {isSubmitting ? '전송 중...' : '전송'}
        </Modal.ConfirmButton>
      </Modal.Footer>
    </Modal>
  );
});

export default FolderTransferModal;
