// export interface Project {
//   _id: string;
//   title: string;
//   description: string;
//   color: string;
//   workspace: string;
//   createdAt: string;
//   updatedAt: string;
// }

export interface Project {
  _id: string;
  title: string;
  description: string;
  color: string;

  workspace: string;
  owner: string;

  totalTasks: number;
  completedTasks: number;
  progress: number;

  createdAt: string;
  updatedAt: string;
}