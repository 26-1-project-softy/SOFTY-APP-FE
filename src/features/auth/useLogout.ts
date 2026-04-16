import { useMutation } from '@tanstack/react-query';
import { logout as logoutFromKakao } from '@react-native-seoul/kakao-login';
import { clearAccessToken } from '@/services/http';
import { queryClient } from '@/providers/queryClient';
import { useAuthStore } from '@/stores/authStore';
import { useToastStore } from '@/stores/toastStore';

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
  const { resetLocalSession } = useLocalSessionReset();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      try {
        await logoutFromKakao();
      } catch (error) {
        if (__DEV__) {
          console.log('카카오 SDK 로그아웃 실패', error);
        }
      } finally {
        resetLocalSession();
      }
    },
  });

  const handleLogout = async () => {
    if (logoutMutation.isPending) return;

    await logoutMutation.mutateAsync();
  };

  return {
    isLogoutLoading: logoutMutation.isPending,
    handleLogout,
  };
};
