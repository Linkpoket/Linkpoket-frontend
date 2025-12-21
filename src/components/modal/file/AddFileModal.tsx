import { useState, useRef } from 'react';
import Modal from '@/components/common-ui/Modal';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';
import { useFolderColorStore } from '@/stores/folderColorStore';
import toast from 'react-hot-toast';
import { uploadFile } from '@/apis/file-apis/uploadFile';
import { useQueryClient } from '@tanstack/react-query';

const AddFileModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { pageId } = usePageStore();
  const { parentsFolderId } = useParentsFolderIdStore();
  const { getCurrentColor } = useFolderColorStore();
  const currentFolderColor = getCurrentColor();
  const queryClient = useQueryClient();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !pageId) {
      toast.error('파일을 선택해주세요.');
      return;
    }

    setIsUploading(true);
    try {
      await uploadFile({
        file: selectedFile,
        pageId,
        commandType: 'CREATE',
        folderId: parentsFolderId || undefined,
      });

      // 파일 업로드 후 저장 용량 업데이트를 위해 userInfo 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: ['userInfo'],
      });

      // 파일 목록 자동 새로고침을 위한 쿼리 무효화
      if (parentsFolderId) {
        // 폴더 내 파일 목록 무효화
        queryClient.invalidateQueries({
          queryKey: ['files', pageId, parentsFolderId],
        });
        queryClient.invalidateQueries({
          queryKey: ['folderDetails', pageId, parentsFolderId],
        });
      }
      // 페이지 전체 파일 목록 무효화
      queryClient.invalidateQueries({
        queryKey: ['files', pageId],
      });
      queryClient.invalidateQueries({
        queryKey: ['folderDetails', pageId],
      });
      queryClient.invalidateQueries({
        queryKey: ['personalPage'],
      });
      queryClient.invalidateQueries({
        queryKey: ['sharedPage', pageId],
      });

      toast.success('파일 업로드에 성공했습니다.');
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      onClose();
    } catch (error) {
      toast.error('파일 업로드에 실패했습니다.');
      console.error('파일 업로드 에러:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel}>
      <Modal.Header showCloseButton>파일 추가</Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="file-upload"
              className="text-gray-90 mb-2 block text-sm font-medium"
            >
              파일 선택
            </label>
            <input
              id="file-upload"
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="border-gray-30 hover:border-gray-40 w-full rounded-lg border-2 border-dashed p-6 text-center transition-colors"
              style={{
                borderColor: selectedFile
                  ? currentFolderColor.previewColor
                  : undefined,
              }}
            >
              {selectedFile ? (
                <div className="flex flex-col items-center gap-2">
                  <svg
                    className="h-12 w-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{ color: currentFolderColor.previewColor }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="text-gray-90 text-sm font-medium">
                    {selectedFile.name}
                  </span>
                  <span className="text-xs text-gray-50">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <svg
                    className="text-gray-40 h-12 w-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <span className="text-sm text-gray-50">
                    파일을 선택하거나 드래그하여 업로드
                  </span>
                </div>
              )}
            </button>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="pt-0">
        <Modal.CancelButton onClick={handleCancel} disabled={isUploading} />
        <Modal.ConfirmButton
          onClick={handleUpload}
          disabled={!selectedFile || isUploading}
          variant={selectedFile ? 'primary' : 'default'}
          customColor={
            selectedFile ? currentFolderColor.previewColor : undefined
          }
        >
          {isUploading ? '업로드 중...' : '업로드'}
        </Modal.ConfirmButton>
      </Modal.Footer>
    </Modal>
  );
};

export default AddFileModal;
