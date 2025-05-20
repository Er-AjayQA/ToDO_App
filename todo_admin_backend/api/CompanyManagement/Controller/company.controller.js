// Imports & Configs
require("dotenv").config();
const generateOTP = require("../../../helpers/generateOTP");
const generateUniqueSlug = require("../../../helpers/generateSlug");
const sendMail = require("../../../helpers/mailConfig");
const CompanyModel = require("../Model/company.model");

// Register Company Controller
exports.registerCompany = async (req, res) => {
  let data = req.body;

  try {
    let isCompanyExisting = await CompanyModel.findOne({
      name: data.name,
      email: data.email,
      isDeleted: false,
    });

    if (isCompanyExisting) {
      return res.status(201).json({
        success: false,
        message: "Company already registered!!",
      });
    } else {
      let slug = await generateUniqueSlug(data.name, CompanyModel);
      let OTP = generateOTP();
      const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);
      let mailData = {
        to: data.email,
        subject: "ToDO OTP Verification",
        body: `<div>
        <p>Congratulation! You are one step away to experience the wonderful roadmap to manage your work.</p>
        <span>Use the OTP to complete the registration: <b>${OTP}</b></span>
        </div>`,
      };
      await sendMail(mailData);

      let newData = await CompanyModel({
        ...data,
        slug,
        otp: OTP,
        otpExpiry,
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
      if (isCompanyExisting.otpVerified) {
        return res.status(400).json({
          success: false,
          message: "OTP already verified!",
        });
      }

      if (isCompanyExisting.otpExpiry < new Date()) {
        // Check if OTP is expired
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
        const invitationUrl = `http://localhost:5173/todo/invite/${isCompanyExisting.slug}/register`;
        const updatedData = await CompanyModel.findByIdAndUpdate(
          companyId,
          {
            invitationUrl,
            isActive: true,
            otpVerified: true,
            otp: null,
            otpExpiry: null,
          },
          { new: true }
        );

        return res.status(200).json({
          success: true,
          message: "Company registered successfully!",
          data: updatedData,
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

// Generate Invitation Link Controller
exports.generateInvitationLink = async (req, res) => {
  const data = req.body;
  const companyId = req.params.id;

  try {
    let isCompanyExisting = await CompanyModel.findById(companyId);

    if (!isCompanyExisting) {
      return res.status(201).json({
        success: false,
        message: "Company not found!!",
      });
    } else {
      const invitationUrl = isCompanyExisting.invitationUrl;

      let mailData = {
        to: data.email,
        subject: `Invitation for ${isCompanyExisting.name} ToDo Platform.`,
        body: `<div>
        <p>You are invited to join the team.</p>
        <span>Use the following link to register yourself: <a href=${invitationUrl}>Register</a></span>
        </div>`,
      };
      await sendMail(mailData);

      return res.status(200).json({
        success: true,
        message: "Invitation link generated successfully!",
        data: { invitationUrl },
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

// Get Companies List Controller
exports.getAllCompanies = async (req, res) => {
  let filter = { isDeleted: false, isActive: true };
  let limit = req?.body?.limit || 10;

  try {
    let getAllData = await CompanyModel.find(filter).limit(limit);

    if (getAllData.length < 1) {
      return res.status(200).json({
        success: false,
        message: "No data found!!",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Companies List!!",
        totalRecords: getAllData.length,
        totalPages: Math.ceil(getAllData.length / limit),
        data: getAllData,
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
exports.getCompanyDetails = async (req, res) => {
  let filter = { isDeleted: false, isActive: true };
  filter._id = req?.params?.id;

  try {
    let getData = await CompanyModel.findOne(filter);

    if (!getData) {
      return res.status(200).json({
        success: false,
        message: "No data found!!",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Company details found successfully!!",
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
