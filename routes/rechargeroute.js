import express from "express";
import {
  GetAllRecharges,
  GetSingleRecharge,
  CreateRecharge,
  UpdateRecharge,
  DeleteRecharge,
} from "../controllers/rechargecontroller.js";

const router = express.Router();

router.get("/", GetAllRecharges);
router.get("/:rechargeId", GetSingleRecharge);
router.post("/", CreateRecharge);
router.put("/:rechargeId", UpdateRecharge);
router.delete("/:rechargeId", DeleteRecharge);

export default router;
