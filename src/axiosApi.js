import axios from 'axios';
import { apiUrl } from './constants';

export const addInterceptors = (store) => {
  axiosApi.interceptors.request.use((config) => {
    const { url } = config;
    const isSignIn = url?.includes('/login');
    if (!isSignIn) {
      // const token = store.getState().userState.user.token;
      // const token = "4b65aa807f2432e29edd75943625c544002596e8"; //supervizer
      const token = "42a538b5d55b8568e1f224eff3b9f4ec141a92b5"; //admin
      const headers = config.headers;
      headers.set('Authorization', `Token ${token}`);
    }
    return config;
  });
};

const axiosApi = axios.create({
  baseURL: apiUrl,
});

export default axiosApi;
