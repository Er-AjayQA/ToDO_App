// Imports & Configs
const FolderModel = require("../Model/folder.model");

// Create Folder Controller
exports.createFolder = async (req, res) => {
  try {
    const data = req.body;
    const company_id = req?.user?.company_id;
    const project_id = req?.params?.project_id;

    const isDataExist = await FolderModel.findOne({
      $and: [
        { name: data.name },
        { company_id: company_id },
        { project_id: project_id },
        { isDeleted: false },
      ],
    });

    if (isDataExist) {
      return res.status(201).json({
        success: false,
        message: "Folder already existed!!",
      });
    } else {
      const newData = await FolderModel({
        ...data,
        company_id,
        project_id,
      }).save();

      return res.status(201).json({
        success: true,
        message: "Folder created successfully!!",
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

// Update Folder Controller
exports.updateFolder = async (req, res) => {
  try {
    const data = req?.body;
    const id = req?.params?.id;

    const isDataExist = await FolderModel.findOne({
      $and: [{ name: data.name }, { isDeleted: false }],
    });

    if (isDataExist) {
      return res.status(201).json({
        success: false,
        message: "Folder already existed!!",
      });
    } else {
      const updateData = await FolderModel.findByIdAndUpdate(
        id,
        {
          name: data.name,
        },
        { new: true }
      );

      return res.status(201).json({
        success: true,
        message: "Folder updated successfully!!",
        data: updateData,
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

// Get All Folder Controller
exports.getAllFolders = async (req, res) => {
  try {
    const getAllData = await FolderModel.find({
      isDeleted: false,
    });

    if (getAllData.length < 1) {
      return res.status(201).json({
        success: false,
        message: "No folders found!!",
      });
    } else {
      return res.status(201).json({
        success: true,
        message: "Get all folders!!",
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
