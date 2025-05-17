// Imports & Configs
const express = require("express");
const router = express.Router();
const PriorityController = require("../Controller/priority.controller");
const authenticateToken = require("../../../../helpers/authentication");

// Defines Routers
router.post("/create", authenticateToken, PriorityController.create);
router.post("/get-all", authenticateToken, PriorityController.getAll);

// Export Router
module.exports = router;
