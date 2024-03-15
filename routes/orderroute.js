import express from "express";
import {
  GetallOrders,
  GetSingleOrder,
  CreateOrder,
  UpdateOrder,
  DeleteOrder,
  getAdminsOrders
} from "../controllers/ordercontroller.js";
import { AuthenticatedMiddlewareBoth, SuperAdminMiddle } from "../middleware/middleware.js";

const router = express.Router();

router.get("/",AuthenticatedMiddlewareBoth, GetallOrders);
router.get("/:orderId",AuthenticatedMiddlewareBoth, GetSingleOrder);
router.post("/",AuthenticatedMiddlewareBoth, CreateOrder);
router.put("/:orderId",AuthenticatedMiddlewareBoth, UpdateOrder);
router.delete("/:orderId",SuperAdminMiddle, DeleteOrder);
// get order for admin side 
router.get("/adminorders",AuthenticatedMiddlewareBoth,getAdminsOrders)
export default router;
