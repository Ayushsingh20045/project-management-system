// // import { create } from "zustand";
// // import toast from "react-hot-toast";

// // import api from "../services/api";
// // import type { Task } from "../types/task";

// // interface TaskStore {
// //   tasks: Task[];
// //   loading: boolean;

// //   fetchTasks: (projectId: string) => Promise<void>;

// //   createTask: (projectId: string, data: Partial<Task>) => Promise<void>;

// //   updateTask: (
// //     projectId: string,
// //     taskId: string,
// //     data: Partial<Task>,
// //   ) => Promise<void>;

// //   deleteTask: (projectId: string, taskId: string) => Promise<void>;

// //   moveTask: (
// //     projectId: string,
// //     taskId: string,
// //     status: Task["status"],
// //   ) => Promise<void>;
// // }

// // export const useTaskStore = create<TaskStore>((set, get) => ({
// //   tasks: [],
// //   loading: false,

// //   fetchTasks: async (projectId) => {
// //     try {
// //       set({ loading: true });

// //       const res = await api.get(`/projects/${projectId}/tasks`);

// //       set({
// //         tasks: res.data.tasks,
// //       });
// //     } catch (error) {
// //       console.log(error);

// //       toast.error("Failed to load tasks");
// //     } finally {
// //       set({
// //         loading: false,
// //       });
// //     }
// //   },

// //   createTask: async (projectId, data) => {
// //     try {
// //       const res = await api.post(`/projects/${projectId}/tasks`, data);

// //       set({
// //         tasks: [...get().tasks, res.data.task],
// //       });

// //       toast.success("Task created");
// //     } catch (error) {
// //       console.log(error);

// //       toast.error("Failed to create task");
// //     }
// //   },

// //   updateTask: async (projectId, taskId, data) => {
// //     try {
// //       const res = await api.put(`/projects/${projectId}/tasks/${taskId}`, data);

// //       set({
// //         tasks: get().tasks.map((task) =>
// //           task._id === taskId ? res.data.task : task,
// //         ),
// //       });

// //       toast.success("Task updated");
// //     } catch (error) {
// //       console.log(error);

// //       toast.error("Failed to update task");
// //     }
// //   },

// //   deleteTask: async (projectId, taskId) => {
// //     try {
// //       await api.delete(`/projects/${projectId}/tasks/${taskId}`);

// //       set({
// //         tasks: get().tasks.filter((task) => task._id !== taskId),
// //       });

// //       toast.success("Task deleted");
// //     } catch (error) {
// //       console.log(error);

// //       toast.error("Failed to delete task");
// //     }
// //   },

// //   moveTask: async (projectId, taskId, status) => {
// //     try {
// //       const res = await api.put(`/projects/${projectId}/tasks/${taskId}`, {
// //         status,
// //       });

// //       set({
// //         tasks: get().tasks.map((task) =>
// //           task._id === taskId ? res.data.task : task,
// //         ),
// //       });
// //     } catch (error) {
// //       console.log(error);

// //       toast.error("Failed to move task");
// //     }
// //   },
// // }));

// import { create } from "zustand";
// import toast from "react-hot-toast";

// import api from "../services/api";
// import type { Task } from "../types/task";

// interface TaskStore {
//   tasks: Task[];
//   loading: boolean;

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
//       const res = await api.put(
//         `/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}`,
//         {
//           status,
//         },
//       );

//       set({
//         tasks: get().tasks.map((task) =>
//           task._id === taskId ? res.data.task : task,
//         ),
//       });
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to move task");
//     }
//   },
// }));

import { create } from "zustand";
import toast from "react-hot-toast";

import api from "../services/api";
import type { Task } from "../types/task";

interface TaskStore {
  tasks: Task[];
  loading: boolean;

  // Update tasks locally (used for drag & drop)
  setTasks: (tasks: Task[]) => void;

  fetchTasks: (workspaceId: string, projectId: string) => Promise<void>;

  createTask: (
    workspaceId: string,
    projectId: string,
    data: Partial<Task>,
  ) => Promise<void>;

  updateTask: (
    workspaceId: string,
    projectId: string,
    taskId: string,
    data: Partial<Task>,
  ) => Promise<void>;

  deleteTask: (
    workspaceId: string,
    projectId: string,
    taskId: string,
  ) => Promise<void>;

  moveTask: (
    workspaceId: string,
    projectId: string,
    taskId: string,
    status: Task["status"],
  ) => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  loading: false,

  // Optimistic update helper
  setTasks: (tasks) => set({ tasks }),

  fetchTasks: async (workspaceId, projectId) => {
    try {
      set({ loading: true });

      const res = await api.get(
        `/workspaces/${workspaceId}/projects/${projectId}/tasks`,
      );

      set({
        tasks: res.data.tasks,
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to load tasks");
    } finally {
      set({
        loading: false,
      });
    }
  },

  createTask: async (workspaceId, projectId, data) => {
    try {
      const res = await api.post(
        `/workspaces/${workspaceId}/projects/${projectId}/tasks`,
        data,
      );

      set({
        tasks: [...get().tasks, res.data.task],
      });

      toast.success("Task created");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create task");
    }
  },

  updateTask: async (workspaceId, projectId, taskId, data) => {
    try {
      const res = await api.put(
        `/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}`,
        data,
      );

      set({
        tasks: get().tasks.map((task) =>
          task._id === taskId ? res.data.task : task,
        ),
      });

      toast.success("Task updated");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update task");
    }
  },

  deleteTask: async (workspaceId, projectId, taskId) => {
    try {
      await api.delete(
        `/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}`,
      );

      set({
        tasks: get().tasks.filter((task) => task._id !== taskId),
      });

      toast.success("Task deleted");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete task");
    }
  },

  moveTask: async (workspaceId, projectId, taskId, status) => {
    try {
      const res = await api.put(
        `/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}`,
        {
          status,
        },
      );

      set({
        tasks: get().tasks.map((task) =>
          task._id === taskId ? res.data.task : task,
        ),
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to move task");
      throw error;
    }
  },
}));