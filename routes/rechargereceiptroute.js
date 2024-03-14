import express from "express";
import {
  createRechargeReceipt,
  getAllRechargeReceipts,
} from "../controllers/receiptcontroller.js";
import {
  AuthenticatedMiddlewareBoth,
  SuperAdminMiddle,
} from "../middleware/middleware.js";

const router = express.Router();

router.post("/", AuthenticatedMiddlewareBoth, createRechargeReceipt);
router.get("/", AuthenticatedMiddlewareBoth, getAllRechargeReceipts);

export default router;
