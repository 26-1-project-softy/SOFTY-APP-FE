import { apiClient, type ApiResponse } from '@/services/http';

export interface KakaoLoginRequest {
  kakaoAccessToken: string;
}

export interface KakaoLoginData {
  accessToken: string;
  refreshToken: string;
  registrationRequired: boolean;
}

export type Gender = 'M' | 'F';

export interface SignUpRequest {
  parentName: string;
  studentName: string;
  studentBirthday: string;
  studentGender: Gender;
  classCode: string;
}

export interface SignUpData {
  userId: number;
  role: string;
}

export const authApi = {
  loginWithKakaoToken: async (payload: KakaoLoginRequest) => {
    const response = await apiClient.post<ApiResponse<KakaoLoginData>>(
      '/auth/kakao/login',
      payload
    );

    return response.data.data;
  },

  signUpParent: async (payload: SignUpRequest) => {
    const response = await apiClient.post<ApiResponse<SignUpData>>('/auth/parents/signup', payload);

    return response.data.data;
  },
};
