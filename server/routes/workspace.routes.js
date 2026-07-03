import express from "express";
import protect from "../middlewares/auth.middleware.js";
import { createWorkspace ,getAllWorkspaces,updateWorkspace,deleteWorkspace,getWorkspace} from "../controllers/workspace.controller.js";
import projectRoutes from "./project.routes.js";
const router = express.Router();

// Protect all routes below
router.use(protect);

router.post("/",protect,createWorkspace)

router.get("/", getAllWorkspaces);

router.get("/:id", getWorkspace);

router.put("/:id", updateWorkspace);

router.delete("/:id", deleteWorkspace);


// Nested Project Routes
router.use("/:workspaceId/projects", projectRoutes);

export default router;
