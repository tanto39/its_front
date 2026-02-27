const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

class ApiClient {
  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    // Добавляем заголовки по умолчанию
    const headers = {
      "Content-Type": "application/json",
      Authorization: "",
      ...options.headers,
    };

    // Добавляем токен авторизации, если есть
    const token = localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
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
}

export const apiClient = new ApiClient();
