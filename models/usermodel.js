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
      type: String,
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
      default: 15,
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
    referralCode: {
      type: String,
      unique: true,
      sparse: true,
    },
    orderquantitiy: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
    bonusamount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  // Generate a 5-digit referral code
  const generateReferralCode = () => {
    const min = 10000;
    const max = 99999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Check if the referral code already exists
  if (!this.referralCode) {
    let referralCode;
    do {
      referralCode = generateReferralCode().toString();
      const existingUser = await this.constructor.findOne({ referralCode });
      if (!existingUser) break;
    } while (true);
    this.referralCode = referralCode;
  }
  next();
});


export default mongoose.model("User", userSchema);
