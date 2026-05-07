import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { ApiResponse } from './apiClient';
import { apiClient } from './apiClient';
import { useAuthStore } from '@/stores/authStore';

export interface ApiError<T = unknown> {
  httpStatus?: number;
  code?: number;
  message: string;
  data?: T;
  originalError?: unknown;
}

let isApiInterceptorsSetup = false;
let unauthorizedHandler: (() => void) | null = null;

export const setUnauthorizedHandler = (handler: (() => void) | null) => {
  unauthorizedHandler = handler;
};

const createApiError = <T>({
  httpStatus,
  code,
  message,
  data,
  originalError,
}: ApiError<T>): ApiError<T> => {
  return {
    httpStatus,
    code,
    message,
    data,
    originalError,
  };
};

const handleRequest = (config: InternalAxiosRequestConfig) => {
  const accessToken = useAuthStore.getState().accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
};

const handleRequestError = (error: AxiosError) => {
  return Promise.reject(
    createApiError({
      httpStatus: error.response?.status,
      message: '요청 설정 중 오류가 발생했습니다.',
      originalError: error,
    })
  );
};

const handleResponse = <T>(response: AxiosResponse<ApiResponse<T>>) => {
  if (!response.data.success) {
    return Promise.reject(
      createApiError({
        httpStatus: response.status,
        code: response.data.code,
        message: response.data.message,
        data: response.data.data,
      })
    );
  }

  return response;
};

const handleResponseError = (error: AxiosError<ApiResponse<unknown>>) => {
  const responseData = error.response?.data;
  const httpStatus = error.response?.status;

  if (httpStatus === 401) {
    unauthorizedHandler?.();
  }

  return Promise.reject(
    createApiError({
      httpStatus,
      code: responseData?.code ?? httpStatus,
      message: responseData?.message ?? '요청 처리 중 오류가 발생했습니다.',
      data: responseData?.data,
      originalError: error,
    })
  );
};

export const setupApiInterceptors = () => {
  if (isApiInterceptorsSetup) return;

  apiClient.interceptors.request.use(handleRequest, handleRequestError);
  apiClient.interceptors.response.use(handleResponse, handleResponseError);

  isApiInterceptorsSetup = true;
};
