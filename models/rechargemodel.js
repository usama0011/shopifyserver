import mongoose from "mongoose";

const { Schema } = mongoose;
// Admin can only created users
const rechargeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rechargeamount: {
      type: Number,
      required: true,
    },
    transcationId: {
      type: String,
      required: true,
    },
    selectnetwork: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Recharge", rechargeSchema);
