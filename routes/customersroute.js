import express from "express";
import {
  GetAllQueries,
  GetSingleQuery,
  CreateQueryCustomer,
  DeleteCustomerQuery,
} from "../controllers/customercontroller.js";

const router = express.Router();

router.get("/", GetAllQueries);
router.get("/:orderId", GetSingleQuery);
router.post("/", CreateQueryCustomer);
router.delete("/:orderId", DeleteCustomerQuery);

export default router;
