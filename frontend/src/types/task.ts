export type TaskStatus = "Todo" | "In Progress" | "Done";

export type TaskPriority = "Low" | "Medium" | "High";

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  project: string;
  createdAt: string;
  updatedAt: string;
  assignedTo?: {
    _id: string;
    name: string;
    email: string;
  };
}
