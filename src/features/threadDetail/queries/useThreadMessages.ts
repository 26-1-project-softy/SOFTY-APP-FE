import { useCallback, useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { formatChatMessageDateTime } from '@/utils/formatDateTime';
import type { ThreadMessageItem } from '@/features/threadDetail/types';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { threadDetailApi } from '@/services/threadDetailApi';

const THREAD_MESSAGE_PAGE_SIZE = 30;

export const useThreadMessages = (chatRoomId: number) => {
  const threadMessagesQuery = useInfiniteQuery({
    queryKey: QUERY_KEYS.threadMessages(chatRoomId),
    queryFn: ({ pageParam }) =>
      threadDetailApi.getMessages({
        chatRoomId,
        cursor: pageParam,
        size: THREAD_MESSAGE_PAGE_SIZE,
      }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: lastPage =>
      lastPage.hasNext && lastPage.nextCursor !== null ? lastPage.nextCursor : undefined,
  });

  const messages: ThreadMessageItem[] = useMemo(() => {
    if (!threadMessagesQuery.data) return [];

    return threadMessagesQuery.data.pages.flatMap(page =>
      page.messages.map(message => ({
        messageId: message.messageId,
        isMine: message.isMine,
        senderName: message.senderName,
        content: message.content,
        createdAt: formatChatMessageDateTime(message.createdAt),
        isUnreadByCounterpart: message.isUnreadByCounterpart,
      }))
    );
  }, [threadMessagesQuery.data]);

  const handleFetchNextPage = useCallback(() => {
    if (!threadMessagesQuery.hasNextPage || threadMessagesQuery.isFetchingNextPage) return;

    void threadMessagesQuery.fetchNextPage();
  }, [
    threadMessagesQuery.hasNextPage,
    threadMessagesQuery.isFetchingNextPage,
    threadMessagesQuery.fetchNextPage,
  ]);

  return {
    messages,
    isThreadMessagesLoading: threadMessagesQuery.isLoading,
    isThreadMessagesRefreshing: threadMessagesQuery.isRefetching,
    isThreadMessagesError: threadMessagesQuery.isError,
    isFetchingNextMessages: threadMessagesQuery.isFetchingNextPage,
    refetchThreadMessages: threadMessagesQuery.refetch,
    handleFetchNextPage,
  };
};
