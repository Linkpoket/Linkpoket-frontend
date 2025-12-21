import { useQuery } from '@tanstack/react-query';
import {
  fetchFilesByPageId,
  fetchFilesByFolderId,
} from '@/apis/file-apis/fetchFiles';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';
import { FileResponse } from '@/types/files';

interface FileListSectionProps {
  pageId: string;
  folderId?: string;
}

export default function FileListSection({
  pageId,
  folderId,
}: FileListSectionProps) {
  const {
    data: files,
    isLoading,
    error,
  } = useQuery<FileResponse[]>({
    queryKey: ['files', pageId, folderId],
    queryFn: () => {
      if (folderId) {
        return fetchFilesByFolderId({
          pageId,
          folderId,
          commandType: 'VIEW',
          sortType: 'BASIC',
        });
      } else {
        return fetchFilesByPageId(pageId, 'VIEW', 'BASIC');
      }
    },
    enabled: !!pageId,
  });

  if (isLoading) {
    return (
      <div className="border-gray-20 mb-4 rounded-lg border bg-white p-4">
        <p className="text-gray-50">파일 목록을 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border-red-20 bg-red-5 mb-4 rounded-lg border p-4">
        <p className="text-red-60">파일 목록을 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  if (!files || files.length === 0) {
    return (
      <div className="border-gray-20 mb-4 rounded-lg border bg-white p-4">
        <p className="text-gray-50">파일이 없습니다.</p>
      </div>
    );
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="border-gray-20 mb-4 rounded-lg border bg-white p-4">
      <h3 className="text-gray-90 mb-3 text-base font-semibold">
        파일 목록 ({files.length})
      </h3>
      <div className="space-y-2">
        {files.map((file) => (
          <div
            key={file.fileId}
            className="border-gray-20 bg-gray-5 hover:bg-gray-10 flex items-center justify-between rounded-lg border p-3"
          >
            <div className="flex flex-1 items-center gap-3">
              <div className="bg-gray-20 flex h-10 w-10 items-center justify-center rounded">
                <span className="text-gray-60 text-xs">
                  {file.fileName.split('.').pop()?.toUpperCase() || 'FILE'}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-gray-90 text-sm font-medium">
                  {file.fileName}
                </p>
                <p className="text-xs text-gray-50">
                  {formatFileSize(file.fileSize)} · {file.createdDate}
                </p>
              </div>
            </div>
            <a
              href={file.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-60 hover:bg-blue-5 rounded px-3 py-1.5 text-sm"
            >
              다운로드
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
