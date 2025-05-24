// Imports & Configs
const express = require("express");
const router = express.Router();
const ProjectController = require("../Controller/projects.controller");
const authenticateToken = require("../../../../helpers/authentication");

// Defines Routers
router.post("/create", authenticateToken, ProjectController.createProject);
router.post(
  "/update/:slugId",
  authenticateToken,
  ProjectController.updateProject
);
router.post("/get-all", authenticateToken, ProjectController.getAllProject);
router.post(
  "/get-by-id/:slugId",
  authenticateToken,
  ProjectController.getProjectById
);

// Export Router
module.exports = router;
