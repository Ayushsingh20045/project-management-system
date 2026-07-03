import { create } from "zustand";
import api from "../services/api";

interface DashboardStats {
  totalWorkspaces: number;
  totalProjects: number;
  totalTasks: number;
}

interface DashboardStore {
  stats: DashboardStats;

  fetchStats: () => Promise<void>;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  stats: {
    totalWorkspaces: 0,
    totalProjects: 0,
    totalTasks: 0,
  },

  fetchStats: async () => {
    try {
      const res = await api.get("/dashboard");

      set({
        stats: {
          totalWorkspaces: res.data.stats.totalWorkspaces,
          totalProjects: res.data.stats.totalProjects,
          totalTasks: res.data.stats.totalTasks,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
}));
