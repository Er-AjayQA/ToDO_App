// Imports & Configs
const express = require("express");
const router = express.Router();
const CompanyController = require("../Controller/company.controller");

// Defines Routers
router.post("/register", CompanyController.registerCompany);
router.post("/verifyOTP/:id", CompanyController.verifyOTP);

// Export Router
module.exports = router;
