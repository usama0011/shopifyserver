import express from "express";
import {
  GetAllSubmitedOrders,
  GetSingleSubmitOrder,
  
  DeleteSubmitOrder,
} from "../controllers/submitordercontroller.js";
import { CreateanewSubmitOrder } from "../controllers/submitordercontroller.js";

const router = express.Router();

router.get("/", GetAllSubmitedOrders);
router.get("/:submitorderId", GetSingleSubmitOrder);
router.post("/",CreateanewSubmitOrder );
router.delete("/:submitorderId", DeleteSubmitOrder);

export default router;
