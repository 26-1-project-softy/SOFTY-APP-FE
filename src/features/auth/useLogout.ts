import { useState } from 'react';
import { logout as logoutFromKakao } from '@react-native-seoul/kakao-login';
import { clearAccessToken } from '@/services/http';
import { queryClient } from '@/providers/queryClient';
import { getAuthErrorMessage } from '@/features/auth/getAuthErrorMessage';
import { useAuthStore } from '@/stores/authStore';
import { useToastStore } from '@/stores/toastStore';

const LOGOUT_SUCCESS_MESSAGE = '로그아웃되었어요.';
const LOGOUT_ERROR_MESSAGE = '카카오 로그아웃에 실패했어요.';
const MISSING_TOKEN_ERROR_MESSAGE = '로그아웃할 수 없는 상태예요.';

const getLogoutErrorMessage = (error: unknown) => {
  const message = getAuthErrorMessage(error, '');
  const normalizedMessage = message.toLowerCase();

  if (normalizedMessage.includes("tokens don't exist")) {
    return MISSING_TOKEN_ERROR_MESSAGE;
  }

  if (message) {
    return message;
  }

  return LOGOUT_ERROR_MESSAGE;
};

const useLocalSessionReset = () => {
  const clearSession = useAuthStore(state => state.clearSession);
  const clearToasts = useToastStore(state => state.clearToasts);

  const resetLocalSession = () => {
    clearAccessToken();
    queryClient.clear();
    clearToasts();
    clearSession();
  };

  return {
    resetLocalSession,
  };
};

export const useLogout = () => {
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);

  const { resetLocalSession } = useLocalSessionReset();
  const showToast = useToastStore(state => state.showToast);

  const handleLogout = async () => {
    if (isLogoutLoading) return;

    setIsLogoutLoading(true);

    let toastMessage = LOGOUT_SUCCESS_MESSAGE;
    let toastType: 'success' | 'error' = 'success';

    try {
      await logoutFromKakao();
    } catch (error) {
      toastMessage = getLogoutErrorMessage(error);
      toastType = 'error';

      if (__DEV__) {
        console.log('카카오 SDK 로그아웃 실패', error);
      }
    } finally {
      resetLocalSession();
      showToast(toastMessage, toastType);
      setIsLogoutLoading(false);
    }
  };

  return {
    isLogoutLoading,
    handleLogout,
  };
};
