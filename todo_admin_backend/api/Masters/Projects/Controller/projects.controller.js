// Imports & Configs
const ProjectModel = require("../Model/projects.model");

// Create Project Controller
exports.create = async (req, res) => {
  const data = req.body;
  let usersList = [req.user.id];
  try {
    const isProjectExist = await ProjectModel.findOne({ name: data.name });

    if (isProjectExist) {
      return res.status(201).json({
        success: false,
        message: "Project already existed!!",
      });
    } else {
      const newProject = await ProjectModel({
        ...data,
        users: usersList,
        createdBy: req.user.id,
      }).save();

      return res.status(201).json({
        success: true,
        message: "Project created successfully!!",
        data: newProject,
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

// Get All Project Controller
exports.getAll = async (req, res) => {
  const filter = {};

  try {
    const getAllProjects = await ProjectModel.find().populate([
      {
        path: "users",
        select: ["username", "email"],
      },
      {
        path: "createdBy",
        select: ["username", "email"],
      },
    ]);

    if (getAllProjects.length <= 0) {
      return res.status(201).json({
        success: false,
        message: "No Projects Found!!",
      });
    } else {
      return res.status(201).json({
        success: true,
        message: "Data fetched successfully!!",
        data: getAllProjects,
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
