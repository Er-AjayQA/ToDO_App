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
      default: null,
    },
    company_id: {
      type: String,
      required: true,
      ref: "company",
    },
    project_id: {
      type: String,
      required: true,
      ref: "project",
    },
    folder_id: {
      type: String,
      required: true,
      ref: "folder",
    },
    assign_to: {
      type: String,
      ref: "user",
      default: null,
    },
    created_by: {
      type: String,
      required: true,
      ref: "user",
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
    create_on: {
      type: String,
      default: () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, "0");
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const year = today.getFullYear();
        return `${day}-${month}-${year}`;
      },
    },
    start_date: {
      type: String,
      default: null,
    },
    end_date: {
      type: String,
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
