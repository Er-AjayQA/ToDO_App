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
      default: null,
    },
    create_date: {
      type: String,
      default: Date.now(),
    },
    start_date: {
      type: String,
      default: null,
    },
    estimated_end_time: {
      type: String,
      default: null,
    },
    company_id: {
      type: String,
      required: true,
      ref: "company",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("project", projectsSchema);
