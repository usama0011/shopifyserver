import mongoose from "mongoose";

const { Schema } = mongoose;
// Admin can only created users
const withdrawalschema = new Schema(
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
  },
  { timestamps: true }
);

export default mongoose.model("Withdraw", withdrawalschema);
