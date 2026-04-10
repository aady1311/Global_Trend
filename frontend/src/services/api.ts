import { Task } from "../types/task";

const BASE = import.meta.env.VITE_API_URL;

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.details || json.error || "Request failed");
  return json;
}

export const api = {
  getTasks: () => request<{ data: Task[] }>("/tasks").then((r) => r.data),
  createTask: (title: string, description?: string) =>
    request<{ data: Task }>("/tasks", { method: "POST", body: JSON.stringify({ title, description }) }).then((r) => r.data),
  updateTask: (id: number, body: { title?: string; completed?: boolean }) =>
    request<{ data: Task }>(`/tasks/${id}`, { method: "PATCH", body: JSON.stringify(body) }).then((r) => r.data),
  deleteTask: (id: number) => request(`/tasks/${id}`, { method: "DELETE" }),
};
