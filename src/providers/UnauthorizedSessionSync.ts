import { useEffect } from 'react';
import { setUnauthorizedHandler } from '@/services/http';
import { queryClient } from '@/providers/queryClient';
import { useAuthStore } from '@/stores/authStore';
import { useToastStore } from '@/stores/toastStore';

const UnauthorizedSessionSync = () => {
  const clearSession = useAuthStore(state => state.clearSession);
  const clearToasts = useToastStore(state => state.clearToasts);

  useEffect(() => {
    const handleUnauthorized = () => {
      queryClient.clear();
      clearToasts();
      clearSession();
    };

    setUnauthorizedHandler(handleUnauthorized);

    return () => {
      setUnauthorizedHandler(null);
    };
  }, [clearSession, clearToasts]);

  return null;
};

export { UnauthorizedSessionSync };
