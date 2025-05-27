// Imports & Configs
const CompanyModel = require("../../../CompanyManagement/Model/company.model");
const ProjectModel = require("../../Projects/Model/projects.model");
const TaskModel = require("../Model/tasks.model");

// Create Task Controller
exports.createTask = async (req, res) => {
  const data = req.body;
  const paramData = req?.params;

  try {
    const isCompanyExist = await CompanyModel.findOne({
      _id: req?.user?.companyId,
      isDeleted: false,
      isActive: true,
    });

    if (!isCompanyExist) {
      return res.status(201).json({
        success: false,
        message: "Company not found!!",
      });
    } else {
      const isProjectExist = await ProjectModel.findOne({
        slug: paramData.project_slug,
      });

      if (!isProjectExist) {
        return res.status(201).json({
          success: false,
          message: "Project not found!!",
        });
      } else {
        let statusChangeInfo = {
          changeDate: new Date(),
          changedBy: req?.user?.id,
        };
        const newTask = await TaskModel({
          ...data,
          companyId: req?.user?.companyId,
          projectId: isProjectExist._id,
          task_createDate: new Date().toISOString(),
          status_changeInfo: [statusChangeInfo],
          createdBy: req?.user?.id,
        }).save();

        return res.status(201).json({
          success: true,
          message: "Task created successfully!!",
          data: newTask,
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

// Get All Tasks Controller
exports.getAllTasks = async (req, res) => {
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
