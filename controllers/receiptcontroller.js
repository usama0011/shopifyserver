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

export const getAllRechargeReceipts = async (req, res) => {
  try {
    let query = {};

    // If the user is not an admin, filter receipts by user ID
    if (!req.user.isAdmin) {
      query.userId = req.user.user_id;
    }

    const rechargeReceipts = await RechargeReceipt.find(query);
    res.status(200).json(rechargeReceipts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
