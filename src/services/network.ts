import axios, { AxiosRequestConfig } from 'axios'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || ''

export const axiosClient = axios.create({
  withCredentials: true,
  baseURL: BACKEND_URL,
})

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = axios.CancelToken.source()
  const promise = axiosClient({ ...config, cancelToken: source.token }).then(({ data }) => data)

  // eslint-disable-next-line
  // @ts-ignore:external-dependencies
  promise.cancel = () => {
    source.cancel('Query was cancelled by React Query')
  }

  return promise
}
