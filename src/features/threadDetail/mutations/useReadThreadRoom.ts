import { useMutation } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { queryClient } from '@/providers/queryClient';
import { threadDetailApi } from '@/services/threadDetailApi';

export const useReadThreadRoom = (chatRoomId: number) => {
  const readThreadRoomMutation = useMutation({
    mutationFn: () => threadDetailApi.readRoom(chatRoomId),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.threadList,
      });
    },
  });

  return {
    readThreadRoom: readThreadRoomMutation.mutateAsync,
  };
};
