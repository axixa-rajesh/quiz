const API_BASE = "http://localhost:3000/api";

// Helper for Auth Headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

const handleResponse = async (res) => {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP Error ${res.status}: ${res.statusText}`);
  }
  return await res.json();
};

export const getDashboardMetrics = async () => {
  const res = await fetch(`${API_BASE}/reports/dashboard-summary`, {
    headers: getAuthHeaders()
  });
  return handleResponse(res);
};

export const getReportsData = async () => {
  const res = await fetch(`${API_BASE}/reports/subject-topic-report`, {
    headers: getAuthHeaders()
  });
  return handleResponse(res);
};

export const getQuizzes = async () => {
  const res = await fetch(`${API_BASE}/reports/quiz-report`, {
    headers: getAuthHeaders()
  });
  return handleResponse(res);
};

export const getResults = async () => {
  const res = await fetch(`${API_BASE}/reports/quiz-report`, {
    headers: getAuthHeaders()
  });
  return handleResponse(res);
};

export const getSystemSettings = async () => {
  return { success: true, settings: {} };
};

export const updateSystemSettings = async (settings) => {
  return { success: true, settings };
};