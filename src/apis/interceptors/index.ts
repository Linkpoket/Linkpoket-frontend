import { AxiosInstance } from 'axios';
import { setupRequestInterceptor } from './requestInterceptor';
import { setupResponseInterceptor } from './responseInterceptor';

export const setupInterceptors = (instance: AxiosInstance) => {
  setupRequestInterceptor(instance);
  setupResponseInterceptor(instance);
};
