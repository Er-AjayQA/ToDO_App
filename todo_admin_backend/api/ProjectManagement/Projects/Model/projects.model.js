// Imports & Configs
const mongoose = require("mongoose");

// User Schema
const projectsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    users: {
      type: Array,
      required: true,
      ref: "user",
    },
    createdBy: {
      type: String,
      required: true,
      ref: "user",
    },
    tasks: {
      type: Array,
      ref: "task",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("project", projectsSchema);
