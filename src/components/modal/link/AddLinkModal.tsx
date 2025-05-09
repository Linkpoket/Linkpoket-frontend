import { useState } from 'react';
import { Input } from '@/components/common-ui/Input';
import Modal from '@/components/common-ui/Modal';
import { Textarea } from '@/components/common-ui/Textarea';

const AddLinkModal = ({
  isOpen,
  onClose,
  linkName,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  linkName: string;
  onSubmit: (link: string, url: string) => Promise<void>;
}) => {
  const [link, setLink] = useState('');
  const [url, setUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!link) return;

    setIsSubmitting(true);
    try {
      await onSubmit(link, url);
      setLink('');
      setUrl('');
      onClose();
    } catch (error) {
      console.error('링크 전송 오류:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header>링크 추가</Modal.Header>

      <Modal.Body className="py-4">
        <div className="space-y-4">
          <Input
            label={
              <>
                링크명<span className="text-status-danger">*</span>
              </>
            }
            placeholder="링크명을 입력해 주세요"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            isModal={true}
            inputSize="medium"
            containerClassName="w-full"
            labelClassName="font-bold leading-[140%]"
          />
          <Textarea
            label={
              <>
                URL<span className="text-status-danger">*</span>
              </>
            }
            placeholder="해당 링크의 URL을 입력해 주세요"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            isModal={true}
            containerClassName="w-full"
            labelClassName="font-bold leading-[140%]"
            className="h-[116px]"
          />
        </div>
      </Modal.Body>

      <Modal.Footer className="pt-0">
        <Modal.CancelButton
          onClick={() => {
            setLink('');
            setUrl('');
          }}
        />
        <Modal.ConfirmButton
          onClick={handleSubmit}
          disabled={!link || isSubmitting}
          variant={link ? 'primary' : 'default'}
        >
          {isSubmitting ? '전송 중...' : '전송'}
        </Modal.ConfirmButton>
      </Modal.Footer>
    </Modal>
  );
};

export default AddLinkModal;
