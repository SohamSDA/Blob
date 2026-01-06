import { create } from 'zustand';
import { saveToken, getToken, deleteToken, saveUser, getUser, deleteUser } from '@/utils/secureStorage';

export interface User {
  id: string;
  name: string;
  email: string;
  image: string | null;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: true,

  login: async (token: string, user: User) => {
    await saveToken(token);
    await saveUser(user);
    set({ isAuthenticated: true, user });
  },

  logout: async () => {
    await deleteToken();
    await deleteUser();
    set({ isAuthenticated: false, user: null });
  },

  initialize: async () => {
    const token = await getToken();
    const user = await getUser();
    set({ isAuthenticated: !!token, user, isLoading: false });
  },
}));
