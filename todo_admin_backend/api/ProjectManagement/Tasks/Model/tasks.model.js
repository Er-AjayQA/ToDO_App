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
    companyId: {
      type: String,
      required: true,
      ref: "company",
    },
    projectId: {
      type: String,
      required: true,
      ref: "project",
    },
    assign_to: {
      type: String,
      ref: "user",
      default: "",
    },
    createdBy: {
      type: String,
      required: true,
      ref: "user",
    },
    Severity: {
      type: String,
      enum: ["S1", "S2", "S3"],
      default: "S3",
    },
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Low",
    },
    status: {
      type: String,
      enum: ["Pending", "In-Progress", "Hold", "Completed"],
      default: "Pending",
    },
    task_createDate: {
      type: String,
      value: Date.now(),
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
