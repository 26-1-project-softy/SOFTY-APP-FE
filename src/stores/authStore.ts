import { create } from 'zustand';

export type AuthStatus = 'SIGNED_OUT' | 'SIGNUP_REQUIRED' | 'SIGNED_IN';

type AuthState = {
  authStatus: AuthStatus;
  accessToken: string | null;
  refreshToken: string | null;
  setSignedOut: () => void;
  setSignupRequired: (tokens: { accessToken: string; refreshToken: string }) => void;
  setSignedIn: (tokens: { accessToken: string; refreshToken: string }) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthState>(set => ({
  authStatus: 'SIGNED_OUT',
  accessToken: null,
  refreshToken: null,

  setSignedOut: () =>
    set({
      authStatus: 'SIGNED_OUT',
      accessToken: null,
      refreshToken: null,
    }),

  setSignupRequired: ({ accessToken, refreshToken }) =>
    set({
      authStatus: 'SIGNUP_REQUIRED',
      accessToken,
      refreshToken,
    }),

  setSignedIn: ({ accessToken, refreshToken }) =>
    set({
      authStatus: 'SIGNED_IN',
      accessToken,
      refreshToken,
    }),

  clearSession: () =>
    set({
      authStatus: 'SIGNED_OUT',
      accessToken: null,
      refreshToken: null,
    }),
}));
