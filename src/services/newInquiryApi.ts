import { apiClient, type ApiResponse } from '@/services/http';

export type AnalyzeInitialInquiryRequest = {
  content: string;
};

export type AnalyzeInitialInquiryData = {
  intentLabel: string;
};

export type SendInitialInquiryRequest = {
  content: string;
  intentLabel: string;
};

export type SendInitialInquiryData = {
  chatRoomId: number;
  messageId: number;
};

export const newInquiryApi = {
  analyzeInitialInquiry: async (payload: AnalyzeInitialInquiryRequest) => {
    const response = await apiClient.post<ApiResponse<AnalyzeInitialInquiryData>>(
      '/chat-rooms/init-messages',
      payload
    );

    return response.data.data;
  },

  sendInitialInquiry: async (payload: SendInitialInquiryRequest) => {
    const response = await apiClient.post<ApiResponse<SendInitialInquiryData>>(
      '/chat-rooms/init-messages/send',
      payload
    );

    return response.data.data;
  },
};
