import { useMutation } from '@tanstack/react-query';
import { useResetAuthSession } from '@/features/auth/useResetAuthSession';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { authApi } from '@/services/auth/authApi';
import { useToastStore } from '@/stores/toastStore';

const DELETE_ACCOUNT_ERROR_MESSAGE = '회원 탈퇴 중 오류가 발생했어요. 다시 시도해 주세요.';

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
      showToast(getErrorMessage(error, DELETE_ACCOUNT_ERROR_MESSAGE), 'error');

      return false;
    }
  };

  return {
    isDeleteAccountLoading: deleteAccountMutation.isPending,
    handleDeleteAccount,
  };
};
