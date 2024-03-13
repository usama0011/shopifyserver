import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderName: {
      type: String,
      required: true,
    },
    orderStatus: {
      type: String,
      required: true,
    },
    orderCost: {
      type: Number,
      required: true,
    },
    orderCommission: {
      type: Number,
      required: true,
    },
    frozenAmount: {
      type: Number,
      required: true,
    },
    depositedrequired: {
      type: Number,
    },
    orderImage: {
      type: String,
      default: "https://img.icons8.com/?size=80&id=Po25L2kPRlrh&format=png",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
