import express from "express";
import {
  GetAllWithdrawal,
  GetSingleWithdrawal,
  CreateWithdrawal,
  UpdateWithdrawal,
  DeleteWithdrawal,
} from "../controllers/withdrawcontroller.js";

const router = express.Router();

router.get("/", GetAllWithdrawal);
router.get("/:withdrawId", GetSingleWithdrawal);
router.post("/", CreateWithdrawal);
router.put("/:withdrawId", UpdateWithdrawal);
router.delete("/:withdrawId", DeleteWithdrawal);

export default router;
