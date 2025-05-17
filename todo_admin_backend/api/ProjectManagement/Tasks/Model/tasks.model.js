// Imports & Configs
const mongoose = require("mongoose");

// User Schema
const tasksSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    assign_to: {
      type: String,
      ref: "user",
    },
    createdBy: {
      type: String,
      required: true,
      ref: "user",
    },
    tag: {
      type: String,
      required: true,
      ref: "tag",
    },
    priority: {
      type: String,
      required: true,
      ref: "priority",
    },
    status: {
      type: String,
      required: true,
      ref: "status",
    },
    task_createDate: {
      type: String,
    },
    status_changeInfo: {
      type: Array,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("task", tasksSchema);
