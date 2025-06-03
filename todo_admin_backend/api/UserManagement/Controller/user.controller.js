// Imports & Configs
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const UserModel = require("../Model/user.model");
const CompanyModel = require("../../CompanyManagement/Model/company.model");
const salt = 10;

// User Register Controller
exports.register = async (req, res) => {
  const data = req.body;
  const companyId = req?.params?.id;
  try {
    let isCompanyExist = await CompanyModel.findOne({
      isDeleted: false,
      isActive: true,
    });

    if (!isCompanyExist) {
      return res.status(201).json({
        success: false,
        message: "Company not found!!",
      });
    }

    let isUserAlreadyExist = await UserModel.findOne({
      email: data.email,
      company_id: companyId,
      isDeleted: false,
    });

    if (isUserAlreadyExist) {
      return res.status(201).json({
        success: false,
        message: "User Already Exist!!",
      });
    }

    let hashedPassword = await bcrypt.hash(data.password, salt);
    data.avatar = data.firstName.slice(0, 1) + data.lastName.slice(0, 1);

    const registerUser = await UserModel({
      ...data,
      password: hashedPassword,
      company_id: companyId,
    }).save();

    return res.status(201).json({
      success: true,
      message: "User Registered successfully!!",
      data: registerUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!!",
      errorMessage: error.message,
    });
  }
};

// User Login Controller
exports.login = async (req, res) => {
  const data = req.body;

  try {
    let userExist = await UserModel.findOne({
      email: data.email,
      isDeleted: false,
    });

    if (!userExist) {
      return res.status(201).json({
        success: false,
        message: "User not exist!!",
      });
    } else {
      const companyData = await CompanyModel.findOne({
        _id: userExist.company_id,
        isDeleted: false,
        isActive: true,
      });

      let passwordMatch = await bcrypt.compare(
        data.password,
        userExist.password
      );

      if (passwordMatch) {
        let userDetails = {
          id: userExist._id,
          name: userExist.firstName + " " + userExist.lastName,
          email: userExist.email,
          company_id: userExist.company_id,
          avatar: userExist.avatar,
        };
        const token = jwt.sign(userDetails, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        userExist.login_dates.push(Date.now());
        await userExist.save();

        return res.status(201).json({
          success: true,
          message: "Login Successfully!!",
          token,
        });
      } else {
        return res.status(201).json({
          success: false,
          message: "Invalid Credentials!!",
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
