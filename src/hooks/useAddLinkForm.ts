import { useState, useRef, useEffect } from 'react';
import { useCreateLink } from '@/hooks/mutations/useCreateLink';
import { usePreviewLink } from '@/hooks/mutations/usePreviewLink';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';
import toast from 'react-hot-toast';

export const useAddLinkForm = (isOpen: boolean, onClose: () => void) => {
  const LINK_NAME_MAX_LENGTH = 30;

  const [isFirstInput, setIsFirstInput] = useState<boolean>(true);
  const [linkUrl, setLinkUrl] = useState<string>('');
  const [linkName, setLinkName] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isPreviewing, setIsPreviewing] = useState<boolean>(false);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { pageId } = usePageStore();
  const { parentsFolderId } = useParentsFolderIdStore();

  const isValidUrl = (urlString: string) => {
    try {
      new URL(urlString);
      return true;
    } catch (error) {
      console.error('URL 유효성 검사 실패:', error);
      return false;
    }
  };

  const { mutate: createLinkMutate } = useCreateLink({
    onSuccess: () => {
      setLinkUrl('');
      setLinkName('');
      onClose();
      toast.success('링크를 추가했습니다.');
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : '링크 추가를 실패했습니다.'
      );
      console.error('링크 추가 실패:', error);
    },
  });

  const { mutate: previewLinkMutate } = usePreviewLink({
    onSuccess: (response) => {
      try {
        let title = response.data;

        // 빈 문자열이나 공백만 있는 경우
        if (!title || !title.trim()) {
          toast.error(
            '해당 링크의 제목을 가져올 수 없습니다. 직접 입력해주세요.'
          );
          setIsPreviewing(false);
          return;
        }

        if (title && title.length > LINK_NAME_MAX_LENGTH) {
          title = title.substring(0, LINK_NAME_MAX_LENGTH);
        }

        if (title && title.trim()) {
          setLinkName(title.trim());
        }
      } catch (error) {
        console.error('프리뷰 데이터 처리 실패:', error);
      }
      setIsPreviewing(false);
    },
    onError: (err) => {
      toast.error(
        err instanceof Error ? err.message : '링크명을 가져올 수 없습니다.'
      );
      console.error('링크 프리뷰 실패:', err);
      setIsPreviewing(false);
    },
  });

  const handleSubmit = async () => {
    if (!isValidUrl(linkUrl)) {
      toast.error('올바른 URL 형식을 입력해주세요.\n예: https://example.com');
      return;
    }

    setIsSubmitting(true);
    createLinkMutate(
      {
        linkUrl,
        linkName,
        folderId: parentsFolderId ?? '',
        description: '',
        baseRequest: { pageId, commandType: 'CREATE' },
      },
      { onSettled: () => setIsSubmitting(false) }
    );
  };

  const resetForm = () => {
    setLinkUrl('');
    setLinkName('');
  };

  // 디바운스 로직
  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    if (linkUrl && isValidUrl(linkUrl)) {
      setIsPreviewing(true);
      const delay = isFirstInput ? 0 : 400;

      if (delay === 0) {
        previewLinkMutate({
          baseRequest: { pageId, commandType: 'VIEW' },
          linkUrl,
        });
        setIsFirstInput(false);
      } else {
        debounceTimeoutRef.current = setTimeout(() => {
          previewLinkMutate({
            baseRequest: { pageId, commandType: 'VIEW' },
            linkUrl,
          });
        }, delay);
      }
    } else {
      setIsPreviewing(false);
    }

    // 클린업 함수 추가
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [linkUrl, previewLinkMutate, pageId]);

  // 모달 초기화 useEffect에도 isFirstInput 리셋 추가
  useEffect(() => {
    if (!isOpen) {
      resetForm();
      setIsPreviewing(false);
      setIsFirstInput(true); // 이 줄 추가!
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    }
  }, [isOpen]);

  return {
    // 상태
    linkUrl,
    linkName,
    isSubmitting,
    isPreviewing,
    LINK_NAME_MAX_LENGTH,

    // 액션
    setLinkUrl,
    setLinkName,
    handleSubmit,
    resetForm,

    // 계산된 값
    placeHolderTxt: isPreviewing
      ? '링크명 자동완성 중...'
      : '링크명을 입력해주세요',
    isSubmitDisabled: !linkUrl?.trim() || !linkName?.trim() || isSubmitting,
    submitButtonVariant: (linkUrl?.trim() && linkName?.trim()
      ? 'primary'
      : 'default') as 'primary' | 'default',
    submitButtonText: isSubmitting ? '추가 중...' : '추가',
  };
};
