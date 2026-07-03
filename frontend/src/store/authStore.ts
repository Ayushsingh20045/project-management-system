import { create } from "zustand";
import type{User} from "../types/user.ts"

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),

  login: (user, token) => {
    localStorage.setItem("token", token);

    set({
      user,
      token,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem("token");

    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },
}));

// import { create } from "zustand";
// import toast from "react-hot-toast";

// import api from "../services/api";
// import type { Task } from "../types/task";

// interface TaskStore {
//   tasks: Task[];
//   loading: boolean;

//   setTasks: (tasks: Task[]) => void;

//   fetchTasks: (workspaceId: string, projectId: string) => Promise<void>;

//   createTask: (
//     workspaceId: string,
//     projectId: string,
//     data: Partial<Task>,
//   ) => Promise<void>;

//   updateTask: (
//     workspaceId: string,
//     projectId: string,
//     taskId: string,
//     data: Partial<Task>,
//   ) => Promise<void>;

//   deleteTask: (
//     workspaceId: string,
//     projectId: string,
//     taskId: string,
//   ) => Promise<void>;

//   moveTask: (
//     workspaceId: string,
//     projectId: string,
//     taskId: string,
//     status: Task["status"],
//   ) => Promise<void>;
// }

// export const useTaskStore = create<TaskStore>((set, get) => ({
//   tasks: [],
//   loading: false,

//   setTasks: (tasks) => set({ tasks }),

//   fetchTasks: async (workspaceId, projectId) => {
//     try {
//       set({ loading: true });

//       const res = await api.get(
//         `/workspaces/${workspaceId}/projects/${projectId}/tasks`,
//       );

//       set({
//         tasks: res.data.tasks,
//       });
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to load tasks");
//     } finally {
//       set({
//         loading: false,
//       });
//     }
//   },

//   createTask: async (workspaceId, projectId, data) => {
//     try {
//       const res = await api.post(
//         `/workspaces/${workspaceId}/projects/${projectId}/tasks`,
//         data,
//       );

//       set({
//         tasks: [...get().tasks, res.data.task],
//       });

//       toast.success("Task created");
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to create task");
//     }
//   },

//   updateTask: async (workspaceId, projectId, taskId, data) => {
//     try {
//       const res = await api.put(
//         `/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}`,
//         data,
//       );

//       set({
//         tasks: get().tasks.map((task) =>
//           task._id === taskId ? res.data.task : task,
//         ),
//       });

//       toast.success("Task updated");
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to update task");
//     }
//   },

//   deleteTask: async (workspaceId, projectId, taskId) => {
//     try {
//       await api.delete(
//         `/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}`,
//       );

//       set({
//         tasks: get().tasks.filter((task) => task._id !== taskId),
//       });

//       toast.success("Task deleted");
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to delete task");
//     }
//   },

//   moveTask: async (workspaceId, projectId, taskId, status) => {
//     try {
//       await api.put(
//         `/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}`,
//         {
//           status,
//         },
//       );
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to update task");
//     }
//   },
// }));