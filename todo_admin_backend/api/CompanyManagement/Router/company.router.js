// Imports & Configs
const express = require("express");
const router = express.Router();
const CompanyController = require("../Controller/company.controller");
const multer = require("multer");
const upload = multer();

// Defines Routers
router.post("/register", CompanyController.registerCompany);
router.post("/verifyOTP/:id", CompanyController.verifyOTP);
router.post(
  "/generate-invitation-link/:id",
  CompanyController.generateInvitationLink
);
router.post(
  "/get-details/:id",
  upload.none(),
  CompanyController.getCompanyDetails
);
router.post("/get-companies-details/", CompanyController.getAllCompanies);
router.get(
  "/check_company_existence/:id",
  CompanyController.checkCompanyExistence
);

// Export Router
module.exports = router;
