import { apiClient, type ApiResponse } from '@/services/http';

export interface ParentSignupRequest {
  parentName: string;
  studentName: string;
  studentBirthday: string;
  studentGender: string;
  classCode: string;
}

export type ParentRole = 'PARENT';

export interface ParentSignupData {
  userId: number;
  role: ParentRole;
}

export const signupApi = {
  signupParent: async (payload: ParentSignupRequest) => {
    const response = await apiClient.post<ApiResponse<ParentSignupData>>(
      '/auth/parents/signup',
      payload
    );

    return response.data.data;
  },
};
