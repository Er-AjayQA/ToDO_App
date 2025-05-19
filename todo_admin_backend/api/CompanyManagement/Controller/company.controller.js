// Imports & Configs
require("dotenv").config();
const CompanyModel = require("../Model/company.model");

// Register Company Controller
exports.registerCompany = async (req, res) => {
  let data = req.body;
  try {
    let isCompanyExisting = await CompanyModel.find({
      email: data.email,
      isDeleted: false,
    });

    if (isCompanyExisting.length >= 1) {
      return res.status(201).json({
        success: false,
        message: "Company already registered!!",
      });
    } else {
      let newData = await CompanyModel(data).save();

      const registerUrl = `http://localhost:5173/todo/${newData._id}/register`;
      await CompanyModel.findByIdAndUpdate(newData._id, {
        registerUrl,
      });
      return res.status(201).json({
        success: true,
        message: "Company Registered successfully!!",
        data: newData,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!!",
      errorMessage: error.message,
    });
  }
};
