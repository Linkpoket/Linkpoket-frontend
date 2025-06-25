import { useState } from 'react';
import Modal from '@/components/common-ui/Modal';
import { Input } from '@/components/common-ui/Input';
import { Radio } from '@/components/common-ui/Radio';
import { cn } from '@/utils/cn';
import { useCreateSharedPage } from '@/hooks/mutations/useCreateSharedPage';

interface AddSharedPageProps {
  isOpen: boolean;
  onClose: () => void;
}

const gradeOptions = [
  { label: '베이직(5명)', value: 'BASIC' },
  { label: '스탠다드(10명)', value: 'STANDARD' },
  { label: '프리미엄(20명)', value: 'PREMIUM' },
];

export default function AddSharedPageModal({
  isOpen,
  onClose,
}: AddSharedPageProps) {
  const [pageName, setPageName] = useState('');
  const [description, setDescription] = useState('');
  const [grade, setGrade] = useState('');
  const [error, setError] = useState('');

  const isInValid = error;
  const isDisabled = false;
  const isConfirmDisabled = !pageName || !grade;

  const createSharedPageMutation = useCreateSharedPage({
    onSuccess: () => {
      setPageName('');
      setDescription('');
      setGrade('');
      setError('');
      onClose();
    },
    onError: (error) => {
      setError('공유 페이지 생성에 실패했습니다.');
    },
  });

  const handleCreateSharedPage = () => {
    if (!pageName) {
      setError('페이지명을 입력해 주세요');
      return;
    }
    if (!grade) {
      setError('공유 페이지 등급을 선택해 주세요');
      return;
    }
    setError('');
    createSharedPageMutation.mutate({
      pageTitle: pageName,
      pageDescription: description,
      pageType: grade,
    });
  };

  // Input.tsx의 inputVariants와 동일한 스타일 적용
  const textareaClass = cn(
    'w-full px-4 py-3 bg-white border rounded-lg transition-all focus:outline-none focus:ring-2',
    isInValid
      ? 'border-status-danger focus:ring-status-danger focus:border-status-danger text-status-danger'
      : 'border-gray-30 focus:ring-primary-30 focus:border-primary-40',
    isDisabled && 'bg-gray-10 text-gray-50 border-gray-30 cursor-not-allowed',
    'text-base',
    'modal'
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="p-[24px]">
      <Modal.Header className="text-[22px] font-bold">
        새 공유 페이지 생성
      </Modal.Header>
      <Modal.Body>
        {error && (
          <div className="text-status-danger mb-2 text-center text-[15px] font-semibold">
            <span>❗</span> {error}
          </div>
        )}
        <div className="flex flex-col gap-6">
          <div>
            <Input
              label={
                <span className="mb-[8px] font-bold">
                  페이지명<span className="text-status-danger">*</span>
                </span>
              }
              placeholder="페이지명을 입력해 주세요"
              value={pageName}
              onChange={(e) => setPageName(e.target.value)}
              variant={error && !pageName ? 'error' : 'default'}
              isModal
            />
          </div>
          <div>
            <label className="mb-[8px] block font-bold">설명</label>
            <textarea
              className={textareaClass}
              placeholder="페이지에 대한 설명을 입력해 주세요"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isDisabled}
              style={{ minHeight: 96 }}
            />
          </div>
          <div>
            <div className="mb-2 text-[16px] font-bold">
              공유 페이지 등급(멤버 초대 가능 수)
              <span className="text-status-danger">*</span>
            </div>
            <div className="flex gap-6">
              {gradeOptions.map((opt) => (
                <Radio
                  key={opt.value}
                  name="grade"
                  value={opt.value}
                  label={opt.label}
                  checked={grade === opt.value}
                  onChange={() => setGrade(opt.value)}
                  isModal
                />
              ))}
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Modal.CancelButton
          onClick={onClose}
          className="border-gray-30 px-[16px] font-bold"
        />
        <Modal.ConfirmButton
          onClick={handleCreateSharedPage}
          className={cn(
            'px-[16px] font-bold',
            isConfirmDisabled && 'bg-gray-20 cursor-not-allowed text-gray-50'
          )}
          disabled={isConfirmDisabled}
        >
          {createSharedPageMutation.isPending ? '생성 중...' : '생성'}
        </Modal.ConfirmButton>
      </Modal.Footer>
    </Modal>
  );
}
