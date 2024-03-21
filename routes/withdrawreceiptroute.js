import express from "express";
import {
  GetAllWithdrawalRecipt,
  GetSingleWithdrawalRecipt,
  CreateWithdrawalRecipt,
  UpdateWithdrawalRecipt,
  DeleteWithdrawalRecipt,
} from "../controllers/withdrawreceiptcontroller.js";
import { AuthenticatedMiddlewareBoth } from "../middleware/middleware.js";

const router = express.Router();

router.get("/", AuthenticatedMiddlewareBoth, GetAllWithdrawalRecipt);
router.get("/:withdrawId", GetSingleWithdrawalRecipt);
router.post("/", CreateWithdrawalRecipt);
router.put("/:withdrawId", UpdateWithdrawalRecipt);
router.delete("/:withdrawId", DeleteWithdrawalRecipt);

export default router;
