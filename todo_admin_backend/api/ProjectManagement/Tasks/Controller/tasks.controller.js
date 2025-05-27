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

  try {
    let limit = parseInt(req?.body?.limit) || 10;
    let sort = data?.sort || "asc";
    if (limit < 1) limit = 10;

    const projectSlug = req?.params?.project_slug;

    if (data?.status) {
      filter.status = data?.status;
    }

    if (data?.priority) {
      filter.priority = data?.priority;
    }

    if (data?.Severity) {
      filter.Severity = data?.Severity;
    }

    if (data?.createdBy) {
      filter.createdBy = data?.createdBy;
    }

    const getProjectDetails = await ProjectModel.findOne({
      slug: projectSlug,
      isDeleted: false,
    });

    if (!getProjectDetails) {
      return res.status(201).json({
        success: false,
        message: "No Projects Found!!",
      });
    } else {
      filter.projectId = getProjectDetails._id;

      const getAllTasks = await TaskModel.find(filter)
        .populate([
          {
            path: "companyId",
            select: ["name", "slug"],
          },
          {
            path: "projectId",
            select: ["name", "slug"],
          },
        ])
        .limit(limit)
        .sort({ _id: sort });

      if (getAllTasks.length <= 0) {
        return res.status(201).json({
          success: false,
          message: "No Tasks Found!!",
        });
      } else {
        return res.status(201).json({
          success: true,
          message: "Data fetched successfully!!",
          records: getAllTasks.length,
          data: getAllTasks,
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
