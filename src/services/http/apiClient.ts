import axios from 'axios';

export interface ApiResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data: T;
}

const baseURL = (process.env.EXPO_PUBLIC_API_BASE_URL ?? '').replace(/\/+$/, '');

export const apiClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
