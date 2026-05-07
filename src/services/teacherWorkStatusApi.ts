import { apiClient, type ApiResponse } from '@/services/http';

export type TeacherWorkStatusData = {
  isInWorkingHours: boolean;
};

export const teacherWorkStatusApi = {
  getStatus: async () => {
    const response = await apiClient.get<ApiResponse<TeacherWorkStatusData>>(
      '/chat-rooms/working-hours'
    );

    return response.data.data;
  },
};
