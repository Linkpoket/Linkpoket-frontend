import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';
import ModalClose from '@assets/common-ui-assets/ModalClose.svg?react';

// 모달 컨텍스트 생성
const ModalContext = createContext<{
  isOpen: boolean;
  onClose: () => void;
}>({
  isOpen: false,
  onClose: () => {},
});

// 기본 모달 컴포넌트
const BaseModal = forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    className?: string;
    showCloseButton?: boolean;
  }
>(({ children, isOpen, onClose, className }, ref) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // ✅ onClose 안정화
  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  useImperativeHandle(ref, () => modalRef.current!, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-ignore-outside-click]')) return;
      if (modalRef.current && !modalRef.current.contains(target)) {
        handleClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };

    document.addEventListener('click', handleClick, true);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClose]);

  if (!isOpen) return null;

  return createPortal(
    <ModalContext.Provider value={{ isOpen, onClose }}>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
        <div
          className={cn(
            'relative flex w-full max-w-[70%] flex-col overflow-hidden rounded-2xl bg-white p-[24px] md:max-w-[530px]',
            className
          )}
          ref={modalRef}
          data-ignore-outside-click
        >
          {children}
        </div>
      </div>
    </ModalContext.Provider>,
    document.body
  );
});

// 헤더 컴포넌트
const Header = ({
  children,
  className,
  showCloseButton = false,
}: {
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
}) => {
  const { onClose } = useContext(ModalContext);

  return (
    <div
      className={cn(
        `flex items-center ${showCloseButton ? 'justify-between' : 'justify-center'} text-[18px] font-bold text-[var(--color-gray-100)]`,
        className
      )}
    >
      <div className={`${showCloseButton || 'w-full'}`}>{children}</div>
      {showCloseButton && (
        <button
          onClick={onClose}
          className="cursor-pointer"
          aria-label="모달 닫기"
        >
          <ModalClose />
        </button>
      )}
    </div>
  );
};

// 본문 컴포넌트
const Body = ({
  children,
  className,
  hasFooter = true,
}: {
  children: React.ReactNode;
  className?: string;
  hasFooter?: boolean;
}) => {
  return (
    <div className={cn(`flex-1 ${hasFooter ? 'py-6' : 'pt-6'}`, className)}>
      {children}
    </div>
  );
};

// 푸터 컴포넌트
const Footer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('flex justify-end space-x-2 pt-4', className)}>
      {children}
    </div>
  );
};

// 확인 버튼 컴포넌트
const ConfirmButton = ({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  className,
  customColor,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'danger' | 'default' | 'check';
  className?: string;
  customColor?: string;
}) => {
  const variantClasses = {
    primary: 'bg-[var(--color-primary-50)] text-[var(--color-primary-0)]',
    danger: 'bg-[var(--color-status-danger)] text-[var(--color-primary-0)]',
    default: 'bg-[var(--color-gray-20)] text-[var(--color-gray-50)]',
    check: 'bg-none text-gray-90 border border-gray-30',
  };

  const customStyle =
    customColor && variant === 'primary'
      ? { backgroundColor: customColor, color: 'white' }
      : {};

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={customStyle}
      className={cn(
        `cursor-pointer rounded-lg px-5 py-3 ${!customColor ? variantClasses[variant] : ''}`,
        className
      )}
    >
      {children}
    </button>
  );
};

// 취소 버튼 컴포넌트
const CancelButton = ({
  onClick,
  className,
  disabled = false,
}: {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}) => {
  const { onClose } = useContext(ModalContext);

  return (
    <button
      disabled={disabled}
      onClick={() => {
        onClick?.();
        onClose();
      }}
      className={cn(
        'cursor-pointer rounded-lg border border-[var(--color-gray-20)] px-5 py-3',
        className
      )}
    >
      취소
    </button>
  );
};

const Modal = Object.assign(BaseModal, {
  Header,
  Body,
  Footer,
  ConfirmButton,
  CancelButton,
});

export default Modal;
