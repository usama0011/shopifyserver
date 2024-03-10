import mongoose from "mongoose";

const { Schema } = mongoose;
// Admin can only created users
const orderschema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    status: {
      type: String,
      default: "complete",
    },
  },
  { timestamps: true }
);

export default mongoose.model("SubmitOrders", orderschema);
