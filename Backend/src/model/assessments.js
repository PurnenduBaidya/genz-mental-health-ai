import mongoose from "mongoose";
import User from "./user.js";

const assessmentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      require: true,
    },
    type: {
      type: String,
      enum: ["PHQ-9", "GAD-7"],
      required: true,
    },

    answers: {
      type: [Number],
      required: true,
    },

    score: {
      type: Number,
      required: true,
    },

    severity: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const assessment = mongoose.model("assessment", assessmentSchema);

export default assessment;
