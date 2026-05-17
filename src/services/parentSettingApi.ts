import { apiClient, type ApiResponse } from '@/services/http';

export type TeacherSchedule = {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
};

export type ParentSettingData = {
  grade: number;
  classNumber: number;
  studentName: string;
  teacherName: string;
  schedules: TeacherSchedule[];
};

export type PreviewClassChangeRequest = {
  classCode: string;
};

export type PreviewClassChangeData = {
  classCode: string;
  schoolName: string;
  grade: number;
  classNumber: number;
};

export type ChangeClassRequest = {
  classCode: string;
};

export type ChangeClassData = {
  schoolName: string;
  grade: number;
  classNumber: number;
};

export const parentSettingApi = {
  getSetting: async () => {
    const response = await apiClient.get<ApiResponse<ParentSettingData>>('/parent/setting');

    return response.data.data;
  },

  previewClassChange: async (payload: PreviewClassChangeRequest) => {
    const response = await apiClient.post<ApiResponse<PreviewClassChangeData>>(
      '/parent/me/class/preview',
      payload
    );

    return response.data.data;
  },

  changeClass: async (payload: ChangeClassRequest) => {
    const response = await apiClient.patch<ApiResponse<ChangeClassData>>(
      '/parent/me/class',
      payload
    );

    return response.data.data;
  },
};
