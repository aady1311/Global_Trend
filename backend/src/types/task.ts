export interface CreateTaskBody {
  title: string;
  description?: string;
}

export interface UpdateTaskBody {
  title?: string;
  completed?: boolean;
}
