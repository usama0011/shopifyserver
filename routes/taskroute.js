import express from "express";
import {
  GetAllTasks,
  GetSingleTask,
  CreateTask,
  UpdateTask,
  DeleteTask,
} from "../controllers/taskcontroller.js";

const router = express.Router();

router.get("/", GetAllTasks);
router.get("/:taskId", GetSingleTask);
router.post("/", CreateTask);
router.put("/:taskId", UpdateTask);
router.delete("/:taskId", DeleteTask);

export default router;
