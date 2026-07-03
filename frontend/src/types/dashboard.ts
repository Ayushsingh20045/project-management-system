export interface DashboardStats {
  totalWorkspaces: number;
  totalProjects: number;
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  todoTasks: number;
  overdueTasks: number;
}

export interface RecentProject {
  _id: string;
  title: string;
  description: string;
  color: string;
}

export interface Activity {
  _id: string;
  title: string;
  status: string;
  project: string;
  updatedAt: string;
}

export interface WeeklyProductivity {
  _id: string;
  tasks: number;
}

export interface UpcomingDeadline {
  _id: string;
  title: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  status: string;
  project: string;
}