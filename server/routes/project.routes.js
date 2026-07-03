// import express from "express";
// import protect from "../middlewares/auth.middleware.js";
// import { createProject,getProjects,getProject,updateProject,deleteProject } from "../controllers/project.controller.js";
// import taskRoutes from "./task.routes.js";

// const router = express.Router({ mergeParams: true });
// router.use("/:projectId/tasks", taskRoutes);

// router.post("/", protect, createProject);
// router.get("/", getProjects);

// router.get("/:projectId", getProject);

// router.put("/:projectId", updateProject);

// router.delete("/:projectId", deleteProject);

// export default router;

import express from "express";
import {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";
import taskRoutes from "./task.routes.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router({ mergeParams: true });

router.use(protect);

router.post("/", createProject);
router.get("/", getProjects);

router.get("/:projectId", getProject);
router.put("/:projectId", updateProject);
router.delete("/:projectId", deleteProject);

// Nested Task Routes
router.use("/:projectId/tasks", taskRoutes);

export default router;