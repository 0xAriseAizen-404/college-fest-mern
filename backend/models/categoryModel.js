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
    image: { type: String, default: "https://via.placeholder.com/300x300" },
    date: { type: Date, default: Date.now, required: true },
    minimum: { type: Number, default: 1, required: true },
    maximum: { type: Number, default: 1, required: true },
    isTechnical: {
      type: Boolean,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Category", categorySchema);
