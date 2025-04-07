import { MESSAGES } from "#app/constants/messages";
import type { ApiResponse } from "#app/interface/ApiResponse";

export async function fetchWithCredential<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  body?: Record<string, unknown>
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const responseJson = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: responseJson.message || MESSAGES.API.REQUEST_FAILED,
      };
    }

    return {
      success: true,
      data: responseJson.data,
      message: responseJson.message || MESSAGES.API.SUCCESS,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || MESSAGES.API.ERROR_OCCURRED,
    };
  }
}
