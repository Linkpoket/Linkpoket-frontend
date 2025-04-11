import React, { createContext, useContext, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

// 모달 컨텍스트 생성
const ModalContext = createContext<{
  isOpen: boolean;
  onClose: () => void;
}>({
  isOpen: false,
  onClose: () => {},
});

// 기본 모달 컴포넌트
const Modal = ({
  children,
  isOpen,
  onClose,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('click', handleClick, true); // 캡처링 단계에서 이벤트 처리 (true파라미터)

    return () => document.removeEventListener('click', handleClick, true);
  }, [onClose]);

  if (!isOpen) return null;

  return createPortal(
    <ModalContext.Provider value={{ isOpen, onClose }}>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center ">
        <div
          className="bg-white rounded-lg overflow-hidden max-w-[700px] w-full max-h-[90vh] flex flex-col p-[36px]"
          ref={modalRef}
        >
          {children}
        </div>
      </div>
    </ModalContext.Provider>,
    document.body
  );
};

// 헤더 컴포넌트
const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="border-b border-[var(--color-gray-40)] pb-4">
      <h2 className="font-bold text-[28px] text-[var-(--color-gray-100)]">
        {children}
      </h2>
    </div>
  );
};

// 본문 컴포넌트
const Body = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex-1 py-8">{children}</div>;
};

// 푸터 컴포넌트
const Footer = ({ children }: { children: React.ReactNode }) => {
  return <div className="pt-4 flex justify-end space-x-2">{children}</div>;
};

// 확인 버튼 컴포넌트
const ConfirmButton = ({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'danger' | 'default';
}) => {
  const variantClasses = {
    primary: 'bg-[var(--color-primary-50)] text-[var(--color-primary-0)]',
    danger: 'bg-[var(--color-status-danger)] text-[var(--color-primary-0)]',
    default: 'bg-[var(--color-gray-20)] text-[var(--color-gray-50)]',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-5 py-3 rounded-lg ${variantClasses[variant]}`}
    >
      {children}
    </button>
  );
};

// 취소 버튼 컴포넌트
const CancelButton = ({ onClick }: { onClick: () => void }) => {
  const { onClose } = useContext(ModalContext);

  return (
    <button
      onClick={() => {
        onClick?.();
        onClose();
      }}
      className="px-5 py-3 rounded-lg border border-[var(--color-gray-20)]"
    >
      취소
    </button>
  );
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;
Modal.ConfirmButton = ConfirmButton;
Modal.CancelButton = CancelButton;

export default Modal;
