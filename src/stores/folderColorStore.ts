import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  FOLDER_COLOR_OPTIONS,
  FolderColorOption,
} from '@/constants/folderColor';

interface FolderColorState {
  selectedColorId: string;
  setSelectedColorId: (colorId: string) => void;
  getCurrentColor: () => FolderColorOption;
}

export const useFolderColorStore = create<FolderColorState>()(
  persist(
    (set, get) => ({
      selectedColorId: 'Orange',

      setSelectedColorId: (colorId: string) =>
        set({ selectedColorId: colorId }),

      getCurrentColor: () => {
        const { selectedColorId } = get();
        return (
          FOLDER_COLOR_OPTIONS.find(
            (option) => option.id === selectedColorId
          ) || FOLDER_COLOR_OPTIONS[0]
        );
      },
    }),
    {
      name: 'folder-color-store',
    }
  )
);
