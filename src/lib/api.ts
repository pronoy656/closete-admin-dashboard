// API Client for Closeté Ops Admin Dashboard
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("admin_access_token") || localStorage.getItem("token");
}

export function setAuthToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem("admin_access_token", token);
  localStorage.setItem("token", token);
  document.cookie = `admin_token=${token}; path=/; max-age=86400; SameSite=Lax`;
}

export function clearAuthToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("admin_access_token");
  localStorage.removeItem("token");
  document.cookie = "admin_token=; path=/; max-age=0";
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data?: T; message?: string; error?: any }> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const url = endpoint.startsWith("http")
      ? endpoint
      : `${API_BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

    const res = await fetch(url, {
      ...options,
      headers,
    });

    const json = await res.json();
    if (!res.ok) {
      return {
        success: false,
        message: json.message || "Request failed",
        error: json,
      };
    }

    return {
      success: true,
      data: json.data !== undefined ? json.data : json,
      message: json.message,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Network error. Make sure the backend server is running.",
      error,
    };
  }
}

export const adminApi = {
  // Auth
  login: async (email: string, password: string) => {
    return request<{ accessToken: string; user: any }>("/auth/admin/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  // Products / Moderation
  getPendingProducts: async () => {
    return request<any[]>("/products/admin/pending-review");
  },

  approveProduct: async (id: string, data: any) => {
    return request<any>(`/products/admin/${id}/approve`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  rejectProduct: async (id: string, reason: string) => {
    return request<any>(`/products/admin/${id}/reject`, {
      method: "PATCH",
      body: JSON.stringify({ reason }),
    });
  },

  // Orders
  getAllOrders: async () => {
    return request<any[]>("/orders/admin/all");
  },

  updateOrderStatus: async (
    orderId: string,
    status: string,
    note?: string,
    requestedOutcome?: string
  ) => {
    return request<any>(`/orders/${orderId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status, note, requestedOutcome }),
    });
  },

  updateSchedule: async (orderId: string, schedule: any) => {
    return request<any>(`/orders/${orderId}/schedule`, {
      method: "PATCH",
      body: JSON.stringify(schedule),
    });
  },

  releasePayout: async (orderId: string) => {
    return request<any>(`/orders/${orderId}/payout`, {
      method: "PATCH",
    });
  },

  // Issues
  getIssues: async () => {
    return request<any[]>("/issues");
  },

  getIssueById: async (id: string) => {
    return request<any>(`/issues/${id}`);
  },

  reportIssue: async (data: {
    productId?: string;
    orderId?: string;
    issueType: string;
    outcome: string;
    reason?: string;
  }) => {
    return request<any>("/issues", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },


  resolveIssue: async (id: string, action: "make_available" | "delete") => {
    return request<any>(`/issues/${id}/resolve`, {
      method: "PATCH",
      body: JSON.stringify({ action }),
    });
  },
};

