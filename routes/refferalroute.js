import express from "express";
import { AuthenticatedMiddlewareBoth } from "../middleware/middleware.js";
import UserModel from '../models/usermodel.js'
const router = express.Router();

router.get("/", AuthenticatedMiddlewareBoth, async (req, res) => {
    try {
        const id = req.user.user_id;
        const refferralcode = req.user.referralCode;
        const getuser = await UserModel.findById(id);
        const getusersaccountsrefferals = await UserModel.find({ invitationcode: getuser.referralCode })
        let bonusAmount = getusersaccountsrefferals.length * 5
        const updateuser =await UserModel.findByIdAndUpdate(id, { earncommission: bonusAmount }, { new: true })
        console.log(updateuser)
        res.status(200).json(bonusAmount)
    } catch (error) {
        res.status(500).json({ error: error, errormsg: error.message })
    }
})

export default router;
