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
    company_id: {
      type: String,
      required: true,
      ref: "company",
    },
    create_date: {
      type: String,
      required: true,
    },
    deadline: {
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

module.exports = mongoose.model("project", projectsSchema);
