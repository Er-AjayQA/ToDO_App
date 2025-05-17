// Imports & Configs
const express = require("express");
const router = express.Router();
const ProjectController = require("../Controller/projects.controller");
const authenticateToken = require("../../../../helpers/authentication");

// Defines Routers
router.post("/create", authenticateToken, ProjectController.create);
router.post("/get-all", authenticateToken, ProjectController.getAll);

// Export Router
module.exports = router;
