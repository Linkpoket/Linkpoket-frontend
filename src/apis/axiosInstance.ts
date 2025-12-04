import axios from 'axios';
import { setupInterceptors } from './interceptors';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// 모든 interceptor 등록
setupInterceptors(axiosInstance);
