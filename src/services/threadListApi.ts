import { apiClient, type ApiResponse } from '@/services/http';
import type { InquiryStatusType } from '@/constants/inquiryStatus';

export type GetThreadListRequest = {
  cursor?: number;
  size?: number;
};

export type ThreadListResponse = {
  chatRoomId: number;
  counterpartName: string;
  studentName: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  status: InquiryStatusType;
  intentLabel: string;
};

export type ThreadListPageData = {
  content: ThreadListResponse[];
  size: number;
  nextCursor: number | null;
  hasNext: boolean;
};

export const threadListApi = {
  getThreadList: async ({ cursor, size = 20 }: GetThreadListRequest = {}) => {
    const response = await apiClient.get<ApiResponse<ThreadListPageData>>('/chat-rooms', {
      params: {
        cursor,
        size,
      },
    });

    return response.data.data;
  },
};
