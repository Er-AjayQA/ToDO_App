// Imports & Configs
require("dotenv").config();
const generateOTP = require("../../../helpers/generateOTP");
const sendMail = require("../../../helpers/mailConfig");
const CompanyModel = require("../Model/company.model");

// Register Company Controller
exports.registerCompany = async (req, res) => {
  let data = req.body;

  try {
    let isCompanyExisting = await CompanyModel.findOne({
      company_name: data.company_name,
      isDeleted: false,
    });

    if (isCompanyExisting) {
      return res.status(201).json({
        success: false,
        message: "Company already registered!!",
      });
    } else {
      let OTP = generateOTP();
      const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);
      let mailData = {
        to: data.email,
        subject: "OTP Verification",
        body: `Please use the below OTP for verification. ${OTP}`,
      };
      await sendMail(mailData);

      let newData = await CompanyModel({ ...data, otp: OTP, otpExpiry }).save();

      return res.status(201).json({
        success: true,
        message: "OTP Sent to your mail!!",
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

// Verify Company Register OTP Controller
exports.verifyOTP = async (req, res) => {
  const { otp } = req.body;
  const companyId = req.params.id;

  try {
    let isCompanyExisting = await CompanyModel.findById(companyId);

    if (!isCompanyExisting) {
      return res.status(201).json({
        success: false,
        message: "Company not found!!",
      });
    } else {
      // Check if OTP is expired
      if (isCompanyExisting.otpExpiry < new Date()) {
        return res.status(400).json({
          success: false,
          message: "OTP has expired!",
        });
      }

      // Verify OTP
      if (isCompanyExisting.otp !== otp) {
        return res.status(400).json({
          success: false,
          message: "Invalid OTP!",
        });
      }

      const registerUrl = `http://localhost:5173/todo/${isCompanyExisting._id}/register`;
      await CompanyModel.findByIdAndUpdate(companyId, {
        registerUrl,
        isActive: true,
        otp: null,
        otpExpiry: null,
      });

      return res.status(200).json({
        success: true,
        message: "Company registered successfully!",
        registerUrl,
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
