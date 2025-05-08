import { useState } from 'react';
import { Input } from '@/components/common-ui/Input';
import Modal from '@/components/common-ui/Modal';
import FolderItemIcon from '@/assets/common-ui-assets/FolderItemIcon.svg?react';

const AddFolderModal = ({
  isOpen,
  onClose,
  folderName,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  folderName: string;
  onSubmit: (folder: string, description: string) => Promise<void>;
}) => {
  const [folder, setFolder] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!folder) return;

    setIsSubmitting(true);
    try {
      await onSubmit(folder, description);
      setFolder('');
      setDescription('');
      onClose();
    } catch (error) {
      console.error('폴더 전송 오류:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header>폴더 추가</Modal.Header>

      <Modal.Body className="py-4">
        <div>
          <div className="text-gray-90 mb-4 flex items-center px-[8px] py-[11px] text-sm font-semibold">
            <FolderItemIcon className="mr-[10px] h-[18px] w-[18px]" />
            {folderName}
          </div>

          <div className="space-y-4">
            <Input
              label="폴더명"
              placeholder="폴더명을 입력해 주세요"
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
              isModal={true}
              inputSize="medium"
              containerClassName="w-full"
              labelClassName="font-bold leading-[140%]"
            />
            <Input
              label="설명"
              placeholder="폴더에 대한 설명을 입력해 주세요"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              isModal={true}
              inputSize="medium"
              containerClassName="w-full"
              labelClassName="font-bold leading-[140%]"
            />
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className="pt-0">
        <Modal.CancelButton
          onClick={() => {
            setFolder('');
            setDescription('');
          }}
        />
        <Modal.ConfirmButton
          onClick={handleSubmit}
          disabled={!folder || isSubmitting}
          variant={folder ? 'primary' : 'default'}
        >
          {isSubmitting ? '전송 중...' : '전송'}
        </Modal.ConfirmButton>
      </Modal.Footer>
    </Modal>
  );
};

export default AddFolderModal;
