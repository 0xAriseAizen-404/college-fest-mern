import mongoose from "mongoose";

const eventSchema = mongoose.Schema(
  {
    title: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true, default: "" },
    date: { type: Date, required: true },
    image: {
      type: String,
      default: "https://via.placeholder.com/300x300",
    },
    noOfDays: { type: Number, required: true },
    location: {type: String, default: "RVRJCCE"},
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

// Ensure indexes are created
eventSchema.index({ title: 1 }, { unique: true });

export default mongoose.model("Event", eventSchema);
