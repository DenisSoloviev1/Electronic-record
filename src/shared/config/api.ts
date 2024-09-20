import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import notification from '@/shared/config/error-notification.ts';
import { basePath } from '@/shared/config/params.ts';

import {
  AuthApi,
  DepartmentsApi,
  RequestsApi,
  TypesOfRequestsApi,
  UsersApi,
} from '@/oapi/main';

type InterceptorType = 'request' | 'response';
type InterceptorId = number;

type Interceptor = {
  type: InterceptorType;
  id: InterceptorId;
};

class Api {
  instance: AxiosInstance;
  private interceptors: Interceptor[] = [];

  usersApi: UsersApi;
  authApi: AuthApi;
  departmentsApi: DepartmentsApi;
  requestsApi: RequestsApi;
  typesOfRequestsApi: TypesOfRequestsApi;

  constructor(basePath: string) {
    this.instance = axios.create({
      baseURL: basePath,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    this.typesOfRequestsApi = new TypesOfRequestsApi(
      undefined,
      basePath,
      this.instance,
    );
    this.usersApi = new UsersApi(undefined, basePath, this.instance);
    this.authApi = new AuthApi(undefined, basePath, this.instance);
    this.requestsApi = new RequestsApi(undefined, basePath, this.instance);
    this.departmentsApi = new DepartmentsApi(
      undefined,
      basePath,
      this.instance,
    );
  }

  setRequestInterceptors(
    success?: (
      value: InternalAxiosRequestConfig,
    ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>,
    error?: (error_: unknown) => unknown,
  ) {
    const id = this.instance.interceptors.request.use(success, error);
    this.interceptors.push({ type: 'request', id });
    return id;
  }

  setResponseInterceptors(
    success?: (value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>,
    error?: (error_: unknown) => unknown,
  ) {
    const id = this.instance.interceptors.response.use(success, error);
    this.interceptors.push({ type: 'response', id });
    return id;
  }

  private setResponseEject({ type, id }: Interceptor): void {
    this.instance.interceptors[type].eject(id);
  }

  clearInterceptors(): void {
    this.interceptors.forEach((interceptor) => {
      this.setResponseEject(interceptor);
    });
  }

  public async get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    try {
      return await this.instance.get<T>(url, { ...config, method: 'GET' });
    } catch (err) {
      const message = (err as AxiosError<{ message: string }>).response?.data
        .message;

      notification(`Error while fetching ${url}. ${message ?? ''}`, 'error');

      throw err;
    }
  }

  public async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    try {
      return await this.instance.post<T>(url, data, {
        ...config,
        method: 'POST',
      });
    } catch (err) {
      const message = (err as AxiosError<{ message: string }>).response?.data
        .message;

      notification(`Error while fetching ${url}. ${message ?? ''}`, 'error');

      throw err;
    }
  }

  public async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    try {
      return await this.instance.put<T>(url, data, {
        ...config,
        method: 'PUT',
      });
    } catch (err) {
      const message = (err as AxiosError<{ message: string }>).response?.data
        .message;

      notification(`Error while fetching ${url}. ${message ?? ''}`, 'error');

      throw err;
    }
  }

  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    try {
      return await this.instance.delete<T>(url, {
        ...config,
        method: 'DELETE',
      });
    } catch (err) {
      const message = (err as AxiosError<{ message: string }>).response?.data
        .message;

      notification(`Error while fetching ${url}. ${message ?? ''}`, 'error');

      throw err;
    }
  }
}

export const api = new Api(basePath);
