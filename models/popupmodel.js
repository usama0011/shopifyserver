import mongoose from "mongoose";

const { Schema } = mongoose;
// Admin can only created users
const popupSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        popupshow: {
            type: Boolean,
            require: true,
            default: true
        }
    },
    { timestamps: true }
);

export default mongoose.model("PopUp", popupSchema);
