import React from 'react';

interface ErrorStateProps {
  message?: string;
  subMessage?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = '데이터를 불러올 수 없습니다.',
  subMessage = '잠시 후 다시 시도해주세요.',
}) => (
  <div className="flex h-screen items-center justify-center">
    <div className="text-center">
      <p className="mb-2 text-red-500">{message}</p>
      <p className="text-sm text-gray-500">{subMessage}</p>
    </div>
  </div>
);
