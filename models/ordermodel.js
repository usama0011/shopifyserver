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
    ordername: {
      type: String,
      required: true,
    },
    orderstatus: {
      type: String,
      required: true,
    },
    ordercost: {
      type: Number,
      required: true,
    },
    ordercommission: {
      type: Number,
      required: true,
    },
    orderimage: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderschema);
