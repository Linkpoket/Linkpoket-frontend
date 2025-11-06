import { Input } from '@/components/common-ui/Input';
import Modal from '@/components/common-ui/Modal';
import { useAddLinkForm } from '@/hooks/useAddLinkForm';

const AddLinkModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const {
    linkUrl,
    linkName,
    isPreviewing,
    setLinkUrl,
    setLinkName,
    handleSubmit,
    resetForm,
    placeHolderTxt,
    LINK_NAME_MAX_LENGTH,
    isSubmitDisabled,
    submitButtonVariant,
    submitButtonText,
  } = useAddLinkForm(isOpen, onClose);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header showCloseButton>링크 추가</Modal.Header>

      <Modal.Body>
        <div className="space-y-4">
          <Input
            label="URL"
            placeholder="해당 링크의 URL을 입력해주세요."
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            isModal={true}
            containerClassName="w-full"
            labelClassName="leading-[140%]"
          />
          <Input
            label="링크명"
            placeholder={placeHolderTxt}
            value={linkName}
            onChange={(e) => setLinkName(e.target.value)}
            isModal={true}
            containerClassName="w-full"
            labelClassName="leading-[140%]"
            maxLength={LINK_NAME_MAX_LENGTH}
            disabled={isPreviewing}
          />
        </div>
      </Modal.Body>

      <Modal.Footer className="pt-0">
        <Modal.CancelButton onClick={resetForm} />
        <Modal.ConfirmButton
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
          variant={submitButtonVariant}
        >
          {submitButtonText}
        </Modal.ConfirmButton>
      </Modal.Footer>
    </Modal>
  );
};

export default AddLinkModal;
