import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { authApi } from '@/services/auth/authApi';

export const useMe = () => {
  const meQuery = useQuery({
    queryKey: QUERY_KEYS.me,
    queryFn: () => authApi.getMe(),
  });

  return {
    me: meQuery.data ?? null,
    isMeLoading: meQuery.isLoading,
    isMeError: meQuery.isError,
    refetchMe: meQuery.refetch,
  };
};
