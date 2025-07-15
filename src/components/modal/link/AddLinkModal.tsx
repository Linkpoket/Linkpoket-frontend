import { useState } from 'react';
import { Input } from '@/components/common-ui/Input';
import Modal from '@/components/common-ui/Modal';
import { useCreateLink } from '@/hooks/mutations/useCreateLink';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';
import { useModalStore } from '@/stores/modalStore';

const AddLinkModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [linkUrl, setLinkUrl] = useState<string>('');
  const [linkName, setLinkName] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { pageId } = usePageStore();
  const { parentsFolderId } = useParentsFolderIdStore();
  const { openErrorModal } = useModalStore();

  const { mutate: createLinkMutate } = useCreateLink({
    onSuccess: () => {
      setLinkUrl('');
      setLinkName('');
      onClose();
    },
    onError: (err) => {
      console.error('링크 생성 실패:', err);
      // TODO: 사용자에게 에러 메시지 보여주기
      openErrorModal();
    },
  });

  const isValidUrl = (urlString: string) => {
    try {
      new URL(urlString);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!linkUrl) return;

    if (!isValidUrl(linkUrl)) {
      console.error('유효하지 않은 URL 형식입니다.');
      return;
    }

    setIsSubmitting(true);
    createLinkMutate(
      {
        linkUrl,
        linkName,
        directoryId: parentsFolderId ?? '',
        baseRequest: {
          pageId,
          commandType: 'CREATE',
        },
      },
      {
        onSettled: () => {
          setIsSubmitting(false);
        },
      }
    );
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header showCloseButton>링크 추가</Modal.Header>

      <Modal.Body>
        <div className="space-y-4">
          <Input
            label={'URL'}
            placeholder="해당 링크의 URL을 입력해주세요."
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            isModal={true}
            containerClassName="w-full"
            labelClassName="leading-[140%]"
          />
          <Input
            label={'링크명'}
            placeholder="링크명을 입력해 주세요"
            value={linkName}
            onChange={(e) => setLinkName(e.target.value)}
            isModal={true}
            containerClassName="w-full"
            labelClassName="leading-[140%]"
          />
        </div>
      </Modal.Body>

      <Modal.Footer className="pt-0">
        <Modal.CancelButton
          onClick={() => {
            setLinkUrl('');
            setLinkName('');
          }}
        />
        <Modal.ConfirmButton
          onClick={handleSubmit}
          disabled={!linkUrl || isSubmitting}
          variant={linkUrl ? 'primary' : 'default'}
        >
          {isSubmitting ? '추가 중...' : '추가'}
        </Modal.ConfirmButton>
      </Modal.Footer>
    </Modal>
  );
};

export default AddLinkModal;
