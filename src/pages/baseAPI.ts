import { APIRequestContext } from "@playwright/test";
import { ApiResponseDTO } from "../dto/apiResponse.dto";

export class BaseAPI {
  constructor(
    protected request: APIRequestContext,
    protected baseUrl: string,
  ) {}

  protected async get<TRes>(
    endpoint: string,
    headers?: Record<string, string>
  ): Promise<ApiResponseDTO<TRes>> {
    const response = await this.request.get(`${this.baseUrl}${endpoint}`, {
      headers,
    });
    return {
      status: response.status(), // take response status codes
      headers: response.headers(), // give header from response
      body: (await response.json()) as TRes, // read body as json, is being object
    };
  }

  protected async post<TReq, TRes>(
    endpoint: string,
    data?: TReq,
    headers?: Record<string, string>
  ): Promise<ApiResponseDTO<TRes>> {
    const response = await this.request.post(`${this.baseUrl}${endpoint}`, {
      data,
      headers,
    });
    return {
      status: response.status(),
      headers: response.headers(),
      body: (await response.json()) as TRes,
    };
  }

  protected async put<TReq, TRes>(
    endpoint: string,
    data?: TReq,
    headers?: Record<string, string>
  ): Promise<ApiResponseDTO<TRes>> {
    const response = await this.request.put(`${this.baseUrl}${endpoint}`, {
      data,
      headers,
    });
    return {
      status: response.status(),
      headers: response.headers(),
      body: (await response.json()) as TRes,
    };
  }

  protected async patch<TReq, TRes>(
    endpoint: string,
    data?: TReq,
    headers?: Record<string, string>
  ): Promise<ApiResponseDTO<TRes>> {
    const response = await this.request.patch(`${this.baseUrl}${endpoint}`, {
      data,
      headers,
    });
    return {
      status: response.status(),
      headers: response.headers(),
      body: (await response.json()) as TRes,
    };
  }

  protected async delete<TRes>(
    endpoint: string,
    headers?: Record<string, string>
  ): Promise<ApiResponseDTO<TRes>> {
    const response = await this.request.delete(`${this.baseUrl}${endpoint}`, {
      headers,
    });
    const headerContentType = response.headers()["content-type"];
    let body: TRes | undefined = undefined;
    // parse if have json
    if (headerContentType && headerContentType.includes("application/json")) {
      body = await response.json();
    }

    return {
      status: response.status(),
      headers: response.headers(),
      body,
    };
  }
}
