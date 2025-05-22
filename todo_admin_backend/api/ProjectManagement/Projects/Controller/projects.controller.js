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

  if (
    data.create_date !== null ||
    data.create_date !== undefined ||
    data.create_date !== ""
  ) {
    filter.create_date = req.body.create_date;
  }

  if (
    data.start_date !== null ||
    data.start_date !== undefined ||
    data.start_date !== ""
  ) {
    filter.start_date = req.body.start_date;
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
