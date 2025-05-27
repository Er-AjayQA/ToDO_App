// Imports & Configs
const express = require("express");
const router = express.Router();
const TaskController = require("../Controller/tasks.controller");
const authenticateToken = require("../../../../helpers/authentication");

// Defines Routers
router.post(
  "/:project_slug/create_task",
  authenticateToken,
  TaskController.createTask
);
router.post(
  "/:company_slug/:project_slug/get-all-tasks",
  authenticateToken,
  TaskController.getAllTasks
);

// Export Router
module.exports = router;
