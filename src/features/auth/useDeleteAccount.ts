import { useMutation } from '@tanstack/react-query';
import { clearAccessToken } from '@/services/http';
import { queryClient } from '@/providers/queryClient';
import { authApi } from '@/services/auth/authApi';
import { getAuthErrorMessage } from '@/features/auth/getAuthErrorMessage';
import { useAuthStore } from '@/stores/authStore';
import { useToastStore } from '@/stores/toastStore';

const DELETE_ACCOUNT_ERROR_MESSAGE = '회원 탈퇴 중 오류가 발생했어요. 다시 시도해 주세요.';

const useResetAuthSession = () => {
  const clearSession = useAuthStore(state => state.clearSession);
  const clearToasts = useToastStore(state => state.clearToasts);

  const resetAuthSession = () => {
    clearAccessToken();
    queryClient.clear();
    clearToasts();
    clearSession();
  };

  return {
    resetAuthSession,
  };
};

export const useDeleteAccount = () => {
  const { resetAuthSession } = useResetAuthSession();
  const showToast = useToastStore(state => state.showToast);

  const deleteAccountMutation = useMutation({
    mutationFn: authApi.deleteAccount,
  });

  const handleDeleteAccount = async () => {
    if (deleteAccountMutation.isPending) {
      return false;
    }

    try {
      await deleteAccountMutation.mutateAsync();
      resetAuthSession();

      return true;
    } catch (error) {
      showToast(getAuthErrorMessage(error, DELETE_ACCOUNT_ERROR_MESSAGE), 'error');

      if (__DEV__) {
        console.log('회원 탈퇴 실패', error);
      }

      return false;
    }
  };

  return {
    isDeleteAccountLoading: deleteAccountMutation.isPending,
    handleDeleteAccount,
  };
};
