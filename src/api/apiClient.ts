import { API_BASE_URL } from "../constants";

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
  contentType?: string | false;
}

class ApiClient {
  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    // Добавляем заголовки по умолчанию
    const headers: Record<string, string> = {
      ...options.headers,
    };

    // Добавляем токен авторизации, если есть
    const token = localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    if (options.contentType !== false && !headers["Content-Type"]) {
      headers["Content-Type"] = "application/json";
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        let errTxt = `Ошибка! status: ${response.status} ${data.error}`;

        if (data.data) {
          data.data.errors.forEach((error: string) => {
            errTxt = errTxt + ", " + error;
          });
        }

        throw new Error(errTxt);
      }

      return data;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }

  async postFormData<T>(endpoint: string, formData: FormData): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: formData,
      contentType: false, // браузер сам выставит правильный Content-Type
    });
  }

  async putFormData<T>(endpoint: string, formData: FormData): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: formData,
      contentType: false,
    });
  }
}

export const apiClient = new ApiClient();
