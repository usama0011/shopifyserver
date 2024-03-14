import RechargeReceipt from "../models/rechargereceiptmodel.js";

// GET single recharge receipt by ID

// POST - create a new recharge receipt
export const createRechargeReceipt = async (req, res) => {
  try {
    const rechargeReceipt = await RechargeReceipt.create(req.body);
    res.status(201).json(rechargeReceipt);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET all recharge receipts
export const getAllRechargeReceipts = async (req, res) => {
  try {
    const rechargeReceipts = await RechargeReceipt.find({
      userId: req.user.user_id,
    });
    res.status(200).json(rechargeReceipts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
