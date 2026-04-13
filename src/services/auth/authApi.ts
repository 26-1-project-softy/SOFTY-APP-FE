import { apiClient, type ApiResponse } from '@/services/http';

export interface KakaoTokenLoginRequest {
  kakaoAccessToken: string;
}

export interface KakaoTokenLoginData {
  accessToken: string;
  refreshToken: string;
}

export const authApi = {
  loginWithKakaoToken: async (payload: KakaoTokenLoginRequest) => {
    const response = await apiClient.post<ApiResponse<KakaoTokenLoginData>>(
      '/auth/kakao/token-login',
      payload
    );

    return response.data.data;
  },
};
