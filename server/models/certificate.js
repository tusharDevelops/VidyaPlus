const mongoose = require("mongoose")

const certificateSchema = new mongoose.Schema(
  {
    certificateNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },
    issuedAt: {
      type: Date,
      default: Date.now,
    },
    completionSnapshot: {
      userName: { type: String, required: true },
      courseName: { type: String, required: true },
    },
    approved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

certificateSchema.index({ userId: 1, courseId: 1 }, { unique: true })

module.exports = mongoose.model("Certificate", certificateSchema)

