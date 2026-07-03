import express from "express";

import  protect  from "../middlewares/auth.middleware.js";
import { getWorkspaceUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/workspace/:workspaceId",protect, getWorkspaceUsers);

export default router;
