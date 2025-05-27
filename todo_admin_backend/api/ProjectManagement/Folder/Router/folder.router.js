// Imports & Configs
const express = require("express");
const router = express.Router();
const BacklogController = require("../Controller/folder.controller");
const authenticateToken = require("../../../../helpers/authentication");

// Defines Routers
router.post(
  "/:project_slug/folders/create_folder",
  authenticateToken,
  BacklogController.createFolder
);

// Export Router
module.exports = router;
