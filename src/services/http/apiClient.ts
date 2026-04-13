import axios from 'axios';

export interface ApiResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data: T;
}

export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL ?? '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
