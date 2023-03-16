export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  data?: any;
}

const BASE_URL = process.env.NEXT_PUBLIC_URL ?? 'https://api.escuelajs.co/api/v1/products#';

interface IApi {
  get<T>(url: string, params?: any): Promise<ApiResponse<T>>;
  post<T>(url: string, data?: any): Promise<ApiResponse<T>>;
  put<T>(url: string, data?: any): Promise<ApiResponse<T>>;
  delete<T>(url: string, data?: any): Promise<ApiResponse<T>>;
  patch<T>(url: string, data?: any): Promise<ApiResponse<T>>;
  setToken(token: string): void;
}

export default class Api implements IApi {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
  }

  async get<T>(url: string, params?: any): Promise<ApiResponse<T>> {
    const urlWithParams = params ? `${url}?${new URLSearchParams(params)}` : url;
    return this.request<T>(urlWithParams, HttpMethod.GET);
  }

  async post<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(url, HttpMethod.POST, data);
  }

  async put<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(url, HttpMethod.PUT, data);
  }

  async delete<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(url, HttpMethod.DELETE, data);
  }

  async patch<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(url, HttpMethod.PATCH, data);
  }

  private async request<T>(
    url: string,
    method: HttpMethod,
    data?: any  
  ): Promise<ApiResponse<T>> {
    const init: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      credentials: 'include',
    };

    if (data) {
      init.body = JSON.stringify(data);
    }

    const response = await fetch(`${BASE_URL}${url}`, init);
    return await response.json();
  }
}