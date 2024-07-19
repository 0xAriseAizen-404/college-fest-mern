import mongoose from "mongoose";

const technicalCategorySchema = mongoose.Schema(
  {
    event: { type: String, required: true },
    category: { type: String, required: true },
    noOfParticipants: { type: Number, required: true },
    mainParticipant: {
      name: { type: String, required: true },
      branch: { type: String, required: true },
      rollNo: { type: String, required: true },
      email: { type: String, required: true },
      phoneNumber: { type: String, required: true },
    },
    coParticipants: [
      {
        name: { type: String, required: true },
        branch: { type: String, required: true },
        rollNo: { type: String, required: true },
      },
    ],
    college: { type: String, default: "RVR & JC College of Engineering" },
  },
  { timestamps: true }
);

export default mongoose.model("TechnicalCategory", technicalCategorySchema);
