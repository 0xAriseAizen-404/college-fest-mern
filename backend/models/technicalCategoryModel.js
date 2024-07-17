import mongoose from "mongoose";

const technicalCategorySchema = mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    noOfParticipants: {
      type: Number,
      required: true,
    },
    mainParticipant: {
      name: {
        type: String,
        required: true,
      },
      branch: {
        type: String,
        required: true,
      },
      rollNo: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
    },
    coParticipants: [
      {
        name: {
          type: String,
          required: true,
        },
        branch: {
          type: String,
          required: true,
        },
        rollNo: {
          type: String,
          required: true,
        },
      },
    ],
    college: {
      type: String,
      default: "RVR & JC Colle od Engineering",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("TechnicalCategory", technicalCategorySchema);
