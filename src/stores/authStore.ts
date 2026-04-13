import { create } from 'zustand';

type SessionState = {
  isAuthenticated: boolean;
  accessToken: string | null;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setAccessToken: (accessToken: string | null) => void;
  clearSession: () => void;
};

export const useAuthStore = create<SessionState>(set => ({
  isAuthenticated: false,
  accessToken: null,
  setAuthenticated: isAuthenticated => set({ isAuthenticated }),
  setAccessToken: accessToken => set({ accessToken }),
  clearSession: () => set({ isAuthenticated: false, accessToken: null }),
}));
