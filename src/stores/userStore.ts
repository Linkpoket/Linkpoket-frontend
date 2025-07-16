import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  nickname: string;
  email: string;
  colorCode: string;
  setUser: (nickname: string, email: string, colorCode: string) => void;
  setColorCode: (colorCode: string) => void;
  setNickname: (nickname: string) => void;
  clearUser: () => void;
  isLoggedIn: boolean;
}

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      nickname: '',
      email: '',
      colorCode: '',
      isLoggedIn: false,
      setUser: (nickname: string, email: string, colorCode: string) =>
        set({ nickname, email, colorCode, isLoggedIn: true }),
      setColorCode: (colorCode: string) => set({ colorCode }),
      setNickname: (nickname: string) => set({ nickname }),
      clearUser: () =>
        set({
          nickname: '',
          email: '',
          colorCode: '',
          isLoggedIn: false,
        }),
    }),
    {
      name: 'user-store',
    }
  )
);
