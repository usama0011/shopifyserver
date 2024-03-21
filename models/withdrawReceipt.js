import mongoose from "mongoose";

const { Schema } = mongoose;
// Admin can only created users
const withdrawalsReceiptchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    network: {
      type: String,
      required: true,
    },
    walletaddress: {
      type: String,
      required: true,
    },
    withdrawalamount: {
      type: Number,
      required: true,
    },
    availableBalance: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "Success",
    },
  },
  { timestamps: true }
);

export default mongoose.model("WithdrawReceipt", withdrawalsReceiptchema);
