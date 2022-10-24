import axios from 'axios';
import env from '../consts/private/env';
import { createParamsSerializer, joinUrls } from '../utils/private/axiosShared';
import { handleConfig, handleSuccess, handleFailure } from '../utils/private/axiosHandlers';
import { defineGetters } from '../utils/private/globalProperty';

export const http = axios.create({
  baseURL: joinUrls(env.VITE_HTTP_ORIGIN, env.VITE_HTTP_API_VERSION_PREFIX),
  timeout: env.VITE_HTTP_TIMEOUT,
  withCredentials: true,
  transitional: {
    clarifyTimeoutError: true,
  },
  paramsSerializer: createParamsSerializer(),
});

http.interceptors.request.use(
  handleConfig,
);

http.interceptors.response.use(
  handleSuccess,
  handleFailure,
);

export default {
  install(app) {
    defineGetters(app, { http });
  },
};
