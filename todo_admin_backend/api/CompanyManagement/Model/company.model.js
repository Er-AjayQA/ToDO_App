// Imports & Configs
const mongoose = require("mongoose");

// User Schema
const companySchema = new mongoose.Schema(
  {
    company_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    registerUrl: {
      type: String,
    },
    allProjects: {
      type: Array,
      ref: "project",
      default: [],
    },
    allUsers: {
      type: Array,
      ref: "user",
      default: [],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("company", companySchema);
