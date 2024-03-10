import mongoose from "mongoose";

const { Schema } = mongoose;
// Admin can only created users
const taskschema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pending: {
      type: Number,
      default: 0,
    },
    completed: {
      type: Number,
      default: 0,
    },
    totaltasks: {
      type: Number,
      default: 30,
    },
    earnCommission: {
      type: Number,
      default: 0,
    },
    frozenamount: {
      type: Number,
    },
    orderQuantity: {
      type: Number,
    },
    availableBalance: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskschema);
