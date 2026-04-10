import { useState, KeyboardEvent } from "react";
import { Task } from "../types/task";

interface Props {
  task: Task;
  onUpdate: (id: number, body: { title?: string; completed?: boolean }) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export function TaskItem({ task, onUpdate, onDelete }: Props) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const commitEdit = async () => {
    const trimmed = editTitle.trim();
    if (trimmed && trimmed !== task.title) await onUpdate(task.id, { title: trimmed });
    else setEditTitle(task.title);
    setEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") commitEdit();
    if (e.key === "Escape") { setEditTitle(task.title); setEditing(false); }
  };

  return (
    <li className={`task-item${task.completed ? " completed" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onUpdate(task.id, { completed: !task.completed })}
      />
      <div className="task-content">
        {editing ? (
          <input
            className="edit-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={commitEdit}
            onKeyDown={handleKeyDown}
            autoFocus
            maxLength={255}
          />
        ) : (
          <span className="task-title" onDoubleClick={() => setEditing(true)} title={task.title}>
            {task.title}
          </span>
        )}
        {task.description && <span className="task-desc">{task.description}</span>}
      </div>
      <button className="delete-btn" onClick={() => onDelete(task.id)}>✕</button>
    </li>
  );
}
