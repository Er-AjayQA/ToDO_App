// Imports & Configs
const mongoose = require("mongoose");

// Task Schema
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
    folderId: {
      type: String,
      required: true,
      ref: "folder",
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
      default: null,
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
      type: Date,
      default: Date.now,
    },
    task_startDate: {
      type: Date,
      default: Date.now,
      default: null,
    },
    task_endDate: {
      type: Date,
      default: Date.now,
      default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("task", tasksSchema);
