import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fullName: { type: String, required: true },
  mobile: { type: String, required: true },
  pincode: { type: String, required: true },
  addressLine: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  landmark: { type: String },
  isDefault: { type: Boolean, default: false },
});

export default mongoose.models.Address ||
  mongoose.model("Address", addressSchema);
