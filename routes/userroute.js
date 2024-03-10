import express from "express";

import {
  GetsingleUser,
  GetAllUsers,
  UpdateUser,
  DeleteUser,
} from "../controllers/usercontroller.js";

const router = express.Router();

// Create a New Aagent
router.get("/", GetAllUsers);
router.get("/:userId", GetsingleUser);
router.put("/:userId", UpdateUser);
router.delete("/:userId", DeleteUser);
export default router;
