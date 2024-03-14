import mongoose from "mongoose";

const { Schema } = mongoose;
// Admin can only created users
const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    invitationcode: {
      type: Number,
      required: true,
    },
    availableBalance: {
      type: Number,
      default: 20, // Initial balance for new users
    },
    totalOrdes: {
      type: Number,
      default: 0,
    },
    pendingtasks: {
      type: Number,
      default: 0,
    },
    completedtasks: {
      type: Number,
      default: 0,
    },
    earncommission: {
      type: Number,
      default: 0,
    },
    frozenamount: {
      type: Number,
      default: 0,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
    },
    referralCode: {
      type: String,
      unique: true,
      sparse: true,
    },
    orderquantitiy: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
