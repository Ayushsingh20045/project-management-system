import express from "express";
import protect from "../middlewares/auth.middleware.js";
import commentRoutes from "./comment.routes.js";
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

const router = express.Router({ mergeParams: true });

router.use(protect);

router.use("/:taskId/comments", commentRoutes);

router.post("/", createTask);

router.get("/", getTasks);

router.get("/:taskId", getTask);

router.put("/:taskId", updateTask);

router.delete("/:taskId", deleteTask);

export default router;
