// Imports & Configs
const generateUniqueSlug = require("../../../../helpers/generateSlug");
const FolderModel = require("../Model/folder.model");

// Create Folder Controller
exports.createFolder = async (req, res) => {
  try {
    const data = req.body;
    const company_slug = req?.user?.company_slug;
    const project_slug = req?.params?.project_slug;

    const isDataExist = await FolderModel.findOne({
      name: { $regex: new RegExp(`^${data.name}$`, "i") },
      company_slug,
      project_slug,
      isDeleted: false,
    });

    if (isDataExist) {
      return res.status(201).json({
        success: false,
        message: "Folder already existed!!",
      });
    } else {
      let slug = await generateUniqueSlug(data.name, FolderModel);
      data.slug = slug;

      const newData = await FolderModel({
        ...data,
        company_slug,
        project_slug,
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
