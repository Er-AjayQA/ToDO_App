// Imports & Configs
const ProjectModel = require("../../Projects/Model/projects.model");
const FolderModel = require("../../Folder/Model/folder.model");
const TaskModel = require("../Model/tasks.model");

// Create Task Controller
exports.createTask = async (req, res) => {
  const data = req.body;
  const { project_id, folder_id } = req?.params;
  try {
    const isFolderExist = await FolderModel.findOne({
      _id: folder_id,
      project_id: project_id,
      isDeleted: false,
    });

    if (!isFolderExist) {
      return res.status(201).json({
        success: false,
        message: "Folder not found!!",
      });
    } else {
      const newTask = await TaskModel({
        ...data,
        company_id: req?.user?.company_id,
        project_id: project_id,
        folder_id: folder_id,
        created_by: req?.user?.id,
      }).save();

      return res.status(201).json({
        success: true,
        message: "Task created successfully!!",
        data: newTask,
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

// Update Task Controller
exports.updateTask = async (req, res) => {
  const data = req.body;
  const { task_id } = req?.params;
  try {
    const isTaskExist = await TaskModel.findOne({
      _id: task_id,
      isDeleted: false,
    });

    if (!isTaskExist) {
      return res.status(201).json({
        success: false,
        message: "Task not found!!",
      });
    } else {
      Object.keys(data).forEach((key) => {
        if (key in isTaskExist && key !== "_id" && key !== "isDeleted") {
          isTaskExist[key] = data[key];
        }
      });

      await isTaskExist.save();

      return res.status(201).json({
        success: true,
        message: "Task updated successfully!!",
        data: isTaskExist,
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
