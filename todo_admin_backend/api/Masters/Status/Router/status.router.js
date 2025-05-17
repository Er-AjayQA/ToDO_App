// Imports & Configs
const express = require("express");
const router = express.Router();
const StatusController = require("../Controller/status.controller");
const authenticateToken = require("../../../../helpers/authentication");

// Defines Routers
router.post("/create", authenticateToken, StatusController.create);
router.post("/get-all", authenticateToken, StatusController.getAll);

// Export Router
module.exports = router;
