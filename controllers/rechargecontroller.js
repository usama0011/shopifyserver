import RechargeModel from "../models/rechargemodel.js";

export const GetAllRecharges = async (req, res, next) => {
  try {
    const rechargeRecords = await RechargeModel.find();
    res.status(200).json(rechargeRecords);
  } catch (error) {
    console.error("Error getting recharge records:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", errorMessage: error.message });
  }
};

export const GetSingleRecharge = async (req, res, next) => {
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
};

export const CreateRecharge = async (req, res, next) => {
  try {
    const { userId, rechargeamount, transcationId, selectnetwork } = req.body;
    console.log(userId, rechargeamount, transcationId, selectnetwork);
    const newRecharge = new RechargeModel({
      userId,
      rechargeamount,
      transcationId: transcationId,
      selectnetwork,
    });

    await newRecharge.save();

    res.status(201).json({ message: "Recharge record submitted successfully" });
  } catch (error) {
    console.error("Error submitting recharge record:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
};

export const UpdateRecharge = async (req, res, next) => {
  try {
    const updatedRechargeRecord = await RechargeModel.findByIdAndUpdate(
      req.params.rechargeId,
      req.body,
      { new: true }
    );
    if (!updatedRechargeRecord) {
      return res.status(404).json({ error: "Recharge record not found" });
    }
    res.status(200).json(updatedRechargeRecord);
  } catch (error) {
    console.error("Error updating recharge record by ID:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", errorMessage: error.message });
  }
};

export const DeleteRecharge = async (req, res, next) => {
  try {
    const deletedRechargeRecord = await RechargeModel.findByIdAndDelete(
      req.params.rechargeId
    );
    if (!deletedRechargeRecord) {
      return res.status(404).json({ error: "Recharge record not found" });
    }
    res.status(200).json({ message: "Recharge deleted successfully" });
  } catch (error) {
    console.error("Error deleting recharge record by ID:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", errorMessage: error.message });
  }
};
