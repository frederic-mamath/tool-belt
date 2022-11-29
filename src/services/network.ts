import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { enqueueSnackbar } from "notistack";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";

export const axiosClient = axios.create({
  withCredentials: true,
  baseURL: BACKEND_URL,
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const axiosError = error as AxiosError;

    if (!axiosError) {
      return;
    }

    if (!axiosError.response) return;

    if (401 === axiosError.response.status) {
      if (axiosError.config?.url?.match(/users\/me/gm)) {
        return;
      }

      enqueueSnackbar("Unauthorized", { variant: "error" });
      window.location.href = "/";
    }
  }
);

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = axios.CancelToken.source();
  const promise = axiosClient({ ...config, cancelToken: source.token }).then(
    (response) => {
      const { data } = response;

      return data
    }
  );

  // eslint-disable-next-line
  // @ts-ignore:external-dependencies
  promise.cancel = () => {
    source.cancel("Query was cancelled by React Query");
  };

  return promise;
};
