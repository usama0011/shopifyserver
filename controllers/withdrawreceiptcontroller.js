import WidthdrawalModel from "../models/withdrawReceipt.js";

export const GetAllWithdrawalRecipt = async (req, res, next) => {
  try {
    let withdrawalRecords;
    if (req.user.isAdmin) {
      // If the user is an admin, fetch all withdrawal records
      withdrawalRecords = await WidthdrawalModel.find();
    } else {
      // If the user is not an admin, fetch only their own withdrawal records
      withdrawalRecords = await WidthdrawalModel.find({
        userId: req.user.user_id,
      });
    }
    res.status(200).json(withdrawalRecords);
  } catch (error) {
    console.error("Error getting withdrawal records:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", errormsg: error.message });
  }
};

export const GetSingleWithdrawalRecipt = async (req, res, next) => {
  try {
    const singlewithdrawRecord = await WidthdrawalModel.findById(
      req.params.withdrawId
    );
    if (!singlewithdrawRecord) {
      return res.status(404).json({ error: "withdrawal record not found" });
    }
    res.status(200).json(singlewithdrawRecord);
  } catch (error) {
    console.error("Error getting task record by ID:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", errmsg: error.message });
  }
};

export const CreateWithdrawalRecipt = async (req, res, next) => {
  try {
    const {
      userId,
      network,
      walletaddress,
      withdrawalamount,
      availableBalance,
    } = req.body;

    // Create a new Order instance
    const newTask = new WidthdrawalModel({
      userId,
      network,
      walletaddress,
      withdrawalamount,
      availableBalance,
    });

    // Save the record to the database
    await newTask.save();

    res
      .status(201)
      .json({ message: "WithDrawal record submitted successfully" });
  } catch (error) {
    console.error("Error submitting Task record:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", errormsg: error.message });
  }
};

export const UpdateWithdrawalRecipt = async (req, res, next) => {
  try {
    const UpdateWithdrawalRecord = await WidthdrawalModel.findByIdAndUpdate(
      req.params.withdrawId,
      req.body,
      { new: true }
    );
    if (!UpdateWithdrawalRecord) {
      return res.status(404).json({ error: "Widthdrawal record not found" });
    }
    res.status(200).json(UpdateWithdrawalRecord);
  } catch (error) {
    console.error("Error updating Withdraw record by ID:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", errormsg: error.message });
  }
};
export const DeleteWithdrawalRecipt = async (req, res, next) => {
  try {
    const DeleteWithdrawal = await WidthdrawalModel.findByIdAndDelete(
      req.params.withdrawId
    );
    if (!DeleteWithdrawal) {
      return res.status(404).json({ error: "Withdrawal record not found" });
    }
    res.status(200).json({ message: "Withdrawal Deleted Successfully" });
  } catch (error) {
    console.error("Error deleting Withdrawal record by ID:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", errormsg: error.message });
  }
};
