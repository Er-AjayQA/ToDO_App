// Imports & Configs
const express = require("express");
const router = express.Router();
const TagController = require("../Controller/tags.controller");
const authenticateToken = require("../../../../helpers/authentication");

// Defines Routers
router.post("/create", authenticateToken, TagController.create);
router.post("/get-all", authenticateToken, TagController.getAll);

// Export Router
module.exports = router;
