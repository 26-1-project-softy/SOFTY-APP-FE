import { useMutation } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { queryClient } from '@/providers/queryClient';
import { threadDetailApi } from '@/services/threadDetailApi';

export const useSendThreadMessage = (chatRoomId: number) => {
  const sendThreadMessageMutation = useMutation({
    mutationFn: (content: string) =>
      threadDetailApi.sendMessage({
        chatRoomId,
        content,
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.threadMessages(chatRoomId),
      });

      void queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.threadList,
      });
    },
  });

  return {
    sendThreadMessage: sendThreadMessageMutation.mutateAsync,
    isSendingThreadMessage: sendThreadMessageMutation.isPending,
  };
};
