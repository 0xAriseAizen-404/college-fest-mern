import mongoose from "mongoose";

const eventSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true, default: "" },
    date: { type: Date, required: true },
    noOfDays: { type: Number, required: true },
    image: { type: String, default: "https://via.placeholder.com/400x600" },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Event", eventSchema);
