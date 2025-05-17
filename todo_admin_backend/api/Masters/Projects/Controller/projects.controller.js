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
  const data = req.body;
  const filter = { isDeleted: false };
  let limit = parseInt(req?.body?.limit) || 10;
  let sort = req?.body?.sort || "asc";

  if (limit < 1) limit = 10;

  if (data.name != "" && data.name != undefined) {
    var nameRegex = new RegExp(data.name, "i");
    filter.name = nameRegex;
  }

  try {
    const getAllProjects = await ProjectModel.find(filter)
      .populate([
        {
          path: "users",
          select: ["username", "email"],
        },
        {
          path: "createdBy",
          select: ["username", "email"],
        },
      ])
      .limit(limit)
      .sort({ _id: sort });

    if (getAllProjects.length <= 0) {
      return res.status(201).json({
        success: false,
        message: "No Projects Found!!",
      });
    } else {
      return res.status(201).json({
        success: true,
        message: "Data fetched successfully!!",
        records: getAllProjects.length,
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
