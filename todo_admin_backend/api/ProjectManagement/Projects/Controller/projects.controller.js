// Imports & Configs
const ProjectModel = require("../Model/projects.model");

// Create Project Controller
exports.create = async (req, res) => {
  const data = req.body;

  try {
    const isProjectExist = await ProjectModel.findOne({
      name: data.name,
      isDeleted: false,
    });

    if (isProjectExist) {
      return res.status(201).json({
        success: false,
        message: "Project already existed!!",
      });
    } else {
      const newData = await ProjectModel({
        ...data,
        company_id: req?.user?.companyId,
      }).save();

      return res.status(201).json({
        success: true,
        message: "Project created successfully!!",
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

// Get All Project Controller
exports.getAll = async (req, res) => {
  const data = req.body;
  const filter = { isDeleted: false, company_id: req?.user?.companyId };
  let limit = parseInt(data?.limit) || 10;
  let sort = data?.sort === "desc" ? -1 : 1;

  if (limit < 1) limit = 10;

  if (data.name != "" && data.name != undefined) {
    var nameRegex = new RegExp(data.name, "i");
    filter.name = nameRegex;
  }

  if (data?.create_date !== "" && data?.create_date !== undefined) {
    filter.create_date = data?.create_date;
  }

  if (data?.start_date !== "" && data?.start_date !== undefined) {
    filter.start_date = data?.start_date;
  }

  try {
    const getAllProjects = await ProjectModel.find(filter)
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

// Update Project Details
exports.update = async (req, res) => {
  const data = req.body;
  const projectId = req?.params?.id;
  const filter = { isDeleted: false, company_id: req?.user?.companyId };

  let updateData = {};

  try {
    if (projectId) {
      filter._id = projectId;
    }

    if (data?.name !== "" && data?.name !== undefined) {
      updateData.name = data?.name;
      filter.name = data?.name;
    }
    if (data?.description !== "" && data?.description !== undefined) {
      updateData.description = data?.description;
    }
    if (data?.start_date !== "" && data?.start_date !== undefined) {
      updateData.start_date = data?.start_date;
    }
    if (
      data?.estimated_end_time !== "" &&
      data?.estimated_end_time !== undefined
    ) {
      updateData.estimated_end_time = data?.estimated_end_time;
    }

    const isProjectExist = await ProjectModel.findById(projectId);

    if (!isProjectExist || isProjectExist.isDeleted === true) {
      return res.status(201).json({
        success: false,
        message: "No Projects Found!!",
      });
    } else {
      let updatedData = await ProjectModel.findByIdAndUpdate(
        isProjectExist._id,
        updateData,
        {
          new: true,
        }
      );

      return res.status(201).json({
        success: true,
        message: "Data updated successfully!!",
        data: updatedData,
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
