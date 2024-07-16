import mongoose from "mongoose";

const nonTechnicalCategorySchema = mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    title: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    noOfMembers: { type: Number, required: true },
    participant: {
      name: { type: String, required: true },
      branch: { type: String },
      rollNo: { type: String },
    },
    college: { type: String, required: true },
    coParticipants: [
      {
        name: { type: String, required: true },
        rollNo: { type: String },
        branch: { type: String },
      },
    ],
    participantPhoneNumber: { type: String, required: true },
    participantEmail: { type: String, required: true },
    audio: { type: String },
    danceType: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "NonTechnicalCategory",
  nonTechnicalCategorySchema
);
