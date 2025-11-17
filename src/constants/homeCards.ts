// /home 페이지 카드 정보 공유 파일

export interface FolderInfo {
  folderId: string;
  folderTitle: string;
}

export interface HomeCard {
  id: string;
  title: string;
  category: string;
  tags: string[];
  interestedCount: number;
  backgroundImage: string;
  isPopular?: boolean;
  folders?: FolderInfo[];
  pageId?: string;
  isSharedPage?: boolean;
}

// 기본 카드들 (개인 페이지, 북마크)
export const baseCards: HomeCard[] = [
  {
    id: 'space-travel',
    title: '개인 페이지',
    category: 'space',
    tags: ['personal', 'space', 'collection'],
    interestedCount: 5,
    backgroundImage:
      'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=600&fit=crop',
    isPopular: true,
  },
  {
    id: 'ocean-life',
    title: '북마크',
    category: 'marine',
    tags: ['bookmark'],
    interestedCount: 12,
    backgroundImage:
      'https://i.pinimg.com/736x/36/8a/10/368a106795ce2a83a451e98387ac4611.jpg',
  },
];

// 기본 공유 페이지 이미지 URL
export const DEFAULT_SHARED_PAGE_IMAGE =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop';
