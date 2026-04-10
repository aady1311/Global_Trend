import { useState, FormEvent } from "react";

interface Props {
  onAdd: (title: string, description?: string) => Promise<void>;
}

export function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) { setError("Title is required"); return; }
    try {
      await onAdd(title.trim(), description.trim() || undefined);
      setTitle("");
      setDescription("");
      setError("");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        maxLength={255}
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
      />
      <button type="submit">Add Task</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
