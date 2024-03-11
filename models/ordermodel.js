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
    depositedrequired: {
      type: Number,
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
    orderImage: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
