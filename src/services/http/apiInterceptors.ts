import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { apiClient } from './apiClient';

let accessToken = '';
let isApiInterceptorsSetup = false;

export const setAccessToken = (token: string) => {
  accessToken = token;
};

export const clearAccessToken = () => {
  accessToken = '';
};

const handleRequest = (config: InternalAxiosRequestConfig) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
};

const handleRequestError = (error: AxiosError) => {
  return Promise.reject(error);
};

const handleResponse = <T>(response: T) => {
  return response;
};

const handleResponseError = (error: AxiosError) => {
  // TODO: 추후 401 공통 처리, refresh token 재발급 로직 연결
  return Promise.reject(error);
};

export const setupApiInterceptors = () => {
  if (isApiInterceptorsSetup) return;

  apiClient.interceptors.request.use(handleRequest, handleRequestError);
  apiClient.interceptors.response.use(handleResponse, handleResponseError);

  isApiInterceptorsSetup = true;
};
