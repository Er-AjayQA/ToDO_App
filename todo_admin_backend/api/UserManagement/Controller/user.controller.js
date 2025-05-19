// Imports & Configs
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const UserModel = require("../Model/user.model");
const ProjectModel = require("../../ProjectManagement/Projects/Model/projects.model");
const salt = 10;

// User Register Controller
exports.register = async (req, res) => {
  const data = req.body;
  try {
    let isUserAlreadyExist = await UserModel.findOne({
      email: data.username,
      isDeleted: false,
    });

    if (isUserAlreadyExist) {
      return res.status(201).json({
        success: false,
        message: "User Already Exist!!",
      });
    }

    let hashedPassword = await bcrypt.hash(data.password, salt);

    let allProjects;

    if (data.role === "superadmin") {
      let allExistingProjects = await ProjectModel.find({ isDeleted: false });

      if (allExistingProjects.length >= 1) {
        allProjects.map((project) => project._id);
      } else {
        allProjects = [];
      }
    } else {
      allProjects = [];
    }

    const registerUser = await UserModel.create({
      ...data,
      password: hashedPassword,
      myProjects: allProjects,
    }).save;

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
