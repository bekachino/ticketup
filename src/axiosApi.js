import axios from 'axios';
import { apiUrl } from "./constants";

export const addInterceptors = (store) => {
  axiosApi.interceptors.request.use((config) => {
    const { url } = config;
    const isSignIn = url?.includes("/login");
    if (!isSignIn) {
      const token = store.getState().userState.user;
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
