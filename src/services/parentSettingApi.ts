import { apiClient, type ApiResponse } from '@/services/http';

export type TimeValue = {
  hour: number;
  minute: number;
  second: number;
  nano: number;
};

export type TeacherSchedule = {
  dayOfWeek: number;
  startTime: TimeValue;
  endTime: TimeValue;
};

export type ParentSettingData = {
  grade: number;
  classNumber: number;
  studentName: string;
  teacherName: string;
  schedules: TeacherSchedule[];
};

export const parentSettingApi = {
  getSetting: async () => {
    const response = await apiClient.get<ApiResponse<ParentSettingData>>('/parent/setting');

    return response.data.data;
  },
};
