// Imports & Configs
const generateUniqueSlug = require("../../../../helpers/generateSlug");
const ProjectModel = require("../Model/projects.model");

// Create Project Controller
exports.createProject = async (req, res) => {
  try {
    const data = req.body;
    const company_id = req?.user?.company_id;

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
        company_id,
        create_date: new Date().toISOString(),
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
exports.getAllProject = async (req, res) => {
  const data = req.body;
  const filter = { isDeleted: false, company_id: req?.user?.company_id };
  let limit = parseInt(data?.limit) || 10;
  let sort = data?.sort === "desc" ? -1 : 1;

  try {
    if (limit < 1) limit = 10;

    if (data.name != "" && data.name != undefined) {
      var nameRegex = new RegExp(data.name, "i");
      filter.name = nameRegex;
    }

    const getAllProjects = await ProjectModel.find(filter)
      .populate({ path: "company_id", select: ["name"] })
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

// Get Project Details by SlugId Controller
exports.getProjectById = async (req, res) => {
  try {
    const project_id = req?.params?.project_id;
    const filter = {
      isDeleted: false,
      company_id: req?.user?.company_id,
    };

    const getProjectDetails = await ProjectModel.findOne(filter).populate({
      path: "company_id",
      select: ["name"],
    });

    if (!getProjectDetails) {
      return res.status(201).json({
        success: false,
        message: "No Projects Found!!",
      });
    } else {
      return res.status(201).json({
        success: true,
        message: "Data fetched successfully!!",
        data: getProjectDetails,
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
exports.updateProject = async (req, res) => {
  try {
    const data = req.body;
    const filter = { isDeleted: false, _id: req?.params?.project_id };

    const isProjectExist = await ProjectModel.findOne(filter);

    if (!isProjectExist) {
      return res.status(201).json({
        success: false,
        message: "No Projects Found!!",
      });
    } else {
      let updateData = {};
      if (data?.name !== "" && data?.name !== undefined) {
        updateData.name = data?.name;
        filter.name = data?.name;
      }
      if (data?.description !== "" && data?.description !== undefined) {
        updateData.description = data?.description;
      }
      if (data?.deadline !== "" && data?.deadline !== undefined) {
        updateData.deadline = data?.deadline;
      }

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
