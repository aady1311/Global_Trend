import { useState, useEffect, useCallback } from "react";
import { Task } from "../types/task";
import { api } from "../services/api";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try { setTasks(await api.getTasks()); }
    catch (e) { setError((e as Error).message); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const createTask = async (title: string, description?: string) => {
    const task = await api.createTask(title, description);
    setTasks((prev) => [task, ...prev]);
  };

  const updateTask = async (id: number, body: { title?: string; completed?: boolean }) => {
    const updated = await api.updateTask(id, body);
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  const deleteTask = async (id: number) => {
    await api.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return { tasks, error, createTask, updateTask, deleteTask };
}
