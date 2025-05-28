// Imports & Configs
const express = require("express");
const router = express.Router();
const FolderController = require("../Controller/folder.controller");
const authenticateToken = require("../../../../helpers/authentication");

// Defines Routers
router.post(
  "/:project_id/folders/create_folder",
  authenticateToken,
  FolderController.createFolder
);
router.post(
  "/:project_id/folders/update_folder/:id",
  authenticateToken,
  FolderController.updateFolder
);
router.post(
  "/:project_id/folders/get_all_folders",
  authenticateToken,
  FolderController.getAllFolders
);
// Export Router
module.exports = router;
