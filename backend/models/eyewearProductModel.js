import mongoose from "mongoose";

const eyewearProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String },
    description: { type: String },
    brand: { type: String },
    price: { type: Number, required: true },
    availability: { type: Boolean, default: true },
    frametype: { type: String },
    gender: { type: String, enum: ["Male", "Female", "Unisex"], default: "Unisex" },
    imageurl: { type: String },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const EyewearProduct = mongoose.model("EyewearProduct", eyewearProductSchema);
export default EyewearProduct;
