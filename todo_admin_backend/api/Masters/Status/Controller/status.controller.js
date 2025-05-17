// Imports & Configs
const StatusModel = require("../Model/status.model");

// Create Status Controller
exports.create = async (req, res) => {
  const data = req.body;

  try {
    const newData = await StatusModel(data).save();

    return res.status(201).json({
      success: true,
      message: "Status added successfully!!",
      data: newData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!!",
      errorMessage: error.message,
    });
  }
};

// Get All Status Controller
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
    const allData = await StatusModel.find(filter)
      .limit(limit)
      .sort({ _id: sort });

    if (allData.length <= 0) {
      return res.status(201).json({
        success: false,
        message: "No Status Found!!",
      });
    } else {
      return res.status(201).json({
        success: true,
        message: "Data fetched successfully!!",
        records: allData.length,
        data: allData,
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
