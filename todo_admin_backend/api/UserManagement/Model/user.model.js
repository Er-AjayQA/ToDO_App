// Imports & Configs
const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    assignedProjects: {
      type: Array,
      ref: "project",
    },
    currentActiveProject: {
      type: String,
      ref: "project",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
