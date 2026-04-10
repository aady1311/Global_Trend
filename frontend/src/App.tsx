import { useState } from "react";
import { useTasks } from "./hooks/useTasks";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { FilterBar } from "./components/FilterBar";
import { FilterType } from "./types/task";
import "./app.css";

export default function App() {
  const { tasks, error, createTask, updateTask, deleteTask } = useTasks();
  const [filter, setFilter] = useState<FilterType>("all");

  return (
    <div className="container">
      <h1>Task Manager</h1>
      {error && <p className="error">{error}</p>}
      <TaskForm onAdd={createTask} />
      <FilterBar current={filter} onChange={setFilter} />
      <TaskList tasks={tasks} filter={filter} onUpdate={updateTask} onDelete={deleteTask} />
    </div>
  );
}
