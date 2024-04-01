import RechargeModel from "../models/popupmodel.js";
import express from 'express'

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const singleRechargeRecord = await RechargeModel.findById(
            req.params.rechargeId
        );
        if (!singleRechargeRecord) {
            return res.status(404).json({ error: "Recharge record not found" });
        }
        res.status(200).json(singleRechargeRecord);
    } catch (error) {
        console.error("Error getting recharge record by ID:", error);
        res
            .status(500)
            .json({ error: "Internal Server Error", errorMessage: error.message });
    }
})

router.post("/", async (req, res, next) => {
    try {
        const { userId } = req.body;

        const newRecharge = new RechargeModel({
            userId
        });

        await newRecharge.save();

        res.status(201).json({ message: "Recharge record submitted successfully" });
    } catch (error) {
        console.error("Error submitting recharge record:", error);
        res
            .status(500)
            .json({ message: "Internal Server Error", errorMessage: error.message });
    }
})
export default router;

router.put("/:id", async (req, res, next) => {
    try {
        const UpdatePopupDetails = await RechargeModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!UpdatePopupDetails) {
            return res.status(404).json({ error: "Recharge record not found" });
        }
        res.status(200).json(UpdatePopupDetails);
    } catch (error) {
        console.error("Error updating recharge record by ID:", error);
        res
            .status(500)
            .json({ error: "Internal Server Error", errorMessage: error.message });
    }
})

