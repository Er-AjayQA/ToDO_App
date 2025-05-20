// Imports & Configs
const mongoose = require("mongoose");

// Company Schema
const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    invitationUrl: {
      type: String,
    },
    otp: {
      type: Number,
    },
    otpExpiry: {
      type: String,
    },
    otpVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("company", companySchema);
