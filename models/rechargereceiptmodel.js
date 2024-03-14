import mongoose, { Mongoose } from "mongoose";

const { Schema } = mongoose;
// Admin can only created users
const rechargeReceipt = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rechargeAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("RechargeReceipt", rechargeReceipt);
