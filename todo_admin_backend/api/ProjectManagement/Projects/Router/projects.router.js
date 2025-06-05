// Imports & Configs
const express = require("express");
const router = express.Router();
const ProjectController = require("../Controller/projects.controller");
const authenticateToken = require("../../../../helpers/authentication");

// Defines Routers
router.post(
  "/projects/create",
  authenticateToken,
  ProjectController.createProject
);
router.post("/update/:id", authenticateToken, ProjectController.updateProject);
router.post(
  "/:company_id/projects/get_all",
  authenticateToken,
  ProjectController.getAllProject
);
router.post(
  "/get_by_id/:slugId",
  authenticateToken,
  ProjectController.getProjectById
);

// Export Router
module.exports = router;
