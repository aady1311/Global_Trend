import { Task, FilterType } from "../types/task";
import { TaskItem } from "./TaskItem";

interface Props {
  tasks: Task[];
  filter: FilterType;
  onUpdate: (id: number, body: { title?: string; completed?: boolean }) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export function TaskList({ tasks, filter, onUpdate, onDelete }: Props) {
  const visible = tasks.filter((t) =>
    filter === "active" ? !t.completed : filter === "completed" ? t.completed : true
  );

  if (visible.length === 0) return <p className="empty">No tasks here.</p>;

  return (
    <ul className="task-list">
      {visible.map((t) => (
        <TaskItem key={t.id} task={t} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </ul>
  );
}
