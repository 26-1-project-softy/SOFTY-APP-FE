import { queryClient } from '@/providers/queryClient';
import { useAuthStore } from '@/stores/authStore';
import { useToastStore } from '@/stores/toastStore';

export const useResetAuthSession = () => {
  const clearSession = useAuthStore(state => state.clearSession);
  const clearToasts = useToastStore(state => state.clearToasts);

  const resetAuthSession = () => {
    queryClient.clear();
    clearToasts();
    clearSession();
  };

  return {
    resetAuthSession,
  };
};
