import mongoose from "mongoose";

const nonTechnicalCategorySchema = mongoose.Schema(
  {
    event: { type: String, required: true },
    category: { type: String, required: true },
    noOfMembers: { type: Number, required: true },
    mainParticipant: {
      name: { type: String, required: true },
      branch: { type: String },
      rollNo: { type: String },
      email: { type: String, required: true },
      phoneNumber: { type: String, required: true },
    },
    college: { type: String, required: true },
    coParticipants: [
      {
        name: { type: String, required: true },
        rollNo: { type: String },
        branch: { type: String },
      },
    ],
    audio: { type: String }, // URL from Cloudinary
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
