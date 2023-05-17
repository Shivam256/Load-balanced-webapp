import express from "express";

import { createTask, getAllTasks } from "../controllers/task.controller.js";
import activeMiddleware from "../middlewares/isActive.js";
import authMiddleware from "../middlewares/isAuth.js";
import adminMiddleware from "../middlewares/isAdmin.js";

const router = express.Router();

router.post("/createTask/:id", authMiddleware, activeMiddleware, createTask);
router.get("/allTasks", authMiddleware, adminMiddleware, getAllTasks);

export default router;
