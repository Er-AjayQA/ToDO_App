// Imports & Configs
const express = require("express");
const router = express.Router();
const UserController = require("../Controller/user.controller");
const authenticateToken = require("../../../helpers/authentication");

// Defines Routers
router.post("/register/:id", UserController.register);
router.post("/login", UserController.login);

// Export Router
module.exports = router;
