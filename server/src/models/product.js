import mongoose from "mongoose";

const { Schema } = mongoose;  // Đảm bảo Schema được lấy từ mongoose

const productSchema = new Schema(
  {
    title: String,
    image: String,
    price: Number,
    description: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    startAt: Date,
    endAt: Date,
    bidTime: Number,
    bidPriceMax: {
      type: Number,
      default: 0,
    },
    bids: [
      {
        type: Schema.Types.ObjectId,
        ref: "Bid",
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model("Product", productSchema);
