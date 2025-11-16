import { useState } from 'react';
import { Input } from '@/components/common-ui/Input';
import Modal from '@/components/common-ui/Modal';
import { useCreateFolder } from '@/hooks/mutations/useCreateFolder';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';
import { useFolderColorStore } from '@/stores/folderColorStore';
import toast from 'react-hot-toast';

interface AddFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddFolderModal({
  isOpen,
  onClose,
}: AddFolderModalProps) {
  const [folderName, setFolderName] = useState('');
  const [folderDescription, setFolderDescription] = useState('');
  const [error, setError] = useState('');
  const { pageId } = usePageStore();
  const { parentsFolderId } = useParentsFolderIdStore();
  const { getCurrentColor } = useFolderColorStore();
  const currentFolderColor = getCurrentColor();

  const isConfirmDisabled = !folderName;

  const createFolderMutation = useCreateFolder(pageId, {
    onSuccess: () => {
      setFolderName('');
      setFolderDescription('');
      setError('');
      onClose();
      toast.success('폴더 생성에 성공했습니다.');
    },
    onError: () => {
      toast.error('폴더 생성에 실패했습니다.');
      setError('폴더 생성에 실패했습니다.');
    },
  });

  const handleCreateFolder = () => {
    if (!folderName) {
      setError('폴더명을 입력해 주세요');
      return;
    }
    setError('');

    const requestBody = {
      baseRequest: {
        pageId,
        commandType: 'CREATE',
      },
      folderName,
      parentFolderId: parentsFolderId ?? '',
      folderDescription,
    };
    createFolderMutation.mutate(requestBody);
  };

  const inputClass = 'w-full';

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header showCloseButton>폴더 추가</Modal.Header>
      <Modal.Body hasFooter>
        {error && (
          <div className="text-status-danger mb-2 text-center text-[15px] font-semibold">
            <span>❗</span> {error}
          </div>
        )}
        <div>
          <div className="space-y-4">
            <Input
              label="폴더명"
              placeholder="폴더명을 입력해 주세요"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              isModal
              containerClassName={inputClass}
              labelClassName="font-bold leading-[140%]"
              variant={error && !folderName ? 'error' : 'default'}
              focusColor={currentFolderColor.previewColor}
            />
            <Input
              label="설명"
              placeholder="폴더에 대한 설명을 입력해 주세요"
              value={folderDescription}
              onChange={(e) => setFolderDescription(e.target.value)}
              isModal
              containerClassName={inputClass}
              labelClassName="font-bold leading-[140%]"
              focusColor={currentFolderColor.previewColor}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="pt-0">
        <Modal.CancelButton
          onClick={() => {
            setFolderName('');
            setFolderDescription('');
            setError('');
            onClose();
          }}
        />
        <Modal.ConfirmButton
          onClick={handleCreateFolder}
          disabled={isConfirmDisabled || createFolderMutation.isPending}
          variant={folderName ? 'primary' : 'default'}
          customColor={folderName ? currentFolderColor.previewColor : undefined}
        >
          {createFolderMutation.isPending ? '전송 중...' : '전송'}
        </Modal.ConfirmButton>
      </Modal.Footer>
    </Modal>
  );
}
