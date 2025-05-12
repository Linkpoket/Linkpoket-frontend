import { create } from 'zustand';

interface UserState {
  nickname: string;
  email: string;
  colorCode: string;
  setUser: (nickname: string, email: string, colorCode: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  nickname: '',
  email: '',
  colorCode: '',
  setUser: (nickname: string, email: string, colorCode: string) =>
    set({ nickname, email, colorCode }),
}));
