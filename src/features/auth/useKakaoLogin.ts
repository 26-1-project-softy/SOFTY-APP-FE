import { useState } from 'react';
import { login } from '@react-native-seoul/kakao-login';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { authApi } from '@/services/auth/authApi';
import { useAuthStore } from '@/stores/authStore';
import { useToastStore } from '@/stores/toastStore';

const KAKAO_LOGIN_ERROR_MESSAGE = '카카오 로그인 중 오류가 발생했어요. 다시 시도해 주세요.';
const NOT_PARENT_ROLE_MESSAGE = '학부모 계정으로만 이용할 수 있어요.';

const getKakaoLoginErrorMessage = (error: unknown): string | null => {
  const message = getErrorMessage(error, '');
  const normalizedMessage = message.toLowerCase();

  if (normalizedMessage.includes('cancel')) {
    return null;
  }

  if (normalizedMessage.includes('network')) {
    return '네트워크 연결을 확인한 뒤 다시 시도해 주세요.';
  }

  if (message) {
    return message;
  }

  return KAKAO_LOGIN_ERROR_MESSAGE;
};

export const useKakaoLogin = () => {
  const [isKakaoLoginLoading, setIsKakaoLoginLoading] = useState(false);

  const setSignupRequired = useAuthStore(state => state.setSignupRequired);
  const setSignedIn = useAuthStore(state => state.setSignedIn);
  const clearSession = useAuthStore(state => state.clearSession);
  const showToast = useToastStore(state => state.showToast);

  const handleKakaoLogin = async () => {
    if (isKakaoLoginLoading) return;

    setIsKakaoLoginLoading(true);

    try {
      const kakaoToken = await login();

      const loginData = await authApi.loginWithKakaoToken({
        kakaoAccessToken: kakaoToken.accessToken,
      });

      if (loginData.registrationRequired) {
        setSignupRequired({
          accessToken: loginData.accessToken,
          refreshToken: loginData.refreshToken,
        });

        return;
      }

      const me = await authApi.getMe(loginData.accessToken);

      if (me.activeRole !== 'PARENT') {
        clearSession();
        showToast(NOT_PARENT_ROLE_MESSAGE, 'error');
        return;
      }

      setSignedIn({
        accessToken: loginData.accessToken,
        refreshToken: loginData.refreshToken,
        activeRole: me.activeRole,
      });
    } catch (error) {
      const toastMessage = getKakaoLoginErrorMessage(error);

      if (toastMessage) {
        showToast(toastMessage, 'error');
      }
    } finally {
      setIsKakaoLoginLoading(false);
    }
  };

  return {
    isKakaoLoginLoading,
    handleKakaoLogin,
  };
};
