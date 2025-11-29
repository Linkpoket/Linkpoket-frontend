import fetchFolderDetails from '@/apis/folder-apis/fetchFolderDetails';
import { FolderDetailsProps } from '@/types/folders';
import { useQuery } from '@tanstack/react-query';

// folderId가 없을 때 반환할 빈 데이터
const emptyFolderDetails = {
  folderDetailResponses: [],
  linkDetailResponses: [],
  targetFolderId: '',
  targetFolderName: '',
  targetFolderDepth: 0,
  folderCount: 0,
  linkCount: 0,
};

export default function useFetchFolderDetails(data: FolderDetailsProps) {
  const enabled = !!data.folderId && !!data.pageId;

  return useQuery({
    queryKey: ['folderDetails', data.pageId, data.folderId],
    queryFn: () => fetchFolderDetails(data),
    select: (response) => response.data,
    enabled,
    // 초기 렌더링 시 빈 데이터를 표시하여 깜빡임 방지
    placeholderData: { data: emptyFolderDetails },
    // staleTime을 설정하여 불필요한 재요청 방지
    staleTime: 1000 * 60 * 5, // 5분
  });
}
