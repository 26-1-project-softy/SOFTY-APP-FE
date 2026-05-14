import { useQuery } from '@tanstack/react-query';
import { getInquiryIntentByLabel } from '@/features/newInquiry/utils/getInquiryIntentByLabel';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { threadDetailApi } from '@/services/threadDetailApi';

export const useThreadDetail = (chatRoomId: number) => {
  const threadDetailQuery = useQuery({
    queryKey: QUERY_KEYS.threadDetail(chatRoomId),
    queryFn: () => threadDetailApi.getDetail(chatRoomId),
  });

  const threadDetail = threadDetailQuery.data
    ? {
        chatRoomId: threadDetailQuery.data.chatRoomId,
        teacherName: threadDetailQuery.data.counterpartName,
        studentName: threadDetailQuery.data.studentName,
        intent: getInquiryIntentByLabel(threadDetailQuery.data.intentLabel),
        status: threadDetailQuery.data.status,
      }
    : null;

  return {
    threadDetail,
    isThreadDetailLoading: threadDetailQuery.isLoading,
    isThreadDetailRefreshing: threadDetailQuery.isRefetching,
    isThreadDetailError: threadDetailQuery.isError,
    refetchThreadDetail: threadDetailQuery.refetch,
  };
};
