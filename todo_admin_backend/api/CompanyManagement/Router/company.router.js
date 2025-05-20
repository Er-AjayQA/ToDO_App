// Imports & Configs
const express = require("express");
const router = express.Router();
const CompanyController = require("../Controller/company.controller");

// Defines Routers
router.post("/register", CompanyController.registerCompany);
router.post("/verifyOTP/:id", CompanyController.verifyOTP);
router.post(
  "/generate-invitation-link/:id",
  CompanyController.generateInvitationLink
);

// Export Router
module.exports = router;
