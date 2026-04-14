import { apiClient, type ApiResponse } from '@/services/http';

export interface KakaoLoginRequest {
  kakaoAccessToken: string;
}

export interface KakaoLoginData {
  accessToken: string;
  refreshToken: string;
  registrationRequired: boolean;
}

export const authApi = {
  loginWithKakaoToken: async (payload: KakaoLoginRequest) => {
    const response = await apiClient.post<ApiResponse<KakaoLoginData>>(
      '/auth/kakao/login',
      payload
    );

    return response.data.data;
  },
};
