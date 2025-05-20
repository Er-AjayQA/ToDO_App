// Imports & Configs
const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
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
    role: {
      type: String,
      enum: ["admin", "manager", "user"],
      default: "user",
    },
    avatar: {
      type: String,
    },
    company_id: {
      type: String,
      required: true,
      ref: "company",
    },
    project_ids: {
      type: Array,
      ref: "project",
      default: [],
    },
    task_ids: {
      type: Array,
      ref: "task",
      default: [],
    },
    login_dates: {
      type: Array,
      default: [],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
