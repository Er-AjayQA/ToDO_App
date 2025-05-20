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
        const invitationUrl = `http://localhost:5173/todo/invite/${isCompanyExisting._id}`;
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
