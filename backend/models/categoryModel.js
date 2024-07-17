import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true, default: "" },
    
    date: { type: Date, default: Date.now, required: true },image: {
      type: String,
      required: true,
      default: "https://via.placeholder.com/400x400",
    },
    minimum: { type: Number, default: 1, required: true },
    maximum: { type: Number, default: 1, required: true },
    prices: {
      price1: {
        type: Number,
        default: 0,
      },
      price2: {
        type: Number,
        default: 0,
      },
      price3: {
        type: Number,
        default: 0,
      },
    },
    isTechnical: {
      type: Boolean,
      required: true,
      default: false,
    },
    duration: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Category", categorySchema);
