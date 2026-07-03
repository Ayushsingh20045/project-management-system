import { create } from "zustand";
import toast from "react-hot-toast";

import api from "../services/api";

export interface WorkspaceUser {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface UserStore {
  users: WorkspaceUser[];
  loading: boolean;

  fetchWorkspaceUsers: (workspaceId: string) => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  loading: false,

  fetchWorkspaceUsers: async (workspaceId) => {
    try {
      set({
        loading: true,
      });

      const res = await api.get(`/users/workspace/${workspaceId}`);

      set({
        users: res.data.users,
      });
    } catch (error) {
      console.log(error);

      toast.error("Failed to load users");
    } finally {
      set({
        loading: false,
      });
    }
  },
}));
