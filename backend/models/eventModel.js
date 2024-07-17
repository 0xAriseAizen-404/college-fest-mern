import mongoose from "mongoose";

const eventSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true, default: "" },
    date: { type: Date, required: true },
    image: {
      type: String,
      required: true,
      default: "https://via.placeholder.com/400x400",
    },
    noOfDays: { type: Number, required: true },
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
