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
  const companyId = req.params.companyId;
  try {
    let userMailRegisterWithCompany = await CompanyModel.findOne({
      email: data.email,
      isDeleted: false,
      isActive: true,
    });

    if (userMailRegisterWithCompany) {
      return res.status(201).json({
        success: false,
        message: "EmailId Already registered!!",
      });
    }

    let isUserAlreadyExist = await UserModel.findOne({
      username: data.username,
      email: data.email,
      isDeleted: false,
    });

    if (isUserAlreadyExist) {
      return res.status(201).json({
        success: false,
        message: "User Already Exist!!",
      });
    }

    let hashedPassword = await bcrypt.hash(data.password, salt);

    const registerUser = await UserModel({
      ...data,
      password: hashedPassword,
      company_details: companyId,
    }).save();

    let allUsers = [];
    allUsers.push(registerUser._id);

    await CompanyModel.findByIdAndUpdate(companyId, {
      allUsers: allUsers,
    });

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
      $or: [{ email: data.username }, { username: data.username }],
      isDeleted: false,
    });

    if (!userExist) {
      return res.status(201).json({
        success: false,
        message: "User not exist!!",
      });
    } else {
      let passwordMatch = await bcrypt.compare(
        data.password,
        userExist.password
      );

      if (passwordMatch) {
        let userDetails = {
          id: userExist._id,
          username: userExist.username,
          email: userExist.email,
          companyId: userExist.company_details,
        };
        const token = jwt.sign(userDetails, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

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

// Get User Details By ID Controller
exports.getAllUserList = async (req, res) => {
  let data = req.body;
  let filter = { isDeleted: false };

  try {
    filter._id = req?.params?.userId;
    let allData = await UserModel.find(filter).populate([
      {
        path: "company_details",
      },
      { path: "myProjects" },
      { path: "myTasks" },
    ]);

    if (allData.length < 1) {
      return res.status(201).json({
        success: false,
        message: "No users found!!",
      });
    } else {
      return res.status(201).json({
        success: true,
        message: "Get users list!!",
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
