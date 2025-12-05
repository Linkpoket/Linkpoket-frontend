import { useState, useEffect } from 'react';
import Modal from '@/components/common-ui/Modal';
import { Textarea } from '@/components/common-ui/Textarea';

interface MemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMemo: string;
  onSave: (memo: string) => void;
  title: string;
}

export default function MemoModal({
  isOpen,
  onClose,
  initialMemo,
  onSave,
  title,
}: MemoModalProps) {
  const [memo, setMemo] = useState(initialMemo);

  useEffect(() => {
    setMemo(initialMemo);
  }, [initialMemo, isOpen]);

  const handleSave = () => {
    onSave(memo);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header showCloseButton>{title} 메모</Modal.Header>
      <Modal.Body>
        <Textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="메모를 입력하세요..."
          className="min-h-[120px] w-full resize-none"
        />
      </Modal.Body>
      <Modal.Footer>
        <Modal.CancelButton />
        <Modal.ConfirmButton onClick={handleSave} variant="primary">
          저장
        </Modal.ConfirmButton>
      </Modal.Footer>
    </Modal>
  );
}
