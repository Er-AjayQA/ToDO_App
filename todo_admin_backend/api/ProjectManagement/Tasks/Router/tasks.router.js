// Imports & Configs
const express = require("express");
const router = express.Router();
const TaskController = require("../Controller/tasks.controller");
const authenticateToken = require("../../../../helpers/authentication");

// Defines Routers
router.post(
  "/:project_id/:folder_id/tasks/create_task",
  authenticateToken,
  TaskController.createTask
);
router.post(
  "/tasks/update_task/:task_id",
  authenticateToken,
  TaskController.updateTask
);
router.post(
  "/tasks/get_all_tasks",
  authenticateToken,
  TaskController.getAllTasks
);

// Export Router
module.exports = router;
