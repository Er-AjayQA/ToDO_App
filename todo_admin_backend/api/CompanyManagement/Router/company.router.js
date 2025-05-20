// Imports & Configs
const express = require("express");
const router = express.Router();
const CompanyController = require("../Controller/company.controller");

// Defines Routers
router.post("/register", CompanyController.registerCompany);
router.post("/verifyOTP/:id", CompanyController.verifyOTP);
router.post("/get-all-companies", CompanyController.getAllCompanyList);
router.post("/get-by-id/:companyId", CompanyController.getDetailsById);
// router.post("/add-user/:projectId", CompanyController.addUser);

// Export Router
module.exports = router;
