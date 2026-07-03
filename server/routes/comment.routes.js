import express from "express";
import protect from "../middlewares/auth.middleware.js";

import {
  createComment,
  getComments,
  deleteComment,
} from "../controllers/comment.controller.js";

const router = express.Router({ mergeParams: true });

router.use(protect);

router.post("/", createComment);

router.get("/", getComments);

router.delete("/:commentId", deleteComment);

export default router;
