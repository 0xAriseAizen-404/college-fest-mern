import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true, default: "" },
    date: { type: Date, required: true },
    image: { type: String, default: "https://via.placeholder.com/300x300" },
    noOfDays: { type: Number, required: true },
    location: { type: String, default: "RVRJCCE" },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
