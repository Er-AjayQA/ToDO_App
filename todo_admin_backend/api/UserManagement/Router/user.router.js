// Imports & Configs
const express = require("express");
const router = express.Router();
const UserController = require("../Controller/user.controller");
const authenticateToken = require("../../../helpers/authentication");

// Defines Routers
router.post("/register/:companyId", UserController.register);
router.post("/login", UserController.login);
router.post("/get-all-users/:userId", UserController.getAllUserList);

// Export Router
module.exports = router;
