import express from "express";
import {
  LoginUser,
  RegisteredUser,
  verifyUser,Logout
} from "../controllers/authcontroller.js";

const router = express.Router();

router.post("/register", RegisteredUser);
router.post("/login", LoginUser);
router.post("/verifyemail", verifyUser);
router.get("/logout",Logout );

export default router;
