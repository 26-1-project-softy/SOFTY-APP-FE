import { create } from 'zustand';
import type { ActiveRole } from '@/services/auth/authApi';

export type AuthStatus = 'SIGNED_OUT' | 'SIGNUP_REQUIRED' | 'SIGNED_IN';

type AuthState = {
  authStatus: AuthStatus;
  accessToken: string | null;
  refreshToken: string | null;
  activeRole: ActiveRole | null;
  setSignedOut: () => void;
  setSignupRequired: (tokens: { accessToken: string; refreshToken: string }) => void;
  setSignedIn: (auth: {
    accessToken: string;
    refreshToken: string;
    activeRole: ActiveRole;
  }) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthState>(set => ({
  authStatus: 'SIGNED_OUT',
  accessToken: null,
  refreshToken: null,
  activeRole: null,

  setSignedOut: () =>
    set({
      authStatus: 'SIGNED_OUT',
      accessToken: null,
      refreshToken: null,
      activeRole: null,
    }),

  setSignupRequired: ({ accessToken, refreshToken }) =>
    set({
      authStatus: 'SIGNUP_REQUIRED',
      accessToken,
      refreshToken,
      activeRole: null,
    }),

  setSignedIn: ({ accessToken, refreshToken, activeRole }) =>
    set({
      authStatus: 'SIGNED_IN',
      accessToken,
      refreshToken,
      activeRole,
    }),

  clearSession: () =>
    set({
      authStatus: 'SIGNED_OUT',
      accessToken: null,
      refreshToken: null,
      activeRole: null,
    }),
}));
