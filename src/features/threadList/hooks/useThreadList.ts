import { useInfiniteQuery } from '@tanstack/react-query';
import { mapThreadListResponse } from '@/features/threadList/utils/mapThreadListResponse';
import type { InquiryIntentType } from '@/constants/inquiryIntent';
import type { InquiryStatusType } from '@/constants/inquiryStatus';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { threadListApi } from '@/services/threadListApi';

const THREAD_LIST_PAGE_SIZE = 20;

export type ThreadListItem = {
  chatRoomId: number;
  intent: InquiryIntentType;
  status: InquiryStatusType;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
};

export const useThreadList = () => {
  const threadListQuery = useInfiniteQuery({
    queryKey: QUERY_KEYS.threadList,
    queryFn: ({ pageParam }) =>
      threadListApi.getThreadList({
        cursor: pageParam,
        size: THREAD_LIST_PAGE_SIZE,
      }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: lastPage =>
      lastPage.hasNext && lastPage.nextCursor !== null ? lastPage.nextCursor : undefined,
  });

  const threadList: ThreadListItem[] = threadListQuery.data
    ? threadListQuery.data.pages.flatMap(page => page.content.map(mapThreadListResponse))
    : [];

  const handleFetchNextPage = () => {
    if (!threadListQuery.hasNextPage || threadListQuery.isFetchingNextPage) return;

    void threadListQuery.fetchNextPage();
  };

  return {
    threadList,
    isThreadListLoading: threadListQuery.isLoading,
    isThreadListRefreshing: threadListQuery.isRefetching,
    isThreadListError: threadListQuery.isError,
    isFetchingNextPage: threadListQuery.isFetchingNextPage,
    refetchThreadList: threadListQuery.refetch,
    handleFetchNextPage,
  };
};
