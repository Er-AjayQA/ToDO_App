// Imports & Configs
const mongoose = require("mongoose");

// Folder Schema
const folderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    company_slug: {
      type: String,
    },
    project_slug: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("folder", folderSchema);
