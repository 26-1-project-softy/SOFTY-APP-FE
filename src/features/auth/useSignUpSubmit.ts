import { useMutation } from '@tanstack/react-query';
import { authApi, type SignUpRequest } from '@/services/auth/authApi';
import type { ApiError } from '@/services/http';
import { useAuthStore } from '@/stores/authStore';
import { useToastStore } from '@/stores/toastStore';
import { getAuthErrorMessage } from '@/features/auth/getAuthErrorMessage';

const SIGN_UP_ERROR_MESSAGE = '학급 참여 중 오류가 발생했어요. 다시 시도해 주세요.';
const INVALID_CLASS_CODE_MESSAGE = '존재하지 않는 학급이에요. 학급 코드를 다시 확인해 주세요.';

const getSignUpErrorMessage = (error: unknown) => {
  const apiError = error as ApiError | undefined;
  const httpStatus = apiError?.httpStatus;
  const code = apiError?.code;
  const message = apiError?.message?.trim() ?? '';

  if (httpStatus === 404 || code === 404) {
    return INVALID_CLASS_CODE_MESSAGE;
  }

  if (code === 313) {
    return INVALID_CLASS_CODE_MESSAGE;
  }

  if (httpStatus === 422 || code === 422) {
    return INVALID_CLASS_CODE_MESSAGE;
  }

  if (message) {
    return message;
  }

  return getAuthErrorMessage(error, SIGN_UP_ERROR_MESSAGE);
};

export const useSignUpSubmit = () => {
  const accessToken = useAuthStore(state => state.accessToken);
  const refreshToken = useAuthStore(state => state.refreshToken);
  const setSignedIn = useAuthStore(state => state.setSignedIn);
  const showToast = useToastStore(state => state.showToast);

  const signUpMutation = useMutation({
    mutationFn: (payload: SignUpRequest) => authApi.signUpParent(payload),
  });

  const handlePressSignUp = async (payload: SignUpRequest) => {
    if (signUpMutation.isPending) return;

    if (!accessToken || !refreshToken) {
      showToast('인증 정보가 없어요. 다시 로그인해 주세요.', 'error');
      return;
    }

    try {
      await signUpMutation.mutateAsync(payload);

      setSignedIn({
        accessToken,
        refreshToken,
      });
    } catch (error) {
      showToast(getSignUpErrorMessage(error), 'error');

      if (__DEV__) {
        console.log('학급 참여 실패', error);
      }
    }
  };

  return {
    isSignUpSubmitting: signUpMutation.isPending,
    handlePressSignUp,
  };
};
