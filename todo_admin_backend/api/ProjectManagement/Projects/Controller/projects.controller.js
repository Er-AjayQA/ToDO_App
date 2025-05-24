// Imports & Configs
const generateUniqueSlug = require("../../../../helpers/generateSlug");
const ProjectModel = require("../Model/projects.model");

// Create Project Controller
exports.createProject = async (req, res) => {
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
      let slug = await generateUniqueSlug(data.name, ProjectModel);
      data.slug = slug;
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
exports.getAllProject = async (req, res) => {
  const data = req.body;
  const filter = { isDeleted: false, company_id: req?.user?.companyId };
  let limit = parseInt(data?.limit) || 10;
  let sort = data?.sort === "desc" ? -1 : 1;

  try {
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

    const getAllProjects = await ProjectModel.find(filter)
      .populate({ path: "company_id" })
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
  const slugId = req?.params?.slugId;
  const filter = {
    isDeleted: false,
    company_id: req?.user.companyId,
    slug: slugId,
  };

  try {
    const getProjectDetails = await ProjectModel.findOne(filter).populate({
      path: "company_id",
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
  const data = req.body;
  const projectSlug = req?.params?.slugId;
  const filter = { isDeleted: false, company_id: req?.user?.companyId };

  let updateData = {};

  try {
    if (projectSlug) {
      filter.slug = projectSlug;
    }

    const isProjectExist = await ProjectModel.findOne(filter);

    if (!isProjectExist) {
      return res.status(201).json({
        success: false,
        message: "No Projects Found!!",
      });
    } else {
      if (data?.name !== "" && data?.name !== undefined) {
        updateData.name = data?.name;
        filter.name = data?.name;
        slug = await generateUniqueSlug(data.name, ProjectModel);
        updateData.slug = slug;
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
