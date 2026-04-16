import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { login } from '@react-native-seoul/kakao-login';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '@/types/navigation';
import { setAccessToken as setHttpAccessToken } from '@/services/http';
import { getAuthErrorMessage } from '@/features/auth/getAuthErrorMessage';
import { authApi } from '@/services/auth/authApi';
import { useAuthStore } from '@/stores/authStore';
import { useToastStore } from '@/stores/toastStore';
import { AUTH_ROUTES } from '@/navigation/routes';

type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

const KAKAO_LOGIN_ERROR_MESSAGE = '카카오 로그인 중 오류가 발생했어요. 다시 시도해 주세요.';

const getKakaoLoginErrorMessage = (error: unknown): string | null => {
  const message = getAuthErrorMessage(error, '');
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
  const navigation = useNavigation<AuthNavigationProp>();
  const [isKakaoLoginLoading, setIsKakaoLoginLoading] = useState(false);

  const setSignupRequired = useAuthStore(state => state.setSignupRequired);
  const setSignedIn = useAuthStore(state => state.setSignedIn);
  const showToast = useToastStore(state => state.showToast);

  const handleKakaoLogin = async () => {
    if (isKakaoLoginLoading) return;

    setIsKakaoLoginLoading(true);

    try {
      const kakaoToken = await login();

      const loginData = await authApi.loginWithKakaoToken({
        kakaoAccessToken: kakaoToken.accessToken,
      });

      setHttpAccessToken(loginData.accessToken);

      if (loginData.registrationRequired) {
        setSignupRequired({
          accessToken: loginData.accessToken,
          refreshToken: loginData.refreshToken,
        });

        navigation.replace(AUTH_ROUTES.SIGNUP);
        return;
      }

      setSignedIn({
        accessToken: loginData.accessToken,
        refreshToken: loginData.refreshToken,
      });
    } catch (error) {
      const toastMessage = getKakaoLoginErrorMessage(error);

      if (toastMessage) {
        showToast(toastMessage, 'error');
      }

      if (__DEV__) {
        console.log('카카오 로그인 실패', error);
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
