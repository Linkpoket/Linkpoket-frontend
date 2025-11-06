export interface FolderColorOption {
  id: string;
  name: string;
  gradient: string;
  previewColor: string;
}

export const FOLDER_COLOR_OPTIONS: FolderColorOption[] = [
  {
    id: 'Orange',
    name: '주황색',
    gradient:
      'linear-gradient(180deg, rgba(255,216,106,0.85) 0%, rgba(255,194,51,0.82) 45%, rgba(255,179,26,0.8) 100%)',
    previewColor: '#FFB31A',
  },
  {
    id: 'Blue',
    name: '푸른색',
    gradient:
      'linear-gradient(180deg, rgba(147,197,253,0.85) 0%, rgba(96,165,250,0.82) 45%, rgba(59,130,246,0.8) 100%)',
    previewColor: '#3B82F6',
  },
  {
    id: 'Gray',
    name: '회색',
    gradient:
      'linear-gradient(180deg, rgba(156,163,175,0.85) 0%, rgba(107,114,128,0.82) 45%, rgba(75,85,99,0.8) 100%)',
    previewColor: '#4B5563',
  },
];
