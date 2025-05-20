// Imports & Configs
require("dotenv").config();
const bcrypt = require("bcrypt");
const generateOTP = require("../../../helpers/generateOTP");
const sendMail = require("../../../helpers/mailConfig");
const CompanyModel = require("../Model/company.model");
const UserModel = require("../../UserManagement/Model/user.model");
const salt = 10;

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

      let hashedPassword = await bcrypt.hash(data.password, salt);

      let newData = await CompanyModel({
        ...data,
        otp: OTP,
        otpExpiry,
        password: hashedPassword,
        role: "admin",
      }).save();

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
      } else {
        const registerUrl = `http://localhost:5173/todo/${isCompanyExisting._id}/register`;
        await CompanyModel.findByIdAndUpdate(companyId, {
          registerUrl,
          isActive: true,
          otp: null,
          otpExpiry: null,
        });

        const newUser = await UserModel.create({
          username: isCompanyExisting.email.split("@")[0],
          email: isCompanyExisting.email,
          role: "admin",
          password: isCompanyExisting.password,
          myProjects: [],
          myTasks: [],
          company_details: [isCompanyExisting._id],
        });

        // Add this user to company's allUsers array
        await CompanyModel.findByIdAndUpdate(companyId, {
          $push: { allUsers: newUser._id },
        });

        return res.status(200).json({
          success: true,
          message: "Company registered successfully!",
          registerUrl,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!!",
      errorMessage: error.message,
    });
  }
};

// Get Company Details Controller
exports.getAllCompanyDetails = async (req, res) => {
  let data = req.body;
  let filter = { isDeleted: false, isActive: true };

  try {
    let allData = await CompanyModel.find(filter).populate([
      {
        path: "allProjects",
      },
      { path: "allUsers", select: "-password" },
    ]);

    if (allData.length < 1) {
      return res.status(201).json({
        success: false,
        message: "No companies found!!",
      });
    } else {
      return res.status(201).json({
        success: true,
        message: "Get companies list!!",
        data: allData,
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

// Get Company Details Controller
exports.getDetailsById = async (req, res) => {
  let data = req.body;
  let companyId = req.params.companyId;
  let filter = { isDeleted: false, isActive: true };
  filter._id = companyId;

  try {
    let getData = await CompanyModel.findOne(filter).populate([
      {
        path: "allProjects",
      },
      { path: "allUsers", select: "-password" },
    ]);

    if (!getData) {
      return res.status(201).json({
        success: false,
        message: "No companies found!!",
      });
    } else {
      return res.status(201).json({
        success: true,
        message: "Get company Details!!",
        data: getData,
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
