import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      requried: true,
    },
    description: {
      type: String,
      requried: true,
    },
    price: {
      type: Number,
      min: 0,
      requried: true,
    },
    image: {
      type: String,
      requried: [true, "Image is required"],
    },
    category: {
      type: String,
      requried: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
