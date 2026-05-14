import { apiClient, type ApiResponse } from '@/services/http';
import type { InquiryStatusType } from '@/constants/inquiryStatus';

export type GetThreadMessagesRequest = {
  chatRoomId: number;
  cursor?: number;
  size?: number;
};

export type SendThreadMessageRequest = {
  chatRoomId: number;
  content: string;
};

export type ThreadDetailData = {
  chatRoomId: number;
  counterpartName: string;
  studentName: string;
  intentLabel: string;
  status: InquiryStatusType;
};

export type ThreadMessageResponse = {
  messageId: number;
  isMine: boolean;
  senderName: string;
  senderRole: string;
  content: string;
  createdAt: string;
  isUnreadByCounterpart: boolean;
};

export type ThreadMessagesPageData = {
  chatRoomId: number;
  messages: ThreadMessageResponse[];
  nextCursor: number | null;
  hasNext: boolean;
};

export type SendThreadMessageData = {
  messageId: number;
  roomId: number;
  content: string;
  createdAt: string;
};

export type ReadThreadRoomData = {
  chatRoomId: number;
  unreadCount: number;
  lastReadAt: string;
};

export const threadDetailApi = {
  getDetail: async (chatRoomId: number) => {
    const response = await apiClient.get<ApiResponse<ThreadDetailData>>(
      `/chat-rooms/${chatRoomId}`
    );

    return response.data.data;
  },

  getMessages: async ({ chatRoomId, cursor, size = 30 }: GetThreadMessagesRequest) => {
    const response = await apiClient.get<ApiResponse<ThreadMessagesPageData>>(
      `/chat-rooms/${chatRoomId}/messages`,
      {
        params: {
          cursor,
          size,
        },
      }
    );

    return response.data.data;
  },

  sendMessage: async ({ chatRoomId, content }: SendThreadMessageRequest) => {
    const response = await apiClient.post<ApiResponse<SendThreadMessageData>>(
      `/chat-rooms/${chatRoomId}/messages`,
      {
        content,
      }
    );

    return response.data.data;
  },

  readRoom: async (chatRoomId: number) => {
    const response = await apiClient.post<ApiResponse<ReadThreadRoomData>>(
      `/chat-rooms/${chatRoomId}/read`
    );

    return response.data.data;
  },
};
