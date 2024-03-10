import express from "express";
import {
  GetAllSubmitedOrders,
  GetSingleSubmitOrder,
  DeleteSubmitOrder,
} from "../controllers/submitordercontroller.js";
import { CreateanewSubmitOrder } from "../controllers/submitordercontroller.js";
import {
  AuthenticatedMiddlewareBoth,
  SuperAdminMiddle,
} from "../middleware/middleware.js";

const router = express.Router();

router.get("/", AuthenticatedMiddlewareBoth, GetAllSubmitedOrders);
router.get(
  "/:submitorderId",
  AuthenticatedMiddlewareBoth,
  GetSingleSubmitOrder
);
router.post("/", AuthenticatedMiddlewareBoth, CreateanewSubmitOrder);
router.delete("/:submitorderId", SuperAdminMiddle, DeleteSubmitOrder);

export default router;
