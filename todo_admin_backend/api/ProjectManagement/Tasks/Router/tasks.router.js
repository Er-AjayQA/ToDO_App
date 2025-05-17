// Imports & Configs
const express = require("express");
const router = express.Router();
const TaskController = require("../Controller/tasks.controller");
const authenticateToken = require("../../../../helpers/authentication");

// Defines Routers
router.post("/create", authenticateToken, TaskController.create);
router.post("/get-all", authenticateToken, TaskController.getAll);

// Export Router
module.exports = router;
